import React, { useEffect, useState, useRef } from 'react';
import * as XLSX from 'xlsx'; 
import {
  Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton,
  MenuItem, InputAdornment, TablePagination, Tooltip,
  FormControl, InputLabel, Stack, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField as MuiTextField,
  OutlinedInput, Checkbox, ListItemText,
  Box,
  CircularProgress
} from '@mui/material';

// Fix 1: Explicitly import the type
import type { SelectChangeEvent } from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Styles
import {
  PageContainer, PageHeader, FilterToolbar,
  SearchInput, FilterSelect, ActionButtonContainer
} from './StudentPage.styles';

// API
import {
  getStudents,
  addStudent,
  updateStudent,
  toggleStudentStatus,
  bulkImportStudents
} from '../../api/apiFunctions';

// --- Types ---
interface IStudentUI {
  _id: string;
  name: string;
  phoneNumber: string;
  parentPhoneNumber: string;
  currentClass: string;
  stream?: string;
  targetExams: string[];
  enrolledSubjects: (string | { name: string })[]; 
  academicSession: string;
  isActive: boolean;
}

const TARGET_OPTIONS = ['JEE', 'NEET', 'Boards', 'Foundation', 'Olympiad'];
const MOCK_SUBJECTS = ['Physics', 'Chemistry', 'Maths', 'Biology', 'English']; 

const StudentsPage: React.FC = () => {
  // --- State ---
  const [students, setStudents] = useState<IStudentUI[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filters
  const [classFilter, setClassFilter] = useState('All');
  const [examFilter, setExamFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Dialogs
  const [openDialog, setOpenDialog] = useState(false);
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState<IStudentUI | null>(null);

  // Import State
  // Fix 2: Defined a specific type for the imported rows instead of any[]
  const [importData, setImportData] = useState<Record<string, unknown>[]>([]);
  const [importFileName, setImportFileName] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<IStudentUI>>({
    name: '', phoneNumber: '', parentPhoneNumber: '',
    currentClass: '', stream: '', targetExams: [], enrolledSubjects: [],
    academicSession: '2024-2025', isActive: true
  });

  // --- Effects ---
  useEffect(() => {
    fetchStudentsList();
  }, []);

  const fetchStudentsList = async () => {
    try {
      const response = await getStudents();
      const data = response.data as IStudentUI[];
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // --- Handlers ---

  const handleOpenDialog = (student?: IStudentUI) => {
    if (student) {
      setEditingStudent(student);
      // Fix 3: Removed explicit 'any' and added safety check
      const subjectNames = student.enrolledSubjects.map((s) => 
        (typeof s === 'object' && s !== null && 'name' in s) ? s.name : String(s)
      );
      setFormData({ ...student, enrolledSubjects: subjectNames });
    } else {
      setEditingStudent(null);
      setFormData({
        name: '', phoneNumber: '', parentPhoneNumber: '',
        currentClass: '', stream: '', targetExams: [], enrolledSubjects: [],
        academicSession: '2024-2025', isActive: true
      });
    }
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      let response;
      const payload = { ...formData };

      if (editingStudent) {
        response = await updateStudent(editingStudent._id, payload);
      } else {
        response = await addStudent(payload);
      }

      if (response.success) {
        alert(editingStudent ? "Student updated!" : "Student added!");
        setOpenDialog(false);
        fetchStudentsList();
      } else {
        alert("Error: " + response.message);
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to toggle the active status of this student?')) {
      const response = await toggleStudentStatus(id);
      if (response.success) {
        setStudents(prev => prev.map(s =>
          s._id === id ? { ...s, isActive: !s.isActive } : s
        ));
      } else {
        alert("Error: " + response.message);
      }
    }
  };

  // --- IMPORT HANDLERS (XLSX Logic) ---

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        name: "Arjun Sharma",
        phoneNumber: "9876543210", 
        parentPhoneNumber: "9988776655",
        email: "arjun@example.com",
        currentClass: "12",
        stream: "Science",
        targetExams: "JEE|Boards",      
        enrolledSubjects: "Physics|Maths", 
        academicSession: "2024-2025",
        dob: "2007-08-15"
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "Student_Import_Template.xlsx");
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportFileName(file.name);

    const reader = new FileReader();
    // Fix 4: Typed the ProgressEvent properly
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);
        
        if (jsonData.length === 0) {
          alert("File appears to be empty.");
          return;
        }
        setImportData(jsonData);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImportSubmit = async () => {
    if (importData.length === 0) return;

    setIsImporting(true);
    try {
      const response = await bulkImportStudents(importData);
      if (response.success) {
        // Fix 5: Cast response.data to avoid 'unknown' error
        const msg = (response.data as { message?: string })?.message || "Import Successful";
        alert(msg);
        handleCloseImport();
        fetchStudentsList();
      } else {
        alert("Import failed: " + response.message);
      }
    } catch {
      alert("Import failed due to server error");
    } finally {
      setIsImporting(false);
    }
  };

  const handleCloseImport = () => {
    setOpenImportDialog(false);
    setImportData([]);
    setImportFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- Filtering Logic ---
  
  // Fix 6: Use 'unknown' generic and cast value to string[] to satisfy MUI Select types
  const handleExamFilterChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string[];
    setExamFilter(typeof value === 'string' ? value.split(',') : value);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.phoneNumber.includes(searchTerm);
    const matchesClass = classFilter === 'All' || student.currentClass === classFilter;
    const matchesExam = examFilter.length === 0 || examFilter.some(filter => student.targetExams.includes(filter));
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'Active' ? student.isActive : !student.isActive);
    return matchesSearch && matchesClass && matchesExam && matchesStatus;
  });

  const paginatedStudents = filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <PageContainer>
      {/* HEADER */}
      <PageHeader>
        <Box>
          <Typography variant="h5" fontWeight="700" color="text.primary">Students Directory</Typography>
          <Typography variant="body2" color="text.secondary">Manage admissions and access.</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={() => setOpenImportDialog(true)}
            sx={{ backgroundColor: 'white' }}
          >
            Import Excel
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ bgcolor: 'primary.main' }}
          >
            Add Student
          </Button>
        </Stack>
      </PageHeader>

      {/* FILTERS */}
      <FilterToolbar elevation={0}>
        <SearchInput
          size="small"
          placeholder="Search Name or Phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        />

        <FormControl size="small">
          <InputLabel>Class</InputLabel>
          <FilterSelect value={classFilter} label="Class" onChange={(e) => setClassFilter(e.target.value as string)}>
            <MenuItem value="All">All</MenuItem>
            {['9', '10', '11', '12'].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </FilterSelect>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Target Exams</InputLabel>
          <FilterSelect
            multiple
            value={examFilter}
            onChange={handleExamFilterChange}
            input={<OutlinedInput label="Target Exams" />}
            renderValue={(selected) => (selected as string[]).join(', ')}
          >
            {TARGET_OPTIONS.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={examFilter.indexOf(name) > -1} size="small" />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </FilterSelect>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Status</InputLabel>
          <FilterSelect value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value as string)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </FilterSelect>
        </FormControl>

        <Tooltip title="Reset Filters">
          <IconButton onClick={() => { setClassFilter('All'); setExamFilter([]); setStatusFilter('All'); setSearchTerm(''); }}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </FilterToolbar>

      {/* TABLE */}
      <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden', bgcolor: 'white' }}>
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Student Profile</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Class & Stream</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Targets</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Enrolled Subjects</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Session</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStudents.map((student) => (
                <TableRow key={student._id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700}>{student.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{student.phoneNumber}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>{student.currentClass}</Typography>
                    {student.stream && <Typography variant="caption">{student.stream}</Typography>}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap">
                      {student.targetExams.map((exam) => (
                        <Chip key={exam} label={exam} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      {/* Fix 7: Safe rendering of enrolled subjects */}
                      {student.enrolledSubjects.length > 0 
                        ? student.enrolledSubjects.map((s) => 
                            (typeof s === 'object' && s !== null && 'name' in s) ? s.name : String(s)
                          ).join(', ') 
                        : 'None'}
                    </Typography>
                  </TableCell>
                  <TableCell><Chip label={student.academicSession} size="small" sx={{ bgcolor: '#f1f5f9' }} /></TableCell>
                  <TableCell>
                    <Chip label={student.isActive ? 'Active' : 'Inactive'} size="small" color={student.isActive ? 'success' : 'default'} />
                  </TableCell>
                  <TableCell align="right">
                    <ActionButtonContainer>
                      <Tooltip title="Edit"><IconButton size="small" color="primary" onClick={() => handleOpenDialog(student)}><EditIcon fontSize="small" /></IconButton></Tooltip>
                      <Tooltip title="Deactivate"><IconButton size="small" color="error" onClick={() => handleDelete(student._id)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                    </ActionButtonContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </Box>

      {/* --- ADD / EDIT DIALOG --- */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} pt={1}>
             <Stack direction="row" spacing={2}>
              <MuiTextField label="Full Name" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <MuiTextField label="Academic Session" fullWidth value={formData.academicSession} onChange={(e) => setFormData({ ...formData, academicSession: e.target.value })} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <MuiTextField label="Phone Number" fullWidth value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
              <MuiTextField label="Parent Phone" fullWidth value={formData.parentPhoneNumber} onChange={(e) => setFormData({ ...formData, parentPhoneNumber: e.target.value })} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <FilterSelect value={formData.currentClass} label="Class" onChange={(e) => setFormData({ ...formData, currentClass: e.target.value as string })}>
                  {['9', '10', '11', '12'].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </FilterSelect>
              </FormControl>
              <MuiTextField label="Stream (Optional)" fullWidth value={formData.stream} onChange={(e) => setFormData({ ...formData, stream: e.target.value })} />
            </Stack>
            <FormControl fullWidth>
              <InputLabel>Target Exams</InputLabel>
              <FilterSelect
                multiple
                value={formData.targetExams}
                onChange={(e) => setFormData({ ...formData, targetExams: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value as string[] })}
                input={<OutlinedInput label="Target Exams" />}
                renderValue={(selected) => (selected as string[]).join(', ')}
              >
                {TARGET_OPTIONS.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={(formData.targetExams || []).indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </FilterSelect>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Enrolled Subjects</InputLabel>
              <FilterSelect
                multiple
                value={formData.enrolledSubjects}
                onChange={(e) => setFormData({ ...formData, enrolledSubjects: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value as string[] })}
                input={<OutlinedInput label="Enrolled Subjects" />}
                renderValue={(selected) => (selected as string[]).join(', ')}
              >
                {MOCK_SUBJECTS.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={(formData.enrolledSubjects || []).indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </FilterSelect>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save Student</Button>
        </DialogActions>
      </Dialog>

      {/* --- IMPORT DIALOG --- */}
      <Dialog open={openImportDialog} onClose={handleCloseImport} maxWidth="sm" fullWidth>
        <DialogTitle>Import Students</DialogTitle>
        <DialogContent dividers>
          {/* Allow .xlsx, .xls, .csv */}
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            hidden
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              border: '2px dashed',
              borderColor: importFileName ? 'success.main' : '#ccc',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: importFileName ? '#f0fff4' : '#fafafa',
              transition: 'all 0.2s',
              '&:hover': { bgcolor: importFileName ? '#e6fffa' : '#f0f0f0', borderColor: importFileName ? 'success.dark' : '#999' }
            }}
          >
            {importFileName ? (
              <>
                <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                <Typography variant="h6" color="success.main">File Selected</Typography>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mt={1}>
                    <InsertDriveFileIcon color="action" fontSize="small"/>
                    <Typography variant="body1" fontWeight="500">{importFileName}</Typography>
                </Stack>
                <Typography variant="caption" display="block" mt={1} color="text.secondary">Click to change file</Typography>
              </>
            ) : (
              <>
                <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                <Typography variant="h6">Click to Upload Excel File</Typography>
                <Typography variant="body2" color="text.secondary">Supported: .xlsx, .xls, .csv</Typography>
              </>
            )}
          </Box>

          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              {importData.length > 0 ? `${importData.length} records ready to import` : "Need a template?"}
            </Typography>
            <Button startIcon={<FileDownloadIcon />} size="small" onClick={handleDownloadTemplate}>
              Download Excel Template
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImport}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleImportSubmit}
            disabled={!importFileName || isImporting}
            startIcon={isImporting ? <CircularProgress size={20} color="inherit"/> : null}
          >
            {isImporting ? 'Importing...' : 'Upload & Process'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default StudentsPage;
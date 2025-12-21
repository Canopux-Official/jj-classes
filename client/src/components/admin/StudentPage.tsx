import React, { useState } from 'react';
import { 
  Typography, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, IconButton, 
  MenuItem, InputAdornment, TablePagination, Tooltip,
  FormControl, InputLabel, Stack, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField as MuiTextField,
  OutlinedInput, Checkbox, ListItemText,
  Box
} from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// Styles
import { 
  PageContainer, PageHeader, FilterToolbar, 
  SearchInput, FilterSelect, ActionButtonContainer 
} from './StudentPage.styles';

// --- Types ---
interface IStudentUI {
  _id: string;
  name: string;
  phoneNumber: string;
  parentPhoneNumber: string;
  currentClass: string;
  stream?: string;
  targetExams: string[];
  enrolledSubjects: string[]; // Mocking IDs as strings for UI
  academicSession: string;
  isActive: boolean;
}

const INITIAL_STUDENTS: IStudentUI[] = [
  { 
    _id: '1', name: 'Rahul Sharma', phoneNumber: '9876543210', parentPhoneNumber: '9998887770', 
    currentClass: '12', stream: 'Science', targetExams: ['JEE', 'Boards'], 
    enrolledSubjects: ['Physics', 'Maths'], academicSession: '2024-2025', isActive: true 
  },
];

const TARGET_OPTIONS = ['JEE', 'NEET', 'Boards', 'Foundation', 'Olympiad'];
const MOCK_SUBJECTS = ['Physics', 'Chemistry', 'Maths', 'Biology', 'English'];

const StudentsPage: React.FC = () => {
  // --- State ---
  const [students, setStudents] = useState<IStudentUI[]>(INITIAL_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [classFilter, setClassFilter] = useState('All');
  const [examFilter, setExamFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Dialogs
  const [openDialog, setOpenDialog] = useState(false); // Add/Edit
  const [openCsvDialog, setOpenCsvDialog] = useState(false); // CSV Upload
  const [editingStudent, setEditingStudent] = useState<IStudentUI | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<IStudentUI>>({
    name: '', phoneNumber: '', parentPhoneNumber: '', 
    currentClass: '', stream: '', targetExams: [], enrolledSubjects: [],
    academicSession: '2024-2025', isActive: true
  });

  // --- Handlers ---

  const handleOpenDialog = (student?: IStudentUI) => {
    if (student) {
      setEditingStudent(student);
      setFormData(student);
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

  const handleSave = () => {
    // Save logic (mock)
    if (editingStudent) {
      setStudents(prev => prev.map(s => s._id === editingStudent._id ? { ...s, ...formData } as IStudentUI : s));
    } else {
      setStudents(prev => [{ ...formData, _id: Date.now().toString() } as IStudentUI, ...prev]);
    }
    setOpenDialog(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Deactivate this student?')) {
      setStudents(prev => prev.map(s => s._id === id ? { ...s, isActive: false } : s));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleExamFilterChange = (event: any) => {
    const { target: { value } } = event;
    setExamFilter(typeof value === 'string' ? value.split(',') : value);
  };

  // --- Filtering Logic ---
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
            onClick={() => setOpenCsvDialog(true)}
            sx={{ backgroundColor: 'white' }}
          >
            Import CSV
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
        
        {/* Class Filter */}
        <FormControl size="small">
          <InputLabel>Class</InputLabel>
          <FilterSelect value={classFilter} label="Class" onChange={(e) => setClassFilter(e.target.value as string)}>
            <MenuItem value="All">All</MenuItem>
            {['9', '10', '11', '12'].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </FilterSelect>
        </FormControl>

        {/* Target Filter */}
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

        {/* Status Filter */}
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
                    <Typography variant="body2" fontWeight={600}>Class {student.currentClass}</Typography>
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
                      {student.enrolledSubjects.length > 0 ? student.enrolledSubjects.join(', ') : 'None'}
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
              <MuiTextField label="Full Name" fullWidth value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <MuiTextField label="Academic Session" fullWidth value={formData.academicSession} onChange={(e) => setFormData({...formData, academicSession: e.target.value})} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <MuiTextField label="Phone Number" fullWidth value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
              <MuiTextField label="Parent Phone" fullWidth value={formData.parentPhoneNumber} onChange={(e) => setFormData({...formData, parentPhoneNumber: e.target.value})} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <FilterSelect value={formData.currentClass} label="Class" onChange={(e) => setFormData({...formData, currentClass: e.target.value as string})}>
                  {['9', '10', '11', '12'].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </FilterSelect>
              </FormControl>
              <MuiTextField label="Stream (Optional)" fullWidth value={formData.stream} onChange={(e) => setFormData({...formData, stream: e.target.value})} />
            </Stack>
            
            <FormControl fullWidth>
              <InputLabel>Target Exams</InputLabel>
              <FilterSelect
                multiple
                value={formData.targetExams}
                onChange={(e) => setFormData({...formData, targetExams: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value as string[]})}
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
              <InputLabel>Enrolled Subjects (Access Control)</InputLabel>
              <FilterSelect
                multiple
                value={formData.enrolledSubjects}
                onChange={(e) => setFormData({...formData, enrolledSubjects: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value as string[]})}
                input={<OutlinedInput label="Enrolled Subjects (Access Control)" />}
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

      {/* --- CSV IMPORT DIALOG --- */}
      <Dialog open={openCsvDialog} onClose={() => setOpenCsvDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Import Students via CSV</DialogTitle>
        <DialogContent dividers>
          <Box 
            sx={{ 
              border: '2px dashed #ccc', 
              borderRadius: 2, 
              p: 4, 
              textAlign: 'center', 
              cursor: 'pointer',
              bgcolor: '#fafafa',
              '&:hover': { bgcolor: '#f0f0f0', borderColor: '#999' }
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
            <Typography variant="h6">Click or Drag CSV file here</Typography>
            <Typography variant="body2" color="text.secondary">Supported columns: Name, Phone, Class, Stream...</Typography>
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">Need a template?</Typography>
            <Button startIcon={<FileDownloadIcon />} size="small">Download Sample CSV</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCsvDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">Upload & Process</Button>
        </DialogActions>
      </Dialog>

    </PageContainer>
  );
};

export default StudentsPage;
import React, { useState } from 'react';
import { 
  Typography, Button, Box, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Checkbox, 
  Select, MenuItem, FormControl, InputLabel, Chip, 
  Dialog, DialogTitle, DialogContent, DialogActions,
  Stack, IconButton, Tooltip,  TextField,
  FormHelperText, OutlinedInput, ListItemText, InputAdornment, TablePagination,
  Divider // Grid removed
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AltRouteIcon from '@mui/icons-material/AltRoute'; 
import SaveIcon from '@mui/icons-material/Save';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SchoolIcon from '@mui/icons-material/School';

import { 
  SessionContainer, ControlPanel, PromotionTableContainer, DiffView,
  FilterToolbar, SearchInput, FilterSelect 
} from './SessionPage.styles';

// --- Types ---
type PromotionStatus = 'Promote' | 'ToDropper' | 'Retain' | 'Discontinue';

interface IStudentPromoteUI {
  id: string;
  name: string;
  phoneNumber: string;
  currentClass: string;
  stream?: string;
  currentSession: string;
  targetExams: string[];
  enrolledSubjects: string[];
  promotionStatus: PromotionStatus;
}

const MOCK_STUDENTS: IStudentPromoteUI[] = [
  { id: '1', name: 'Rahul Sharma', phoneNumber: '9876543210', currentClass: '11', stream: 'Science', currentSession: '2024-2025', targetExams: ['JEE'], enrolledSubjects: ['Physics', 'Maths'], promotionStatus: 'Promote' },
  { id: '2', name: 'Priya Verma', phoneNumber: '8765432109', currentClass: '12', stream: 'Science', currentSession: '2024-2025', targetExams: ['NEET'], enrolledSubjects: ['Biology', 'Physics'], promotionStatus: 'Promote' },
  { id: '3', name: 'Amit Kumar', phoneNumber: '7654321098', currentClass: '12', stream: 'Science', currentSession: '2024-2025', targetExams: ['Boards'], enrolledSubjects: ['Maths'], promotionStatus: 'ToDropper' },
  { id: '4', name: 'Sneha Singh', phoneNumber: '9988776655', currentClass: '9', currentSession: '2024-2025', targetExams: ['Foundation'], enrolledSubjects: ['Science'], promotionStatus: 'Promote' },
  { id: '5', name: 'Vikram Malhotra', phoneNumber: '8899001122', currentClass: 'Dropper 1', stream: 'Science', currentSession: '2024-2025', targetExams: ['JEE'], enrolledSubjects: ['Physics'], promotionStatus: 'Promote' },
  { id: '6', name: 'Anjali Das', phoneNumber: '7766554433', currentClass: 'Dropper 1', stream: 'Science', currentSession: '2024-2025', targetExams: ['NEET'], enrolledSubjects: ['Biology'], promotionStatus: 'ToDropper' },
  { id: '7', name: 'Rohan Gupta', phoneNumber: '6655443322', currentClass: '11', stream: 'Commerce', currentSession: '2024-2025', targetExams: ['Boards'], enrolledSubjects: ['Accounts'], promotionStatus: 'Retain' },
];

const SUBJECT_OPTIONS = ['Physics', 'Chemistry', 'Maths', 'Biology', 'English', 'Computer Science', 'Accounts', 'Economics'];
const TARGET_OPTIONS = ['JEE', 'NEET', 'Boards', 'Foundation', 'Olympiad'];
const STREAM_OPTIONS = ['Science', 'Commerce', 'Arts', 'General'];

// --- Helper: Transition Logic ---
const getTargetClass = (currentClass: string, status: PromotionStatus): string => {
  if (status === 'Retain') return currentClass;
  if (status === 'Discontinue') return 'Dropout';
  switch (currentClass) {
    case '9': return status === 'Promote' ? '10' : currentClass;
    case '10': return status === 'Promote' ? '11' : currentClass;
    case '11': return status === 'Promote' ? '12' : currentClass;
    case '12': return status === 'ToDropper' ? 'Dropper 1' : 'Graduate';
    case 'Dropper 1': return status === 'ToDropper' ? 'Dropper 2' : 'Graduate';
    case 'Dropper 2': return status === 'ToDropper' ? 'Dropper 3' : 'Graduate';
    case 'Dropper 3': return 'Graduate';
    default: return 'Unknown';
  }
};

const SessionPage: React.FC = () => {
  // Global State
  const [fromSession] = useState('2024-2025');
  const [toSession, setToSession] = useState('2025-2026');
  const [targetClass, setTargetClass] = useState('11');
  
  // Data State
  const [students, setStudents] = useState<IStudentPromoteUI[]>(MOCK_STUDENTS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [examFilter, setExamFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('All'); 

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal State
  const [openCustomize, setOpenCustomize] = useState(false);
  const [customizingStudent, setCustomizingStudent] = useState<IStudentPromoteUI | null>(null);
  const [tempProfile, setTempProfile] = useState({ subjects: [] as string[], exams: [] as string[], stream: '' });

  const canMoveToDropper = ['12', 'Dropper 1', 'Dropper 2'].includes(targetClass);

  // --- Filtering Logic ---
  const filteredStudents = students.filter(student => {
    if (student.currentClass !== targetClass) return false;
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch = 
      student.name.toLowerCase().includes(lowerSearch) || 
      student.id.includes(lowerSearch) ||
      student.phoneNumber.includes(lowerSearch);
    const matchesExam = examFilter.length === 0 || examFilter.some(target => student.targetExams.includes(target));
    const matchesStatus = statusFilter === 'All' || student.promotionStatus === statusFilter;
    return matchesSearch && matchesExam && matchesStatus;
  });

  const paginatedStudents = filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // --- Handlers ---
  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(filteredStudents.map(s => s.id));
    else setSelectedIds([]);
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleBulkStatusChange = (status: PromotionStatus) => {
    setStudents(prev => prev.map(s => selectedIds.includes(s.id) ? { ...s, promotionStatus: status } : s));
  };

  const openCustomizationDialog = (student: IStudentPromoteUI) => {
    setCustomizingStudent(student);
    setTempProfile({
      subjects: student.enrolledSubjects,
      exams: student.targetExams,
      stream: student.stream || 'Science'
    });
    setOpenCustomize(true);
  };

  const saveCustomization = () => {
    if (customizingStudent) {
      setStudents(prev => prev.map(s => 
        s.id === customizingStudent.id ? { 
          ...s, 
          enrolledSubjects: tempProfile.subjects,
          targetExams: tempProfile.exams,
          stream: tempProfile.stream
        } : s
      ));
    }
    setOpenCustomize(false);
  };

  const handleCommitPromotion = () => {
    const summary = filteredStudents.reduce((acc, s) => {
      const target = getTargetClass(s.currentClass, s.promotionStatus);
      acc[target] = (acc[target] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const summaryText = Object.entries(summary).map(([t, c]) => `${t}: ${c}`).join('\n');
    if (window.confirm(`SUMMARY for Class ${targetClass}:\n${summaryText}\n\nProceed?`)) {
      alert('Updated!');
    }
  };

  return (
    <SessionContainer>
      <Box>
        <Typography variant="h5" fontWeight="700">Session & Promotion Manager</Typography>
        <Typography variant="body2" color="text.secondary">Upgrade batches, manage dropouts, and roll over academic sessions.</Typography>
      </Box>

      {/* 1. CONTROL PANEL */}
      <ControlPanel elevation={0}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
          <Box display="flex" gap={2} alignItems="flex-start" flex={1}>
            <TextField label="From Session" value={fromSession} size="small" disabled helperText="System Default" />
            <Box pt={1}><ArrowForwardIcon color="action" /></Box>
            <TextField label="To Session" value={toSession} onChange={(e) => setToSession(e.target.value)} size="small" helperText="Target Academic Year" />
          </Box>
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel>Select Batch to Upgrade</InputLabel>
            <Select 
              value={targetClass} 
              label="Select Batch to Upgrade"
              onChange={(e) => { setTargetClass(e.target.value); setPage(0); setSelectedIds([]); }}
            >
              <MenuItem value="9">Class 9 → 10</MenuItem>
              <MenuItem value="10">Class 10 → 11</MenuItem>
              <MenuItem value="11">Class 11 → 12</MenuItem>
              <MenuItem value="12">Class 12 → Graduate/Dropper</MenuItem>
              <MenuItem value="Dropper 1">Dropper 1 → Graduate/D2</MenuItem>
            </Select>
            <FormHelperText>Current Batch</FormHelperText>
          </FormControl>
        </Stack>
      </ControlPanel>

      {/* 2. FILTER TOOLBAR */}
      <FilterToolbar elevation={0}>
        <SearchInput
          size="small"
          placeholder="Search Name, ID, or Phone..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Target Exams</InputLabel>
          <FilterSelect
            multiple
            value={examFilter}
            onChange={(e) => { setExamFilter(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value as string[]); setPage(0); }}
            input={<OutlinedInput label="Target Exams" />}
            renderValue={(selected) => (selected as string[]).join(', ')}
          >
            {TARGET_OPTIONS.map((name) => (
              <MenuItem key={name} value={name}><Checkbox checked={examFilter.indexOf(name) > -1} /><ListItemText primary={name} /></MenuItem>
            ))}
          </FilterSelect>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Review Action</InputLabel>
          <FilterSelect
            value={statusFilter}
            label="Review Action"
            onChange={(e) => { setStatusFilter(e.target.value as string); setPage(0); }}
          >
            <MenuItem value="All">All Actions</MenuItem>
            <MenuItem value="Promote">Promote / Graduate</MenuItem>
            <MenuItem value="ToDropper">To Dropper</MenuItem>
            <MenuItem value="Retain">Retain</MenuItem>
            <MenuItem value="Discontinue">Discontinue</MenuItem>
          </FilterSelect>
        </FormControl>
        <Tooltip title="Reset Filters">
          <IconButton onClick={() => { setSearchTerm(''); setExamFilter([]); setStatusFilter('All'); setPage(0); }}><FilterListIcon /></IconButton>
        </Tooltip>
      </FilterToolbar>

      {/* 3. BULK ACTIONS */}
      <Stack direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap" gap={1}>
        <Button variant="outlined" color="success" size="small" onClick={() => handleBulkStatusChange('Promote')} disabled={selectedIds.length === 0}>Promote / Graduate</Button>
        {canMoveToDropper && <Button variant="outlined" color="secondary" size="small" startIcon={<CallSplitIcon />} onClick={() => handleBulkStatusChange('ToDropper')} disabled={selectedIds.length === 0}>Move to Dropper</Button>}
        <Button variant="outlined" color="warning" size="small" onClick={() => handleBulkStatusChange('Retain')} disabled={selectedIds.length === 0}>Retain</Button>
        <Button variant="outlined" color="error" size="small" onClick={() => handleBulkStatusChange('Discontinue')} disabled={selectedIds.length === 0}>Discontinue</Button>
      </Stack>

      {/* 4. TABLE */}
      <PromotionTableContainer elevation={0}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead sx={{ '& th': { backgroundColor: '#f1f5f9', fontWeight: 700 } }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox 
                    checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0}
                    indeterminate={selectedIds.length > 0 && selectedIds.length < filteredStudents.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableCell>
                <TableCell>Student Details</TableCell>
                <TableCell>Transition Plan</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Subjects (Next)</TableCell>
                <TableCell align="right">Customize</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => {
                  const isSelected = selectedIds.includes(student.id);
                  const targetClassLabel = getTargetClass(student.currentClass, student.promotionStatus);
                  return (
                    <TableRow key={student.id} hover selected={isSelected}>
                      <TableCell padding="checkbox"><Checkbox checked={isSelected} onChange={() => handleSelectOne(student.id)} /></TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={700}>{student.name}</Typography>
                        <Typography variant="caption" color="text.secondary" display="block">{student.phoneNumber}</Typography>
                        <Stack direction="row" spacing={0.5} mt={0.5}>
                           {student.targetExams.map(t => <Chip key={t} label={t} size="small" sx={{ fontSize: '0.65rem', height: 18 }} />)}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <DiffView>
                          <span>{student.currentClass}</span>
                          <ArrowForwardIcon fontSize="inherit" color="action" />
                          <span className={targetClassLabel === 'Dropout' || targetClassLabel === student.currentClass ? '' : 'new'}>{targetClassLabel}</span>
                        </DiffView>
                      </TableCell>
                      <TableCell>
                         <Select
                            size="small"
                            value={student.promotionStatus}
                            onChange={(e) => setStudents(prev => prev.map(s => s.id === student.id ? { ...s, promotionStatus: e.target.value as PromotionStatus } : s))}
                            sx={{ fontSize: '0.8rem', height: 32, minWidth: 130 }}
                         >
                           <MenuItem value="Promote">{['12', 'Dropper 1', 'Dropper 2', 'Dropper 3'].includes(student.currentClass) ? 'Graduate' : 'Promote'}</MenuItem>
                           {canMoveToDropper && <MenuItem value="ToDropper">To Dropper</MenuItem>}
                           <MenuItem value="Retain">Retain</MenuItem>
                           <MenuItem value="Discontinue">Discontinue</MenuItem>
                         </Select>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">{student.enrolledSubjects.join(', ')}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit Profile"><IconButton size="small" color="primary" onClick={() => openCustomizationDialog(student)}><AltRouteIcon fontSize="small" /></IconButton></Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow><TableCell colSpan={6} align="center" sx={{ py: 3 }}>No students match your filters.</TableCell></TableRow>
              )}
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
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        />
      </PromotionTableContainer>

      {/* 5. COMMIT BUTTON */}
      <Box display="flex" justifyContent="flex-end" py={2}>
        <Button variant="contained" size="large" startIcon={<SaveIcon />} onClick={handleCommitPromotion} sx={{ px: 4, py: 1.5 }}>Confirm Updates</Button>
      </Box>

      {/* --- ENHANCED CUSTOMIZATION DIALOG (NO GRID) --- */}
      <Dialog open={openCustomize} onClose={() => setOpenCustomize(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <SchoolIcon color="primary" />
            <Box>
              <Typography variant="h6" fontWeight={700}>Customize Profile: {customizingStudent?.name}</Typography>
              <Typography variant="caption" color="text.secondary">Adjusting profile for Session {toSession}</Typography>
            </Box>
          </Stack>
        </DialogTitle>
        
        <DialogContent sx={{ mt: 2 }}>
          {/* Using Stack for Vertical Layout instead of Grid */}
          <Stack spacing={3} pt={1}>
            
            {/* Row 1: Stream and Target Exams */}
            <Box display="flex" gap={2} flexWrap="wrap">
              {/* Stream Box */}
              <Box flex={1} minWidth="200px">
                <FormControl fullWidth size="small">
                  <InputLabel>Stream</InputLabel>
                  <Select
                    value={tempProfile.stream}
                    label="Stream"
                    onChange={(e) => setTempProfile({ ...tempProfile, stream: e.target.value })}
                  >
                    {STREAM_OPTIONS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </Select>
                  <FormHelperText>e.g. Science, Commerce</FormHelperText>
                </FormControl>
              </Box>

              {/* Exams Box */}
              <Box flex={2} minWidth="250px">
                <FormControl fullWidth size="small">
                  <InputLabel>Target Exams</InputLabel>
                  <Select
                    multiple
                    value={tempProfile.exams}
                    onChange={(e) => setTempProfile({ ...tempProfile, exams: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value as string[] })}
                    input={<OutlinedInput label="Target Exams" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => <Chip key={value} label={value} size="small" />)}
                      </Box>
                    )}
                  >
                    {TARGET_OPTIONS.map((name) => <MenuItem key={name} value={name}><Checkbox checked={tempProfile.exams.indexOf(name) > -1} /><ListItemText primary={name} /></MenuItem>)}
                  </Select>
                  <FormHelperText>Goals for the new session</FormHelperText>
                </FormControl>
              </Box>
            </Box>

            <Divider />

            {/* Row 2: Enrolled Subjects */}
            <Box>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>Subject Access Control</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Select the subjects this student is authorized to access in the app.
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Enrolled Subjects</InputLabel>
                <Select
                  multiple
                  value={tempProfile.subjects}
                  onChange={(e) => setTempProfile({ ...tempProfile, subjects: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value as string[] })}
                  input={<OutlinedInput label="Enrolled Subjects" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => <Chip key={value} label={value} size="small" color="primary" variant="outlined" />)}
                    </Box>
                  )}
                >
                  {SUBJECT_OPTIONS.map((name) => <MenuItem key={name} value={name}><Checkbox checked={tempProfile.subjects.indexOf(name) > -1} /><ListItemText primary={name} /></MenuItem>)}
                </Select>
              </FormControl>
            </Box>

          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #e2e8f0' }}>
          <Button onClick={() => setOpenCustomize(false)} color="inherit">Cancel</Button>
          <Button onClick={saveCustomization} variant="contained" startIcon={<SaveIcon />}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </SessionContainer>
  );
};

export default SessionPage;
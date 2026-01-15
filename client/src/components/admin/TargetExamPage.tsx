import React, { useState } from 'react';
import { 
  Typography, Button, Box, IconButton, Switch, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, FormControlLabel, Tooltip, Stack, Divider,
  InputAdornment
} from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz'; 
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; 
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

// Styles
import { ExamContainer, ExamHeader, ExamGrid, ExamCard } from './TargetExamPage.styles';

interface IExamUI {
  id: string;
  name: string;
  isActive: boolean;
}

const INITIAL_EXAMS: IExamUI[] = [
  { id: '1', name: 'JEE Mains', isActive: true },
  { id: '2', name: 'NEET', isActive: true },
  { id: '3', name: 'CBSE Boards', isActive: true },
  { id: '4', name: 'Olympiad', isActive: true },
];

const TargetExamPage: React.FC = () => {
  const [exams, setExams] = useState<IExamUI[]>(INITIAL_EXAMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', isActive: true });

  // --- Handlers ---
  const handleToggleActive = (id: string) => {
    setExams(prev => prev.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('⚠️ WARNING: Deleting an Exam will remove it from selection lists.\n\nAre you sure?')) {
      setExams(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleOpenDialog = (exam?: IExamUI) => {
      if (exam) {
          setEditingId(exam.id);
          setFormData({ name: exam.name, isActive: exam.isActive });
      } else {
          setEditingId(null);
          setFormData({ name: '', isActive: true });
      }
      setOpenDialog(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
        alert("Exam Name is required");
        return;
    }
    if (editingId) {
        setExams(prev => prev.map(item => 
            item.id === editingId ? { ...item, ...formData } : item
        ));
    } else {
        setExams([...exams, { id: Date.now().toString(), ...formData }]);
    }
    setOpenDialog(false);
  };

  const filteredExams = exams.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ExamContainer>
      <ExamHeader>
        <Box>
          <Typography variant="h5" fontWeight="700">Target Exams</Typography>
          <Typography variant="body2" color="text.secondary">Manage entrance exams (JEE, NEET, etc).</Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width={{ xs: '100%', sm: 'auto' }}>
            <TextField
                size="small"
                placeholder="Search Exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
                }}
                sx={{ bgcolor: 'white', width: { xs: '100%', sm: 220 } }}
            />
            <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={() => handleOpenDialog()}
                sx={{ bgcolor: 'primary.main', whiteSpace: 'nowrap' }}
            >
                Add Exam
            </Button>
        </Stack>
      </ExamHeader>

      <ExamGrid>
        {filteredExams.length > 0 ? (
            filteredExams.map((exam) => (
            <ExamCard key={exam.id} elevation={0} sx={{ opacity: exam.isActive ? 1 : 0.7 }}>
                <Box p={2} flexGrow={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <QuizIcon color={exam.isActive ? "primary" : "disabled"} />
                            <Typography variant="h6" fontWeight="600" color={exam.isActive ? "text.primary" : "text.secondary"}>
                                {exam.name}
                            </Typography>
                        </Box>
                        <Tooltip title={exam.isActive ? "Deactivate" : "Activate"}>
                            <Switch size="small" checked={exam.isActive} onChange={() => handleToggleActive(exam.id)} color="success" />
                        </Tooltip>
                    </Box>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between" alignItems="center" p={1} bgcolor="#f8fafc">
                    <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenDialog(exam)}>Edit</Button>
                    <Tooltip title="Delete Permanently">
                        <IconButton size="small" onClick={() => handleDelete(exam.id)}>
                            <DeleteForeverIcon fontSize="small" color="error" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </ExamCard>
            ))
        ) : (
            <Box gridColumn="1 / -1" textAlign="center" py={4}>
                <Typography variant="body1" color="text.secondary">No exams found.</Typography>
            </Box>
        )}
      </ExamGrid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Exam' : 'Add New Exam'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} pt={1}>
            <TextField label="Exam Name" fullWidth required variant="outlined" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <Box p={2} border="1px solid #e0e0e0" borderRadius={1} display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                    <Typography variant="subtitle2" fontWeight={600}>Status</Typography>
                    <Typography variant="caption" color="text.secondary">{formData.isActive ? "Visible in forms." : "Hidden from forms."}</Typography>
                </Box>
                <FormControlLabel control={<Switch checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} color="success" />} label={formData.isActive ? "Active" : "Hidden"} labelPlacement="start" />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpenDialog(false)} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSave} disableElevation>{editingId ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </ExamContainer>
  );
};

export default TargetExamPage;
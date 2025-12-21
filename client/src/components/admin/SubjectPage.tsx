import React, { useState } from 'react';
import { 
  Typography, Button, Box, IconButton, Chip, Switch, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, FormControl, InputLabel, Select, MenuItem,
  FormControlLabel, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { SubjectContainer, SubjectHeader, SubjectGrid, SubjectCard } from './SubjectsPage.styles';

// --- Types ---
interface ISubjectUI {
  id: string;
  name: string;
  stream?: string;
  isActive: boolean;
}

const INITIAL_SUBJECTS: ISubjectUI[] = [
  { id: '1', name: 'Physics', stream: 'Science', isActive: true },
  { id: '2', name: 'Chemistry', stream: 'Science', isActive: true },
  { id: '3', name: 'Mathematics', stream: 'Science', isActive: true },
  { id: '4', name: 'History', stream: 'Arts', isActive: false },
  { id: '5', name: 'Biology', stream: 'Science', isActive: true },
];

const SubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<ISubjectUI[]>(INITIAL_SUBJECTS);
  const [openDialog, setOpenDialog] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', stream: 'Science', isActive: true });

  const handleToggleActive = (id: string) => {
    setSubjects(prev => prev.map(sub => sub.id === id ? { ...sub, isActive: !sub.isActive } : sub));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this subject?')) {
      setSubjects(prev => prev.filter(sub => sub.id !== id));
    }
  };

  const handleSave = () => {
    if (!newSubject.name) return;
    setSubjects([...subjects, { ...newSubject, id: Date.now().toString() }]);
    setOpenDialog(false);
    setNewSubject({ name: '', stream: 'Science', isActive: true });
  };

  return (
    <SubjectContainer>
      <SubjectHeader>
        <Box>
          <Typography variant="h5" fontWeight="700">Subject Management</Typography>
          <Typography variant="body2" color="text.secondary">Define curriculum and streams.</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setOpenDialog(true)}
          sx={{ bgcolor: 'primary.main' }}
        >
          Add Subject
        </Button>
      </SubjectHeader>

      <SubjectGrid>
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} elevation={0}>
            <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <LibraryBooksIcon color="primary" />
                <Typography variant="h6" fontWeight="600">{subject.name}</Typography>
              </Box>
              <Tooltip title="Toggle Availability">
                <Switch 
                  size="small" 
                  checked={subject.isActive} 
                  onChange={() => handleToggleActive(subject.id)} 
                />
              </Tooltip>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Chip 
                label={subject.stream || 'General'} 
                size="small" 
                variant="outlined" 
                color="info"
              />
              <Box>
                <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                <IconButton size="small" color="error" onClick={() => handleDelete(subject.id)}><DeleteIcon fontSize="small" /></IconButton>
              </Box>
            </Box>
          </SubjectCard>
        ))}
      </SubjectGrid>

      {/* --- ADD SUBJECT MODAL --- */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add New Subject</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={3} pt={1}>
            <TextField 
              label="Subject Name" 
              fullWidth 
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Stream</InputLabel>
              <Select 
                value={newSubject.stream} 
                label="Stream"
                onChange={(e) => setNewSubject({ ...newSubject, stream: e.target.value })}
              >
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Commerce">Commerce</MenuItem>
                <MenuItem value="Arts">Arts</MenuItem>
                <MenuItem value="General">General (All)</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Switch checked={newSubject.isActive} onChange={(e) => setNewSubject({...newSubject, isActive: e.target.checked})} />}
              label="Active Immediately"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Add Subject</Button>
        </DialogActions>
      </Dialog>
    </SubjectContainer>
  );
};

export default SubjectsPage;
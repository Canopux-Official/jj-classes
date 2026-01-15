import React, { useState } from 'react';
import { 
  Typography, Button, Box, IconButton, Switch, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, FormControlLabel, Tooltip, Stack, Divider,
  InputAdornment
} from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; 
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search'; 

import { SubjectContainer, SubjectHeader, SubjectGrid, SubjectCard } from './SubjectsPage.styles';

// --- Types ---
interface ISubjectUI {
  id: string;
  name: string;
  isActive: boolean;
}

const INITIAL_SUBJECTS: ISubjectUI[] = [
  { id: '1', name: 'Physics', isActive: true },
  { id: '2', name: 'Chemistry', isActive: true },
  { id: '3', name: 'Mathematics', isActive: true },
  { id: '4', name: 'History', isActive: false },
  { id: '5', name: 'Biology', isActive: true },
];

const SubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<ISubjectUI[]>(INITIAL_SUBJECTS);
  
  // Search State
  const [searchTerm, setSearchTerm] = useState('');

  // Dialog State
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({ 
      name: '', 
      isActive: true 
  });

  // --- Handlers ---

  const handleToggleActive = (id: string) => {
    setSubjects(prev => prev.map(sub => 
        sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('⚠️ WARNING: This will permanently delete this subject.\n\nAre you sure?')) {
      setSubjects(prev => prev.filter(sub => sub.id !== id));
    }
  };

  const handleOpenDialog = (subject?: ISubjectUI) => {
      if (subject) {
          setEditingId(subject.id);
          setFormData({
              name: subject.name,
              isActive: subject.isActive
          });
      } else {
          setEditingId(null);
          setFormData({ name: '', isActive: true });
      }
      setOpenDialog(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
        alert("Subject Name is required");
        return;
    }

    if (editingId) {
        setSubjects(prev => prev.map(sub => 
            sub.id === editingId ? { ...sub, ...formData } : sub
        ));
    } else {
        const newSubject: ISubjectUI = {
            id: Date.now().toString(),
            ...formData
        };
        setSubjects([...subjects, newSubject]);
    }
    setOpenDialog(false);
  };

  // --- Filtering Logic ---
  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SubjectContainer>
      <SubjectHeader>
        <Box>
          <Typography variant="h5" fontWeight="700">Subject Management</Typography>
          <Typography variant="body2" color="text.secondary">Define available subjects.</Typography>
        </Box>
        
        <Stack direction="row" spacing={2}>
            <TextField
                size="small"
                placeholder="Search Subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
                sx={{ bgcolor: 'white', minWidth: 200 }}
            />
            <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={() => handleOpenDialog()}
                sx={{ bgcolor: 'primary.main' }}
            >
                Add Subject
            </Button>
        </Stack>
      </SubjectHeader>

      <SubjectGrid>
        {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
            <SubjectCard key={subject.id} elevation={0} sx={{ opacity: subject.isActive ? 1 : 0.7 }}>
                
                {/* CARD CONTENT */}
                <Box p={2} flexGrow={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        {/* Name Section */}
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <LibraryBooksIcon color={subject.isActive ? "primary" : "disabled"} />
                            <Typography variant="h6" fontWeight="600" color={subject.isActive ? "text.primary" : "text.secondary"}>
                                {subject.name}
                            </Typography>
                        </Box>

                        {/* Toggle Switch (Top Right) */}
                        <Tooltip title={subject.isActive ? "Deactivate" : "Activate"}>
                            <Switch 
                                size="small"
                                checked={subject.isActive} 
                                onChange={() => handleToggleActive(subject.id)} 
                                color="success"
                            />
                        </Tooltip>
                    </Box>
                </Box>

                <Divider />

                {/* ACTION FOOTER (Only Edit & Delete) */}
                <Box display="flex" justifyContent="space-between" alignItems="center" p={1} bgcolor="#f8fafc">
                    <Button 
                        size="small" 
                        startIcon={<EditIcon />} 
                        onClick={() => handleOpenDialog(subject)}
                    >
                        Edit
                    </Button>

                    <Tooltip title="Delete Permanently">
                        <IconButton size="small" onClick={() => handleDelete(subject.id)}>
                            <DeleteForeverIcon fontSize="small" color="error" />
                        </IconButton>
                    </Tooltip>
                </Box>

            </SubjectCard>
            ))
        ) : (
            <Box gridColumn="1 / -1" textAlign="center" py={4}>
                <Typography variant="body1" color="text.secondary">
                    No subjects found matching "{searchTerm}"
                </Typography>
            </Box>
        )}
      </SubjectGrid>

      {/* --- ADD / EDIT DIALOG --- */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
        <DialogContent dividers>
          
          <Stack spacing={3} pt={1}>
            <TextField 
                label="Subject Name" 
                fullWidth 
                required
                variant="outlined"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Box 
                p={2} 
                border="1px solid #e0e0e0" 
                borderRadius={1} 
                display="flex" 
                alignItems="center"
                justifyContent="space-between"
            >
                <Box>
                    <Typography variant="subtitle2" fontWeight={600}>Subject Status</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {formData.isActive ? "Subject is visible to students." : "Subject is hidden from new enrollments."}
                    </Typography>
                </Box>
                <FormControlLabel
                    control={
                        <Switch 
                            checked={formData.isActive} 
                            onChange={(e) => setFormData({...formData, isActive: e.target.checked})} 
                            color="success"
                        />
                    }
                    label={formData.isActive ? "Active" : "Hidden"}
                    labelPlacement="start"
                />
            </Box>

          </Stack>

        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpenDialog(false)} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSave} disableElevation>
            {editingId ? 'Update Subject' : 'Add Subject'}
          </Button>
        </DialogActions>
      </Dialog>
    </SubjectContainer>
  );
};

export default SubjectsPage;
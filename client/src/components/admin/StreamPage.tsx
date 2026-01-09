import React, { useState } from 'react';
import { 
  Typography, Button, Box, IconButton, Switch, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, FormControlLabel, Tooltip, Stack, Divider,
  InputAdornment
} from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; 
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

// Styles
import { StreamContainer, StreamHeader, StreamGrid, StreamCard } from './StreamPage.styles';

interface IStreamUI {
  id: string;
  name: string;
  isActive: boolean;
}

const INITIAL_STREAMS: IStreamUI[] = [
  { id: '1', name: 'Science', isActive: true },
  { id: '2', name: 'Commerce', isActive: true },
  { id: '3', name: 'Arts', isActive: true },
  { id: '4', name: 'Vocational', isActive: false },
];

const StreamPage: React.FC = () => {
  const [streams, setStreams] = useState<IStreamUI[]>(INITIAL_STREAMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', isActive: true });

  // --- Handlers ---
  const handleToggleActive = (id: string) => {
    setStreams(prev => prev.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('⚠️ WARNING: Deleting a Stream will remove it from selection lists.\n\nAre you sure?')) {
      setStreams(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleOpenDialog = (stream?: IStreamUI) => {
      if (stream) {
          setEditingId(stream.id);
          setFormData({ name: stream.name, isActive: stream.isActive });
      } else {
          setEditingId(null);
          setFormData({ name: '', isActive: true });
      }
      setOpenDialog(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
        alert("Stream Name is required");
        return;
    }
    if (editingId) {
        setStreams(prev => prev.map(item => 
            item.id === editingId ? { ...item, ...formData } : item
        ));
    } else {
        setStreams([...streams, { id: Date.now().toString(), ...formData }]);
    }
    setOpenDialog(false);
  };

  const filteredStreams = streams.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StreamContainer>
      <StreamHeader>
        <Box>
          <Typography variant="h5" fontWeight="700">Stream Management</Typography>
          <Typography variant="body2" color="text.secondary">Manage academic streams (Science, Commerce, etc).</Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width={{ xs: '100%', sm: 'auto' }}>
            <TextField
                size="small"
                placeholder="Search Streams..."
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
                Add Stream
            </Button>
        </Stack>
      </StreamHeader>

      <StreamGrid>
        {filteredStreams.length > 0 ? (
            filteredStreams.map((stream) => (
            <StreamCard key={stream.id} elevation={0} sx={{ opacity: stream.isActive ? 1 : 0.7 }}>
                <Box p={2} flexGrow={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={1.5}>
                            <SchoolIcon color={stream.isActive ? "primary" : "disabled"} />
                            <Typography variant="h6" fontWeight="600" color={stream.isActive ? "text.primary" : "text.secondary"}>
                                {stream.name}
                            </Typography>
                        </Box>
                        <Tooltip title={stream.isActive ? "Deactivate" : "Activate"}>
                            <Switch size="small" checked={stream.isActive} onChange={() => handleToggleActive(stream.id)} color="success" />
                        </Tooltip>
                    </Box>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between" alignItems="center" p={1} bgcolor="#f8fafc">
                    <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenDialog(stream)}>Edit</Button>
                    <Tooltip title="Delete Permanently">
                        <IconButton size="small" onClick={() => handleDelete(stream.id)}>
                            <DeleteForeverIcon fontSize="small" color="error" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </StreamCard>
            ))
        ) : (
            <Box gridColumn="1 / -1" textAlign="center" py={4}>
                <Typography variant="body1" color="text.secondary">No streams found.</Typography>
            </Box>
        )}
      </StreamGrid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Stream' : 'Add New Stream'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} pt={1}>
            <TextField label="Stream Name" fullWidth required variant="outlined" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
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
    </StreamContainer>
  );
};

export default StreamPage;
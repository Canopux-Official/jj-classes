import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  Chip,
  InputAdornment,
} from '@mui/material';
import {
  Close as CloseIcon,
  Search as SearchIcon,
  InsertDriveFile as FileIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';
import { getAllExistingFiles } from '../services/FolderServiceApi';
import type { ExistingFile, FileDetail } from '../types/FileDetail';
interface FileBrowserModalProps {
  open: boolean;
  onClose: () => void;
  onSelectFiles: (files: FileDetail[]) => void;
  alreadySelectedFiles?: FileDetail[];
}

const FileBrowserModal: React.FC<FileBrowserModalProps> = ({
  open,
  onClose,
  onSelectFiles,
  alreadySelectedFiles = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allFiles, setAllFiles] = useState<ExistingFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<ExistingFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<ExistingFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch files when modal opens
  useEffect(() => {
    if (open) {
      fetchFiles();
    } else {
      // Reset state when modal closes
      setSearchQuery('');
      setSelectedFiles([]);
      setError(null);
    }
  }, [open]);

  // Filter files based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFiles(allFiles);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = allFiles.filter(
        (file) =>
          file.fileName.toLowerCase().includes(query) ||
          file.parentHeading.toLowerCase().includes(query)
      );
      setFilteredFiles(filtered);
    }
  }, [searchQuery, allFiles]);

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllExistingFiles();
      if (response.success) {
        // Filter out files that are already selected
        const alreadySelectedLinks = alreadySelectedFiles.map((f) => f.uploadLink);
        const availableFiles = response.data.filter(
          (file) => !alreadySelectedLinks.includes(file.uploadLink)
        );
        setAllFiles(availableFiles);
        setFilteredFiles(availableFiles);
      } else {
        setError('Failed to fetch files');
      }
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Error loading files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFile = (file: ExistingFile) => {
    const isSelected = selectedFiles.some((f) => f.uploadLink === file.uploadLink);
    if (isSelected) {
      setSelectedFiles(selectedFiles.filter((f) => f.uploadLink !== file.uploadLink));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles([...filteredFiles]);
    }
  };

  const handleConfirm = () => {
    // Convert ExistingFile to FileDetail format
    const filesToAdd: FileDetail[] = selectedFiles.map((file) => ({
      fileName: file.fileName,
      uploadLink: file.uploadLink,
      fileId: file.fileId,
    }));
    onSelectFiles(filesToAdd);
    onClose();
  };

  const isFileSelected = (file: ExistingFile) => {
    return selectedFiles.some((f) => f.uploadLink === file.uploadLink);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Link Existing Files
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Search Bar */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search by file name or folder..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Select All Checkbox */}
          {filteredFiles.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Checkbox
                checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                indeterminate={selectedFiles.length > 0 && selectedFiles.length < filteredFiles.length}
                onChange={handleSelectAll}
              />
              <Typography variant="body2">
                Select All ({selectedFiles.length} of {filteredFiles.length} selected)
              </Typography>
            </Box>
          )}

          {/* Loading State */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {/* Empty State */}
          {!loading && !error && filteredFiles.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                {searchQuery ? 'No files found matching your search' : 'No files available'}
              </Typography>
            </Box>
          )}

          {/* Files List */}
          {!loading && !error && filteredFiles.length > 0 && (
            <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
              {filteredFiles.map((file, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => handleToggleFile(file)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={isFileSelected(file)}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemIcon>
                      <FileIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {file.fileName}
                          </Typography>
                          {file.fileId && (
                            <Chip label="Drive" size="small" color="primary" variant="outlined" />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <FolderIcon sx={{ fontSize: 14 }} />
                          <Typography variant="caption" color="text.secondary">
                            {file.parentHeading}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={selectedFiles.length === 0}
        >
          Add {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileBrowserModal;
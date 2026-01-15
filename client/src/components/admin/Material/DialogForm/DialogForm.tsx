import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Chip,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  InsertDriveFile as FileIcon,
  Link as LinkIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import type { Node } from '../types/node';
import type { FileDetail } from '../types/FileDetail';
import type { ReferenceDetail } from '../types/referenceDetails';
import { deleteFileFromDrive, initGoogleDrive, isGoogleDriveInitialized, uploadMultipleFiles } from '../utils/googleDriveService';
import FileBrowserModal from './FileBrowserModal';

interface NodeDialogFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (node: Partial<Node>) => void;
  initialData?: Partial<Node>;
  title: string;
  parentId: string;
}

const NodeDialogForm: React.FC<NodeDialogFormProps> = ({
  open,
  onClose,
  onSave,
  initialData = {},
  title,
  parentId,
}) => {
  const isEdit = !!initialData._id;

  const [formData, setFormData] = useState<Partial<Node>>({
    heading: initialData.heading || '',
    type: initialData.type || 'folder',
    description: initialData.description || '',
    tags: initialData.tags || [],
    lastDate: initialData.lastDate || '',
    fileDetails: initialData.fileDetails || [],
    referenceDetails: initialData.referenceDetails || [],
  });

  const [currentTag, setCurrentTag] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [fileBrowserOpen, setFileBrowserOpen] = useState(false);
  const [newFile, setNewFile] = useState<FileDetail>({
    fileName: '',
    uploadLink: '',
  });
  const [newReference, setNewReference] = useState<ReferenceDetail>({
    fileName: '',
    referenceLink: '',
  });

  const initialDataRef = useRef(initialData);
  const cancelUpload = useRef<boolean>(false);

  useEffect(() => {
    initialDataRef.current = initialData;
  }, [initialData]);

  // Initialize Google Drive API when dialog opens
  useEffect(() => {
    if (open) {
      initGoogleDrive();
    }
  }, [open]);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      const data = initialDataRef.current;
      setFormData({
        heading: data.heading || '',
        type: data.type || 'folder',
        description: data.description || '',
        tags: data.tags || [],
        lastDate: data.lastDate || '',
        fileDetails: data.fileDetails || [],
        referenceDetails: data.referenceDetails || [],
      });

      setCurrentTag('');
      setNewFile({ fileName: '', uploadLink: '' });
      setNewReference({ fileName: '', referenceLink: '' });
      setSelectedFiles(null);
      setUploadProgress({});
      setUploading(false); // Reset uploading state
      cancelUpload.current = false; // Reset cancel flag
    }
  }, [open]);

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
    }
  };

  // Handle file upload using the centralized API
  const handleUploadClick = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    if (!isGoogleDriveInitialized()) {
      alert('Google Drive API is not initialized. Please try again.');
      return;
    }

    setUploading(true);
    cancelUpload.current = false; // Reset cancel flag when starting new upload
    const filesArray = Array.from(selectedFiles);

    try {
      const uploadedFiles = await uploadMultipleFiles(
        filesArray,
        // Progress callback
        (fileName, progress) => {
          setUploadProgress((prev) => ({ ...prev, [fileName]: progress }));
        },
        // Completion callback
        (fileName, result) => {
          if (!result) {
            alert(`Failed to upload ${fileName}`);
          }
        }
      );

      // Add successfully uploaded files to form data
      if (uploadedFiles.length > 0) {
        setFormData({
          ...formData,
          fileDetails: [...(formData.fileDetails || []), ...uploadedFiles],
        });
      }

      // Reset selection
      setSelectedFiles(null);
      setUploadProgress({});
    } catch (error: unknown) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  // Delete file using centralized API
  const handleRemoveFile = async (index: number) => {
    const fileToRemove = formData.fileDetails?.[index];

    if (fileToRemove?.fileId) {
      const deleted = await deleteFileFromDrive(fileToRemove.fileId);
      if (!deleted) {
        alert('Failed to delete file from Google Drive. Removing from list anyway.');
      }
    }

    setFormData({
      ...formData,
      fileDetails: (formData.fileDetails || []).filter((_, i) => i !== index),
    });
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags?.includes(currentTag.trim())) {
      setFormData({ ...formData, tags: [...(formData.tags || []), currentTag.trim()] });
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter((t) => t !== tagToRemove),
    });
  };

  const handleAddFile = () => {
    if (newFile.fileName.trim() && newFile.uploadLink.trim()) {
      setFormData({
        ...formData,
        fileDetails: [...(formData.fileDetails || []), { ...newFile }],
      });
      setNewFile({ fileName: '', uploadLink: '' });
    }
  };

  const handleAddReference = () => {
    if (newReference.fileName.trim() && newReference.referenceLink.trim()) {
      setFormData({
        ...formData,
        referenceDetails: [...(formData.referenceDetails || []), { ...newReference }],
      });
      setNewReference({ fileName: '', referenceLink: '' });
    }
  };

  const handleRemoveReference = (index: number) => {
    setFormData({
      ...formData,
      referenceDetails: (formData.referenceDetails || []).filter((_, i) => i !== index),
    });
  };

  const handleSave = () => {
    if (!formData.heading?.trim()) return;

    onSave({
      ...formData,
      heading: formData.heading.trim(),
      parentId,
      type: formData.type,
      tags: formData.tags?.length ? formData.tags : undefined,
      fileDetails: formData.fileDetails?.length ? formData.fileDetails : undefined,
      referenceDetails: formData.referenceDetails?.length ? formData.referenceDetails : undefined,
    });

    onClose();
  };

  const handleCancel = () => {
    cancelUpload.current = true; // Mark the upload as canceled
    setUploading(false); // Reset uploading state immediately
    setUploadProgress({}); // Clear upload progress
    setSelectedFiles(null); // Clear selected files
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <IconButton onClick={handleCancel}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ maxHeight: '70vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          {/* Type Selection */}
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type || 'folder'}
              label="Type"
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'folder' | 'file' })}
            >
              <MenuItem value="folder">Folder</MenuItem>
              <MenuItem value="file">File</MenuItem>
            </Select>
          </FormControl>

          {/* Heading / Name */}
          <TextField
            label={formData.type === 'folder' ? 'Folder Name' : 'File Name'}
            required
            fullWidth
            value={formData.heading || ''}
            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            placeholder={formData.type === 'folder' ? 'e.g., Chapter 1: Limits' : 'e.g., Lecture Notes.pdf'}
          />

          {/* Description */}
          <TextField
            label="Description (optional)"
            multiline
            rows={3}
            fullWidth
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          {/* Due Date */}
          <TextField
            label="Due Date (optional)"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.lastDate || ''}
            onChange={(e) => setFormData({ ...formData, lastDate: e.target.value || undefined })}
          />

          {/* Tags */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Tags (optional)
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                fullWidth
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Type tag and press Enter"
              />
              <Button variant="outlined" onClick={handleAddTag} startIcon={<AddIcon />}>
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {(formData.tags || []).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>

          <Divider />

          {/* File Details Section with Upload */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <FileIcon fontSize="small" />
              File Details (optional)
            </Typography>

            {/* Upload Files to Google Drive */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'primary.50', borderColor: 'primary.main' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Upload files directly to Google Drive (Multiple files supported)
                </Typography>

                {/* File Input */}
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  disabled={uploading}
                >
                  Select Files
                  <input type="file" hidden multiple onChange={handleFileSelect} />
                </Button>

                {/* Show selected files */}
                {selectedFiles && selectedFiles.length > 0 && (
                  <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      Selected Files ({selectedFiles.length}):
                    </Typography>
                    {Array.from(selectedFiles).map((file, idx) => (
                      <Typography key={idx} variant="caption" sx={{ display: 'block' }}>
                        • {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </Typography>
                    ))}
                  </Box>
                )}

                {/* Upload Button */}
                <Button
                  variant="contained"
                  onClick={handleUploadClick}
                  startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
                  disabled={!selectedFiles || selectedFiles.length === 0 || uploading}
                  fullWidth
                >
                  {uploading ? 'Uploading...' : 'Upload to Google Drive'}
                </Button>

                {/* Upload Progress */}
                {Object.keys(uploadProgress).length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    {Object.entries(uploadProgress).map(([fileName, progress]) => (
                      <Box key={fileName} sx={{ mb: 1 }}>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                          {fileName}
                        </Typography>
                        <LinearProgress variant="determinate" value={progress} />
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Paper>


            {/* Link Existing Files Button */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'success.50', borderColor: 'success.main' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2,color: "white" }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Link files that are already uploaded in other folders
                </Typography>
                <Button
                  variant="contained"
                  sx={{color: "white"}}
                  onClick={() => setFileBrowserOpen(true)}
                  startIcon={<LinkIcon />}
                  fullWidth
                >
                  Browse Existing Files
                </Button>
              </Box>
            </Paper>

            {/* File Browser Modal */}
            <FileBrowserModal
              open={fileBrowserOpen}
              onClose={() => setFileBrowserOpen(false)}
              onSelectFiles={(files) => {
                setFormData({
                  ...formData,
                  fileDetails: [...(formData.fileDetails || []), ...files],
                });
              }}
              alreadySelectedFiles={formData.fileDetails}
            />

            {/* Manual Link Entry */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                Or add link manually
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  size="small"
                  label="File Name"
                  fullWidth
                  value={newFile.fileName}
                  onChange={(e) => setNewFile({ ...newFile, fileName: e.target.value })}
                  placeholder="e.g., Lecture_Notes_Week1.pdf"
                />
                <TextField
                  size="small"
                  label="Upload Link / URL"
                  fullWidth
                  value={newFile.uploadLink}
                  onChange={(e) => setNewFile({ ...newFile, uploadLink: e.target.value })}
                  placeholder="e.g., https://drive.google.com/..."
                />
                <Button
                  variant="contained"
                  onClick={handleAddFile}
                  startIcon={<AddIcon />}
                  disabled={!newFile.fileName.trim() || !newFile.uploadLink.trim()}
                  size="small"
                >
                  Add File Link
                </Button>
              </Box>
            </Paper>

            {/* Existing Files List */}
            {(formData.fileDetails || []).length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Uploaded Files ({formData.fileDetails?.length})
                </Typography>
                {formData.fileDetails?.map((file, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {file.fileName}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            wordBreak: 'break-all',
                            display: 'block',
                            '& a': { color: 'primary.main', textDecoration: 'none' },
                          }}
                        >
                          <a href={file.uploadLink} target="_blank" rel="noopener noreferrer">
                            {file.uploadLink}
                          </a>
                        </Typography>
                        {file.fileId && (
                          <Chip label="Google Drive" size="small" color="primary" variant="outlined" sx={{ mt: 1 }} />
                        )}
                      </Box>
                      <IconButton size="small" onClick={() => handleRemoveFile(index)} color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>

          <Divider />

          {/* Reference Details Section */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinkIcon fontSize="small" />
              Reference Details (optional)
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  size="small"
                  label="Reference Name"
                  fullWidth
                  value={newReference.fileName}
                  onChange={(e) => setNewReference({ ...newReference, fileName: e.target.value })}
                  placeholder="e.g., Textbook Chapter 3"
                />
                <TextField
                  size="small"
                  label="Reference Link / URL"
                  fullWidth
                  value={newReference.referenceLink}
                  onChange={(e) => setNewReference({ ...newReference, referenceLink: e.target.value })}
                  placeholder="e.g., https://example.com/resource"
                />
                <Button
                  variant="contained"
                  onClick={handleAddReference}
                  startIcon={<AddIcon />}
                  disabled={!newReference.fileName.trim() || !newReference.referenceLink.trim()}
                  size="small"
                >
                  Add Reference
                </Button>
              </Box>
            </Paper>

            {(formData.referenceDetails || []).length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {formData.referenceDetails?.map((ref, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {ref.fileName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                          <a href={ref.referenceLink} target="_blank" rel="noopener noreferrer">
                            {ref.referenceLink}
                          </a>
                        </Typography>
                      </Box>
                      <IconButton size="small" onClick={() => handleRemoveReference(index)} color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleCancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={!formData.heading?.trim() || uploading}>
          {isEdit ? 'Save Changes' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NodeDialogForm;
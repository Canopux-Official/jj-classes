import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  ListItemText,
  Divider,
  Alert,
  CardContent,
  CardActions,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import {
  StyledContainer,
  StyledPaper,
  HeaderBox,
  SectionTitle,
  UploadButton,
  FileList,
  FileItem,
  TagContainer,
  TagInput,
  AddTagButton,
  TagsDisplay,
  SubmitButton,
  MaterialCard,
  StyledTabs,
  StyledTab,
  UploadSection,
  MaterialsSection,
} from './FileUpload.styles';

interface FileItem {
  id: string;
  name: string;
  size: number;
}

interface Material {
  id: string;
  name: string;
  class: string;
  subject: string;
  topic: string;
  type: string;
  description: string;
  tags: string[];
  uploadDate: string;
  size: string;
}

const FileUpload: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('Class 9');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);
  const [stream, setStream] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Mock materials data
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      name: 'Physics Chapter 1 - Motion.pdf',
      class: 'Class 9',
      subject: 'Science',
      topic: 'Physics',
      type: 'Notes',
      description: 'Introduction to motion and speed concepts',
      tags: ['Physics', 'Motion', 'Chapter 1'],
      uploadDate: '2024-01-15',
      size: '2.5 MB',
    },
    {
      id: '2',
      name: 'Physics Chapter 1 - Motion.pdf',
      class: 'Class 9',
      subject: 'Science',
      topic: 'Physics',
      type: 'Notes',
      description: 'Introduction to motion and speed concepts',
      tags: ['Physics', 'Motion', 'Chapter 1'],
      uploadDate: '2024-01-15',
      size: '2.5 MB',
    },
    {
      id: '3',
      name: 'Physics Chapter 1 - Motion.pdf',
      class: 'Class 9',
      subject: 'Science',
      topic: 'Physics',
      type: 'Notes',
      description: 'Introduction to motion and speed concepts',
      tags: ['Physics', 'Motion', 'Chapter 1'],
      uploadDate: '2024-01-15',
      size: '2.5 MB',
    },
    {
      id: '4',
      name: 'Chemistry Assignment 1.pdf',
      class: 'Class 9',
      subject: 'Science',
      topic: 'Chemistry',
      type: 'Assignment',
      description: 'Atomic structure assignment',
      tags: ['Chemistry', 'Atoms'],
      uploadDate: '2024-01-14',
      size: '1.2 MB',
    },
    {
      id: '5',
      name: 'Algebra Question Paper.pdf',
      class: 'Class 10',
      subject: 'Mathematics',
      topic: 'Algebra',
      type: 'Question Paper',
      description: 'Mid-term algebra question paper',
      tags: ['Algebra', 'Mid-term'],
      uploadDate: '2024-01-10',
      size: '850 KB',
    },
  ]);

  const classOptions = ['Class 9', 'Class 10', 'Class 11', 'Class 12'];
  const subjects: Record<string, string[]> = {
    'Class 9': ['Science', 'Mathematics', 'English', 'Social Studies'],
    'Class 10': ['Science', 'Mathematics', 'English', 'Social Studies'],
    'Class 11': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
    'Class 12': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
  };

  const topics: Record<string, string[]> = {
    'Science': ['Physics', 'Chemistry', 'Biology'],
    'Physics': ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism'],
    'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
    'Biology': ['Cell Biology', 'Genetics', 'Ecology'],
    'Mathematics': ['Algebra', 'Geometry', 'Calculus', 'Statistics'],
  };

  const fileTypes = ['Assignment', 'Notes', 'Question Paper', 'Solution', 'Reference Material'];
  const streams = ['Science', 'Commerce', 'Arts'];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: FileItem[] = Array.from(files).map((file, index) => ({
        id: `${Date.now()}_${index}`,
        name: file.name,
        size: file.size,
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleUpload = () => {
    if (!selectedClass || !selectedSubject || !selectedType || uploadedFiles.length === 0) {
      return;
    }

    // Add new materials
    const newMaterials = uploadedFiles.map(file => ({
      id: `${Date.now()}_${file.id}`,
      name: file.name,
      class: selectedClass,
      subject: selectedSubject,
      topic: selectedTopic || 'General',
      type: selectedType,
      description: description,
      tags: tags,
      uploadDate: new Date().toISOString().split('T')[0],
      size: formatFileSize(file.size),
    }));

    setMaterials([...newMaterials, ...materials]);

    setSuccessMessage(`Successfully uploaded ${uploadedFiles.length} file(s)`);

    setTimeout(() => {
      setUploadedFiles([]);
      setDescription('');
      setTags([]);
      setSelectedSubject('');
      setSelectedTopic('');
      setSelectedType('');
      setStream('');
      setSuccessMessage('');
    }, 2000);
  };

  const handleDeleteMaterial = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const isUploadDisabled = !selectedClass || !selectedSubject || !selectedType || uploadedFiles.length === 0;

  const filteredMaterials = materials.filter(material => material.class === selectedClass);

  return (
    <StyledContainer>
      <Box sx={{ width: '100%', maxWidth: '1400px' }}>
        <HeaderBox>
          <FolderIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: '#066466' }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0c1c24ff', fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2.01rem' } }}>
            Study Materials Manager
          </Typography>
        </HeaderBox>

        {/* Class Tabs */}
        <StyledPaper elevation={2} sx={{ mb: 3 }}>
          <StyledTabs
            value={selectedClass}
            onChange={(_, newValue) => setSelectedClass(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {classOptions.map((cls) => (
              <StyledTab key={cls} label={cls} value={cls} />
            ))}
          </StyledTabs>
        </StyledPaper>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
            {successMessage}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
          {/* Upload Section */}
          <Box sx={{ flex: { xs: '1', lg: '0 0 420px' } }}>
            <UploadSection elevation={2}>
              <SectionTitle variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                <CloudUploadIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: { xs: 20, sm: 24 } }} />
                Upload New Material
              </SectionTitle>

              {/* Horizontal Form */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Subject *</InputLabel>
                    <Select
                      value={selectedSubject}
                      onChange={(e: SelectChangeEvent) => {
                        setSelectedSubject(e.target.value);
                        setSelectedTopic('');
                      }}
                      label="Subject *"
                    >
                      {subjects[selectedClass]?.map((subject) => (
                        <MenuItem key={subject} value={subject}>
                          {subject}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small" disabled={!selectedSubject}>
                    <InputLabel>Topic</InputLabel>
                    <Select
                      value={selectedTopic}
                      onChange={(e: SelectChangeEvent) => setSelectedTopic(e.target.value)}
                      label="Topic"
                    >
                      {selectedSubject &&
                        topics[selectedSubject]?.map((topic) => (
                          <MenuItem key={topic} value={topic}>
                            {topic}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Type *</InputLabel>
                    <Select
                      value={selectedType}
                      onChange={(e: SelectChangeEvent) => setSelectedType(e.target.value)}
                      label="Type *"
                    >
                      {fileTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <InputLabel>Stream</InputLabel>
                    <Select
                      value={stream}
                      onChange={(e: SelectChangeEvent) => setStream(e.target.value)}
                      label="Stream"
                    >
                      {streams.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <input
                accept="*"
                style={{ display: 'none' }}
                id="file-upload-input"
                multiple
                type="file"
                onChange={handleFileSelect}
              />
              <label htmlFor="file-upload-input" style={{ display: 'block' }}>
                <UploadButton variant="outlined" startIcon={<CloudUploadIcon />} fullWidth>
                  Choose Files
                </UploadButton>
              </label>

              {uploadedFiles.length > 0 && (
                <FileList>
                  {uploadedFiles.map((file) => (
                    <FileItem key={file.id}>
                      <DescriptionIcon sx={{ mr: 1.5, color: '#066466', fontSize: 20 }} />
                      <ListItemText
                        primary={file.name}
                        secondary={formatFileSize(file.size)}
                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                        secondaryTypographyProps={{ fontSize: '0.75rem' }}
                      />
                      <IconButton edge="end" onClick={() => handleDeleteFile(file.id)} size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </FileItem>
                  ))}
                </FileList>
              )}

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter file description..."
                sx={{ mt: 2 }}
                size="small"
              />

              <TagContainer>
                <TagInput
                  label="Add Tags"
                  variant="outlined"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  size="small"
                  placeholder="Press Enter"
                />
                <AddTagButton color="primary" onClick={handleAddTag} size="small">
                  <AddIcon fontSize="small" />
                </AddTagButton>
              </TagContainer>

              {tags.length > 0 && (
                <TagsDisplay>
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleDeleteTag(tag)}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </TagsDisplay>
              )}

              <SubmitButton
                variant="contained"
                onClick={handleUpload}
                disabled={isUploadDisabled}
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload Materials
              </SubmitButton>
            </UploadSection>
          </Box>

          {/* Materials List Section */}
          <Box sx={{ flex: 1 }}>
            <MaterialsSection elevation={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <SectionTitle variant="h6" sx={{ mb: 0, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                  <FolderIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: { xs: 20, sm: 24 } }} />
                  {selectedClass} Materials ({filteredMaterials.length})
                </SectionTitle>
              </Box>

              {filteredMaterials.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6, color: '#999' }}>
                  <DescriptionIcon sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
                  <Typography variant="body1">No materials uploaded yet</Typography>
                </Box>
              ) : (
                <Box sx={{ maxHeight: { xs: '500px', md: '700px' }, overflowY: 'auto', pr: { xs: 0.5, sm: 1 } }}>
                  {filteredMaterials.map((material) => (
                    <MaterialCard key={material.id} elevation={1}>
                      <CardContent sx={{ pb: 1, px: { xs: 2, sm: 2.5 }, pt: { xs: 1.5, sm: 2 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                          <Box sx={{ display: 'flex', gap: { xs: 0.75, sm: 1 }, alignItems: 'start', flex: 1 }}>
                            <DescriptionIcon sx={{ color: '#066466', mt: 0.5, fontSize: { xs: 20, sm: 24 } }} />
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#0c1c24ff', mb: 0.5, fontSize: { xs: '0.9rem', sm: '1rem' }, wordBreak: 'break-word' }}>
                                {material.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                {material.subject} → {material.topic} → {material.type}
                              </Typography>
                              {material.description && (
                                <Typography variant="body2" sx={{ color: '#666', mb: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                  {material.description}
                                </Typography>
                              )}
                              {material.tags.length > 0 && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                                  {material.tags.map((tag) => (
                                    <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' }, height: { xs: '20px', sm: '24px' } }} />
                                  ))}
                                </Box>
                              )}
                              <Typography variant="caption" color="textSecondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                                Uploaded: {material.uploadDate} • Size: {material.size}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end', pt: 0, px: { xs: 1.5, sm: 2 }, pb: { xs: 1, sm: 1.5 }, flexWrap: 'wrap', gap: 0.5 }}>
                        <Button size="small" startIcon={<DownloadIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />} sx={{ color: '#066466', fontSize: { xs: '0.7rem', sm: '0.875rem' }, minWidth: 'auto', px: { xs: 0.75, sm: 1 } }}>
                          Download
                        </Button>
                        <Button size="small" startIcon={<EditIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />} sx={{ color: '#066466', fontSize: { xs: '0.7rem', sm: '0.875rem' }, minWidth: 'auto', px: { xs: 0.75, sm: 1 } }}>
                          Edit
                        </Button>
                        <Button
                          size="small"
                          startIcon={<DeleteIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />}
                          onClick={() => handleDeleteMaterial(material.id)}
                          sx={{ color: '#d32f2f', fontSize: { xs: '0.7rem', sm: '0.875rem' }, minWidth: 'auto', px: { xs: 0.75, sm: 1 } }}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </MaterialCard>
                  ))}
                </Box>
              )}
            </MaterialsSection>
          </Box>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default FileUpload;
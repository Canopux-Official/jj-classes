
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Container,
  Paper,
  Fade,
  type SelectChangeEvent,
} from '@mui/material';
import { Add as AddIcon, School, TrendingUp, Category, Warning } from '@mui/icons-material';
import ClassCard from '../classcard/ClassCard';
import ShowSubnode from '../showsubnode/ShowSubNode';

import type { Node } from '../types/node';

import { confirmFolderDeletion, createOrFetchClass, deleteSubFolder, getAllClasses, updateFolder } from '../services/FolderServiceApi';
import { deleteFileFromDrive } from '../utils/googleDriveService';
import { ClassCardSkeleton } from '../utils/CardSkeleton';
import EditClassDialog from '../DialogForm/EditClassDialog';

// Available class options
const CLASS_OPTIONS = [
  { value: 'class-9', label: 'Class 9' },
  { value: 'class-10', label: 'Class 10' },
  { value: 'class-11', label: 'Class 11' },
  { value: 'class-12', label: 'Class 12' }
];

const TARGET_EXAM_OPTIONS = [
  { value: 'jee', label: 'JEE' },
  { value: 'neet', label: 'NEET' },
  { value: 'board', label: 'BOARD' },
  { value: 'other', label: 'OTHER' },
]

const STREAM_OPTINS = [
  { value: 'Science', label: 'Science' },
  { value: 'Commerce', label: 'Commerce' },
  { value: 'Arts', label: 'Arts' }
];

const ShowClass: React.FC = () => {
  const [allNodes, setAllNodes] = useState<Node[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);

  // Dialog states
  const [openClassSelectionDialog, setOpenClassSelectionDialog] = useState(false);
  const [selectedClassType, setSelectedClassType] = useState<string>('');
  const [selectedTargetExamType, setSelectedTargetExamType] = useState<string>('');
  const [selectedStreamType, setSelectedStreamType] = useState<string>('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingNode, setEditingNode] = useState<Node | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingNodeId, setDeletingNodeId] = useState<string | null>(null);

  // Snackbar state
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoadingClasses(true);
      try {
        const classes = await getAllClasses();
        setAllNodes(classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load classes',
          severity: 'error',
        });
      } finally {
        setIsLoadingClasses(false);
      }
    };

    fetchClasses();
  }, []);

  // Get root classes (parentId === null)
  const rootClasses = allNodes.filter((node) => node.parentId === null);

  const handleClassClick = (classId: string) => {
    setSelectedNodeId(classId);
  };

  const handleBackToClasses = () => {
    setSelectedNodeId(null);
  };

  const handleOpenCreateDialog = () => {
    setOpenClassSelectionDialog(true);
    setSelectedClassType('');
  };

  const handleCloseClassSelectionDialog = () => {
    setOpenClassSelectionDialog(false);
    setSelectedClassType('');
  };

  const handleClassTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedClassType(event.target.value);
  };

  const handleTargetExamTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedTargetExamType(event.target.value);
  };

  const handleStreamTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedStreamType(event.target.value);
  };

  const handleProceedToConfirm = () => {
    if (selectedClassType) {
      setOpenClassSelectionDialog(false);
      setOpenConfirmDialog(true);
    }
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedClassType('');
  };

  const handleConfirmCreateClass = async () => {
    if (!selectedClassType) return;

    const selectedOption = CLASS_OPTIONS.find(opt => opt.value === selectedClassType);
    const selectedTargetExamOption = TARGET_EXAM_OPTIONS.find(opt => opt.value === selectedTargetExamType);
    const selectedStreamOption = STREAM_OPTINS.find(opt => opt.value === selectedStreamType);
    const className = selectedOption?.label || selectedClassType;
    const targetExamName = selectedTargetExamOption?.label || selectedTargetExamType;
    const streamName = selectedStreamOption?.label || selectedStreamType

    try {
      const response = await createOrFetchClass(className, targetExamName, streamName);

      if (!response.success) {
        throw new Error(response.message || 'Failed to create class');
      }

      const newNode: Node = {
        _id: (response.data as { _id: string })._id,
        heading: className,
        targetExam: targetExamName,
        stream: streamName,
        type: 'folder',
        parentId: null,
        description: '',
        tags: [],
        fileDetails: [],
        referenceDetails: [],
      };

      setAllNodes([...allNodes, newNode]);
      handleCloseConfirmDialog();

      setSnackbar({
        open: true,
        message: response.message || 'Class created successfully',
        severity: 'success',
      });
    } catch (error: unknown) {
      console.error('Error creating class:', error);
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Error creating class',
        severity: 'error',
      });
    }
  };

  const handleEditClass = (node: Node) => {
    setEditingNode(node);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingNode(null);
  };

  const handleSaveEdit = async (classType: string, targetExam: string, stream: string) => {
    if (!editingNode) return;

    try {
      const updatedNode: Node = {
        ...editingNode,
        heading: classType,
        targetExam: targetExam,
        stream: stream
      };

      await updateFolder(editingNode._id, updatedNode);

      const updatedNodes = allNodes.map((node) =>
        node._id === editingNode._id ? updatedNode : node
      );

      setAllNodes(updatedNodes);
      handleCloseEditDialog();

      setSnackbar({
        open: true,
        message: 'Class updated successfully',
        severity: 'success',
      });
    } catch (error: unknown) {
      console.error('Error updating class:', error);
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Error updating class',
        severity: 'error',
      });
    }
  };

  const handleDeleteClass = (classId: string) => {
    setDeletingNodeId(classId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingNodeId(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingNodeId) return;

    try {
      const result = await deleteSubFolder(deletingNodeId);

      if (result.requiresDriveDeletion && result.driveFileIds) {
        handleCloseDeleteDialog();

        setSnackbar({
          open: true,
          message: 'Deleting files from Google Drive...',
          severity: 'info',
        });

        let deletedCount = 0;
        for (const fileId of result.driveFileIds) {
          try {
            const success = await deleteFileFromDrive(fileId);
            if (success) deletedCount++;
          } catch (error) {
            console.error('Error deleting file from Drive:', fileId, error);
          }
        }

        const confirmData = await confirmFolderDeletion(result.folderId ? result.folderId : "");

        if (confirmData.success) {
          const updatedNodes = removeNodeAndChildren(deletingNodeId);
          setAllNodes(updatedNodes);

          setSnackbar({
            open: true,
            message: `Deleted ${deletedCount} file(s) from Drive and folder successfully`,
            severity: 'success',
          });
        } else {
          setSnackbar({
            open: true,
            message: confirmData.message || 'Failed to complete folder deletion',
            severity: 'error',
          });
        }
      } else if (result.success) {
        const updatedNodes = removeNodeAndChildren(deletingNodeId);
        setAllNodes(updatedNodes);
        handleCloseDeleteDialog();

        setSnackbar({
          open: true,
          message: result.message || 'Folder deleted successfully',
          severity: 'success',
        });
      } else {
        handleCloseDeleteDialog();
        setSnackbar({
          open: true,
          message: result.message || 'Failed to delete folder',
          severity: result.message?.includes('subfolders') ? 'warning' : 'error',
        });
      }
    } catch (error: unknown) {
      handleCloseDeleteDialog();
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Error deleting folder',
        severity: 'error',
      });
    }
  };

  const removeNodeAndChildren = (nodeId: string): typeof allNodes => {
    const deleteNodeAndChildren = (id: string): string[] => {
      const idsToDelete = [id];
      const children = allNodes.filter((node) => node.parentId === id);
      children.forEach((child) => {
        idsToDelete.push(...deleteNodeAndChildren(child._id));
      });
      return idsToDelete;
    };

    const idsToDelete = deleteNodeAndChildren(nodeId);
    return allNodes.filter((node) => !idsToDelete.includes(node._id));
  };

  const handleNodesUpdate = (updatedNodes: Node[]) => {
    setAllNodes(updatedNodes);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (selectedNodeId) {
    return (
      <ShowSubnode
        nodeId={selectedNodeId}
        nodes={allNodes}
        onBack={handleBackToClasses}
        onNodesUpdate={handleNodesUpdate}
      />
    );
  }

  const displayClasses = rootClasses.map((node) => ({
    id: node._id,
    name: node.heading,
    tags: node.tags || [],
    status: 'active' as const,
    description: node.description,
    targetExam: node.targetExam,
    stream: node.stream,
    updatedAt: node.updatedAt,
    fileDetails: node.fileDetails || [],
    referenceDetails: node.referenceDetails || [],
    createdAt: node.createdAt,
    lastDate: node.lastDate,
    node: node,
  }));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fdfbf7 0%, #f5f5f5 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Page Header with Gradient Background */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #152b2e 0%, #407872 100%)',
            borderRadius: '16px',
            p: 4,
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
              borderRadius: '50%',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 3,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    background: 'rgba(255, 215, 0, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <School sx={{ color: '#ade0df', fontSize: 28 }} />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 800,
                    color: '#ffffff',
                    fontSize: { xs: '1.75rem', md: '2.125rem' },
                  }}
                >
                  My Classes
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  ml: 8,
                  fontSize: '1rem',
                }}
              >
                Manage and view all your enrolled classes
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateDialog}
              disabled={isLoadingClasses}
              sx={{
                background: '#011816',
                color: 'white',
                textTransform: 'none',
                borderRadius: '12px',
                px: 3.5,
                py: 1.5,
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                '&:hover': {
                  background: '#01180b',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Create Class
            </Button>
          </Box>
        </Paper>

        {/* Loading or Class Grid */}
        {isLoadingClasses ? (
          <ClassCardSkeleton count={6} />
        ) : (
          <Fade in={!isLoadingClasses} timeout={500}>
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
              gap={2}
            >
              {displayClasses.map((classItem) => (
                <Box key={classItem.id}>
                  <ClassCard
                    {...classItem}
                    onClick={handleClassClick}
                    onEdit={handleEditClass}
                    onDelete={handleDeleteClass}
                  />
                </Box>
              ))}
            </Box>
          </Fade>
        )}

        {/* Empty State */}
        {!isLoadingClasses && displayClasses.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              textAlign: 'center',
              py: 8,
              borderRadius: '16px',
              border: '2px dashed rgba(11, 32, 33, 0.2)',
              background: '#ffffff',
            }}
          >
            <School sx={{ fontSize: 64, color: 'rgba(11, 32, 33, 0.3)', mb: 2 }} />
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 600,
                color: '#0F2027',
                mb: 1,
              }}
            >
              No Classes Yet
            </Typography>
            <Typography variant="body1" sx={{ color: '#546e7a', mb: 3 }}>
              Get started by creating your first class
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateDialog}
              sx={{
                background: 'linear-gradient(135deg, #0b2021 0%, #203A43 100%)',
                color: '#FFD700',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 600,
                textTransform: 'none',
                px: 3,
                py: 1.25,
                borderRadius: '10px',
              }}
            >
              Create Your First Class
            </Button>
          </Paper>
        )}
      </Container>

      {/* Class Selection Dialog */}
      <Dialog
        open={openClassSelectionDialog}
        onClose={handleCloseClassSelectionDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(15, 32, 39, 0.15)',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#0F2027',
            borderBottom: '1px solid rgba(15, 32, 39, 0.1)',
            pb: 2,
          }}
        >
          Create New Class
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <FormControl
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover fieldset': {
                  borderColor: '#0b2021',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0b2021',
                },
              },
            }}
          >
            <InputLabel id="class-type-label">Class</InputLabel>
            <Select
              labelId="class-type-label"
              id="class-type-select"
              value={selectedClassType}
              label="Class"
              onChange={handleClassTypeChange}
            >
              {CLASS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <School sx={{ fontSize: 20, color: '#0b2021' }} />
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 3 }} />

          <FormControl
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover fieldset': {
                  borderColor: '#0b2021',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0b2021',
                },
              },
            }}
          >
            <InputLabel id="target-exam-label">Target Exam</InputLabel>
            <Select
              labelId="target-exam-label"
              id="target-exam-select"
              value={selectedTargetExamType}
              label="Target Exam"
              onChange={handleTargetExamTypeChange}
            >
              {TARGET_EXAM_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <TrendingUp sx={{ fontSize: 20, color: '#0b2021' }} />
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 3 }} />

          <FormControl
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover fieldset': {
                  borderColor: '#0b2021',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0b2021',
                },
              },
            }}
          >
            <InputLabel id="stream-label">Stream</InputLabel>
            <Select
              labelId="stream-label"
              id="stream-select"
              value={selectedStreamType}
              label="Stream"
              onChange={handleStreamTypeChange}
            >
              {STREAM_OPTINS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Category sx={{ fontSize: 20, color: '#0b2021' }} />
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            sx={{
              mt: 3,
              p: 2,
              background: 'rgba(255, 215, 0, 0.08)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 215, 0, 0.2)',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#0F2027',
                lineHeight: 1.6,
              }}
            >
              Select the class you want to create. This will set up the curriculum structure for the selected class.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
          <Button
            onClick={handleCloseClassSelectionDialog}
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 600,
              textTransform: 'none',
              color: '#546e7a',
              borderRadius: '10px',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleProceedToConfirm}
            variant="contained"
            disabled={!selectedClassType}
            sx={{
              background: 'linear-gradient(135deg, #0b2021 0%, #203A43 100%)',
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '10px',
              color: "white",
              px: 3,
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(15, 32, 39, 0.15)',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#0F2027',
            borderBottom: '1px solid rgba(15, 32, 39, 0.1)',
            pb: 2,
          }}
        >
          Confirm Class Creation
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 3, color: '#546e7a' }}>
            Are you sure you want to create the following class?
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #0b2021 0%, #203A43 100%)',
              borderRadius: '12px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 700,
                color: '#FFD700',
                mb: 1,
              }}
            >
              {CLASS_OPTIONS.find(opt => opt.value === selectedClassType)?.label}
              {' • '}
              {TARGET_EXAM_OPTIONS.find(opt => opt.value === selectedTargetExamType)?.label}
              {' • '}
              {STREAM_OPTINS.find(opt => opt.value === selectedStreamType)?.label}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              This will create a new class with default curriculum structure.
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
          <Button
            onClick={handleCloseConfirmDialog}
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 600,
              textTransform: 'none',
              color: '#546e7a',
              borderRadius: '10px',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmCreateClass}
            variant="contained"
            sx={{
              background: '#FFD700',
              color: '#0b2021',
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 700,
              textTransform: 'none',
              borderRadius: '10px',
              px: 3,
              '&:hover': {
                background: '#FFE57F',
              },
            }}
          >
            Create Class
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Class Dialog */}
      {editingNode && (
        <EditClassDialog
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          onSave={handleSaveEdit}
          initialClassType={editingNode.heading}
          initialTargetExam={editingNode.targetExam}
          initialStream={editingNode.stream}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(15, 32, 39, 0.15)',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#d32f2f',
            borderBottom: '1px solid rgba(211, 47, 47, 0.1)',
            pb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Warning />
            Confirm Delete
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography sx={{ mb: 2, color: '#546e7a' }}>
            Are you sure you want to delete this class? This action cannot be undone.
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              background: 'rgba(211, 47, 47, 0.08)',
              borderRadius: '12px',
              border: '1px solid rgba(211, 47, 47, 0.2)',
            }}
          >
            <Typography sx={{ color: '#d32f2f', fontWeight: 600 }}>
              ⚠️ Warning: This will also delete all folders, files, and content inside this class.
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 600,
              textTransform: 'none',
              color: '#546e7a',
              borderRadius: '10px',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              background: '#d32f2f',
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 700,
              textTransform: 'none',
              borderRadius: '10px',
              px: 3,
              '&:hover': {
                background: '#c62828',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            borderRadius: '12px',
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
          }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShowClass;
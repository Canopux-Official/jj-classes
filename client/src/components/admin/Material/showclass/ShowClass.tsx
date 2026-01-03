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
  type SelectChangeEvent,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ClassCard, { type ClassCardProps } from '../classcard/ClassCard';
import ShowSubnode from '../showsubnode/ShowSubNode';

import { MainContainer, PageHeader, ClassGrid } from './ShowClass.styles';
import type { Node } from '../types/node';

import { confirmFolderDeletion, createOrFetchClass, deleteSubFolder, getAllClasses, updateFolder } from '../services/FolderServiceApi';
import NodeDialogForm from '../DialogForm/DialogForm';
import { deleteFileFromDrive } from '../utils/googleDriveService';
import { ClassCardSkeleton } from '../utils/CardSkeleton';


// Available class options
const CLASS_OPTIONS = [
  { value: 'class-9', label: 'Class 9' },
  { value: 'class-10', label: 'Class 10' },
  { value: 'class-11', label: 'Class 11' },
  { value: 'class-12', label: 'Class 12' },
  { value: 'jee', label: 'JEE' },
];

const ShowClass: React.FC = () => {
  const [allNodes, setAllNodes] = useState<Node[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);

  // Dialog states
  const [openClassSelectionDialog, setOpenClassSelectionDialog] = useState(false);
  const [selectedClassType, setSelectedClassType] = useState<string>('');
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

  // Open class selection dialog
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

    // Get the label for the selected class
    const selectedOption = CLASS_OPTIONS.find(opt => opt.value === selectedClassType);
    const className = selectedOption?.label || selectedClassType;

    try {
      const response = await createOrFetchClass(className);

      if (!response.success) {
        throw new Error(response.message || 'Failed to create class');
      }

      const newNode: Node = {
        _id: response.data._id,
        heading: className,
        type: 'folder',
        parentId: null,
        description: '',
        tags: [],
        fileDetails: [],
        referenceDetails: [],
      };

      setAllNodes([...allNodes, newNode]);
      handleCloseConfirmDialog();

      // Show success message
      setSnackbar({
        open: true,
        message: response.message || 'Class created successfully',
        severity: 'success',
      });
    } catch (error: any) {
      console.error('Error creating class:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Error creating class',
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

  const handleSaveEdit = async (nodeData: Partial<Node>) => {
    if (!editingNode) return;

    try {
      const updatedNode: Node = {
        _id: editingNode._id,
        heading: nodeData.heading || "",
        type: nodeData.type || "folder",
        description: nodeData.description || "",
        tags: nodeData.tags || [],
        parentId: editingNode.parentId,
        lastDate: nodeData.lastDate || "",
        fileDetails: nodeData.fileDetails || [],
        referenceDetails: nodeData.referenceDetails || [],
        createdAt: editingNode.createdAt,
      };

      const response = await updateFolder(editingNode._id, updatedNode);

      const updatedNodes = allNodes.map((node) =>
        node._id === editingNode._id ? updatedNode : node
      );

      setAllNodes(updatedNodes);
      handleCloseEditDialog();

      // Show success message
      setSnackbar({
        open: true,
        message: response?.message || 'Class updated successfully',
        severity: 'success',
      });
    } catch (error: any) {
      console.error('Error updating class:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Error updating class',
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

      // Check if Drive deletion is required
      if (result.requiresDriveDeletion && result.driveFileIds) {
        handleCloseDeleteDialog();

        // Show loading state
        setSnackbar({
          open: true,
          message: 'Deleting files from Google Drive...',
          severity: 'info',
        });

        // Delete all files from Google Drive
        let deletedCount = 0;
        for (const fileId of result.driveFileIds) {
          try {
            const success = await deleteFileFromDrive(fileId);
            if (success) deletedCount++;
          } catch (error) {
            console.error('Error deleting file from Drive:', fileId, error);
          }
        }

        // Confirm deletion in backend
        const confirmData = await confirmFolderDeletion(result.folderId ? result.folderId : "");

        if (confirmData.success) {
          // Update UI - delete node and children
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
        // No Drive deletion needed, just update UI
        const updatedNodes = removeNodeAndChildren(deletingNodeId);
        setAllNodes(updatedNodes);
        handleCloseDeleteDialog();

        setSnackbar({
          open: true,
          message: result.message || 'Folder deleted successfully',
          severity: 'success',
        });
      } else {
        // Show error message
        handleCloseDeleteDialog();
        setSnackbar({
          open: true,
          message: result.message || 'Failed to delete folder',
          severity: result.message?.includes('subfolders') ? 'warning' : 'error',
        });
      }
    } catch (error: any) {
      handleCloseDeleteDialog();
      setSnackbar({
        open: true,
        message: error.message || 'Error deleting folder',
        severity: 'error',
      });
    }
  };

  // Helper function to remove node and its children from local state
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

  // If inside a class/folder, show nested content
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

  // Main class list view
  const displayClasses = rootClasses.map((node) => ({
    id: node._id,
    name: node.heading,
    tags: node.tags || [],
    status: 'active' as const,
    description: node.description,
    fileDetails: node.fileDetails || [],
    referenceDetails: node.referenceDetails || [],
    createdAt: node.createdAt,
    lastDate: node.lastDate,
    node: node,
  }));

  return (
    <MainContainer>
      <PageHeader>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#202124',
              fontSize: { xs: '1.75rem', md: '2.125rem' },
            }}
          >
            My Classes
          </Typography>
          <Typography variant="body1" sx={{ color: '#5f6368' }}>
            Manage and view all your enrolled classes
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
          disabled={isLoadingClasses}
          sx={{
            backgroundColor: '#1976d2',
            textTransform: 'none',
            borderRadius: '8px',
            px: 3,
            py: 1.5,
            fontWeight: 600,
          }}
        >
          Create Class
        </Button>
      </PageHeader>

      {/* Loading or Class Grid */}
      {isLoadingClasses ? (
        <ClassCardSkeleton count={6} />
      ) : (
        <ClassGrid>
          {displayClasses.map((classItem) => (
            <ClassCard
              key={classItem.id}
              {...classItem}
              onClick={handleClassClick}
              onEdit={handleEditClass}
              onDelete={handleDeleteClass}
            />
          ))}
        </ClassGrid>
      )}

      {/* Class Selection Dialog */}
      <Dialog
        open={openClassSelectionDialog}
        onClose={handleCloseClassSelectionDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Select Class Type
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <FormControl fullWidth>
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
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="body2" sx={{ mt: 2, color: '#5f6368' }}>
            Select the class you want to create. This will set up the curriculum structure for the selected class.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseClassSelectionDialog}>Cancel</Button>
          <Button
            onClick={handleProceedToConfirm}
            variant="contained"
            disabled={!selectedClassType}
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
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          Confirm Class Creation
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to create the following class?
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              border: '1px solid #e0e0e0',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
              {CLASS_OPTIONS.find(opt => opt.value === selectedClassType)?.label}
            </Typography>
            <Typography variant="body2" sx={{ color: '#5f6368', mt: 0.5 }}>
              This will create a new class with default curriculum structure.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmCreateClass}
            variant="contained"
            color="primary"
          >
            Create Class
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Class Dialog */}
      {editingNode && (
        <NodeDialogForm
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          onSave={handleSaveEdit}
          initialData={editingNode}
          title="Edit Class"
          parentId="root"
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this class? This action cannot be undone.
          </Typography>
          <Typography sx={{ mt: 2, color: 'error.main', fontWeight: 600 }}>
            Warning: This will also delete all folders, files, and content inside this class.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
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
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainContainer>
  );
};

export default ShowClass;
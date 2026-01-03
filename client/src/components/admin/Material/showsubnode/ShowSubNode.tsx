
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Folder as FolderIcon,
  NavigateNext as NavigateNextIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import type { Node } from '../types/node';
import NodeDialogForm from '../DialogForm/DialogForm';
import SubnodeCard from '../subnode/SubNode';
import { confirmFolderDeletion, createFolder, deleteSubFolder, getChildrenByParentId, updateFolder } from '../services/FolderServiceApi';
import { deleteFileFromDrive } from '../utils/googleDriveService';
import { ClassCardSkeleton, LoadingSpinner } from '../utils/CardSkeleton';

interface ShowSubnodeProps {
  nodeId: string;
  nodes: Node[];
  onBack: () => void;
  onNodesUpdate?: (nodes: Node[]) => void;
}

const ShowSubnode: React.FC<ShowSubnodeProps> = ({
  nodeId: initialNodeId,
  nodes: initialNodes,
  onBack,
  onNodesUpdate,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [localNodes, setLocalNodes] = useState<Node[]>(initialNodes);
  const [currentNodeId, setCurrentNodeId] = useState<string>(initialNodeId);
  const [navigationStack, setNavigationStack] = useState<string[]>([initialNodeId]);
  const [isLoadingChildren, setIsLoadingChildren] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingNode, setEditingNode] = useState<Node | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingNodeId, setDeletingNodeId] = useState<string | null>(null);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  useEffect(() => {
    const fetchChildNodes = async () => {
      if (!currentNodeId) return;

      setIsLoadingChildren(true);

      try {
        const children = await getChildrenByParentId(currentNodeId);

        setLocalNodes((prevNodes) => {
          const nodesWithoutCurrentChildren = prevNodes.filter(
            (node) => node.parentId !== currentNodeId
          );
          return [...nodesWithoutCurrentChildren, ...children];
        });
      } catch (error) {
        console.error('Error fetching child nodes:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load child nodes',
          severity: 'error',
        });
      } finally {
        setIsLoadingChildren(false);
        setIsInitialLoad(false);
      }
    };

    fetchChildNodes();
  }, [currentNodeId]);

  const currentNode = localNodes.find((node) => node._id === currentNodeId);
  const childNodes = localNodes.filter((node) => node.parentId === currentNodeId);

  const buildBreadcrumbPath = (targetNodeId: string): Node[] => {
    const path: Node[] = [];
    let currentId: string | null = targetNodeId;

    while (currentId) {
      const node = localNodes.find((n) => n._id === currentId);
      if (!node) break;
      path.unshift(node);
      currentId = node.parentId;
    }

    return path;
  };

  const breadcrumbPath = currentNode ? buildBreadcrumbPath(currentNodeId) : [];

  const handleNodeClick = (childId: string) => {
    const childNode = localNodes.find((n) => n._id === childId);
    if (childNode?.type === 'folder') {
      setCurrentNodeId(childId);
      setNavigationStack([...navigationStack, childId]);
    }
  };

  const handleBackClick = () => {
    if (navigationStack.length > 1) {
      const newStack = [...navigationStack];
      newStack.pop();
      const previousNodeId = newStack[newStack.length - 1];
      setNavigationStack(newStack);
      setCurrentNodeId(previousNodeId);
    } else {
      onBack();
    }
  };

  const handleBreadcrumbClick = (nodeId: string) => {
    const nodeIndex = navigationStack.indexOf(nodeId);
    if (nodeIndex !== -1) {
      const newStack = navigationStack.slice(0, nodeIndex + 1);
      setNavigationStack(newStack);
      setCurrentNodeId(nodeId);
    }
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateNode = async (nodeData: Partial<Node>) => {
    try {
      const newNode: Node = {
        _id: Date.now().toString(),
        heading: nodeData.heading!,
        type: nodeData.type || 'folder',
        parentId: currentNodeId,
        description: nodeData.description || '',
        tags: nodeData.tags || [],
        createdAt: new Date().toISOString(),
        lastDate: nodeData.lastDate,
        fileDetails: nodeData.fileDetails || [],
        referenceDetails: nodeData.referenceDetails || [],
      };

      const result = await createFolder(currentNodeId, newNode);

      if ((result as { success: string }).success) {
        const updatedNodes = [...localNodes, ((result as { data: Node }).data)];
        setLocalNodes(updatedNodes);
        onNodesUpdate?.(updatedNodes);

        setSnackbar({
          open: true,
          message: ((result as { message: string }).message) || 'Folder created successfully',
          severity: 'success',
        });
      } else {
        setSnackbar({
          open: true,
          message: ((result as { message: string }).message) || 'Failed to create folder',
          severity: 'error',
        });
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || 'Error creating folder',
        severity: 'error',
      });
    }
  };

  const handleEditNode = (node: Node) => {
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
        heading: nodeData.heading!,
        type: nodeData.type || editingNode.type,
        description: nodeData.description || editingNode.description,
        tags: nodeData.tags || editingNode.tags,
        parentId: editingNode.parentId,
        lastDate: nodeData.lastDate || editingNode.lastDate,
        fileDetails: nodeData.fileDetails,
        referenceDetails: nodeData.referenceDetails,
        createdAt: editingNode.createdAt,
      };

      const result = await updateFolder(editingNode._id, updatedNode);

      if ((result as { success: string }).success) {
        const updatedNodes = localNodes.map((node) =>
          node._id === editingNode._id ? updatedNode : node
        );
        setLocalNodes(updatedNodes);
        onNodesUpdate?.(updatedNodes);
        handleCloseEditDialog();

        setSnackbar({
          open: true,
          message: ((result as { message: string }).message) || 'Folder updated successfully',
          severity: 'success',
        });
      } else {
        setSnackbar({
          open: true,
          message: ((result as { message: string }).message) || 'Failed to update folder',
          severity: 'error',
        });
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || 'Error updating folder',
        severity: 'error',
      });
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    setDeletingNodeId(nodeId);
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

          setLocalNodes(updatedNodes);
          onNodesUpdate?.(updatedNodes);

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

        setLocalNodes(updatedNodes);
        onNodesUpdate?.(updatedNodes);
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
    } catch (error: any) {
      handleCloseDeleteDialog();
      setSnackbar({
        open: true,
        message: error.message || 'Error deleting folder',
        severity: 'error',
      });
    }
  };

  const removeNodeAndChildren = (nodeId: string): typeof localNodes => {
    const deleteNodeAndChildren = (id: string): string[] => {
      const idsToDelete = [id];
      const children = localNodes.filter((node) => node.parentId === id);
      children.forEach((child) => {
        idsToDelete.push(...deleteNodeAndChildren(child._id));
      });
      return idsToDelete;
    };

    const idsToDelete = deleteNodeAndChildren(nodeId);
    return localNodes.filter((node) => !idsToDelete.includes(node._id));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (!currentNode && !isInitialLoad) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h6" color="error">
          Node not found
        </Typography>
        <Button onClick={onBack} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      maxWidth: '1600px',
      margin: '0 auto',
    }}>
      {/* Header Section */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        {/* Back Button and Breadcrumbs */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 1, sm: 2 }, 
          mb: 2,
          flexWrap: 'wrap',
        }}>
          <IconButton 
            onClick={handleBackClick} 
            sx={{ 
              color: '#1976d2',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' }
            }}
            size={isMobile ? 'small' : 'medium'}
          >
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{
              flex: 1,
              minWidth: 0,
              '& .MuiBreadcrumbs-ol': {
                flexWrap: 'wrap',
              }
            }}
          >
            {breadcrumbPath.map((node, index) => {
              const isLast = index === breadcrumbPath.length - 1;
              return (
                <Box
                  key={node._id}
                  onClick={() => !isLast && handleBreadcrumbClick(node._id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: isLast ? 'default' : 'pointer',
                    maxWidth: { xs: '150px', sm: '200px', md: 'none' },
                    overflow: 'hidden',
                    '&:hover': {
                      textDecoration: isLast ? 'none' : 'underline',
                    },
                  }}
                >
                  <FolderIcon
                    sx={{
                      fontSize: { xs: 16, sm: 18 },
                      color: isLast ? '#1976d2' : '#5f6368',
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: isLast ? 600 : 400,
                      color: isLast ? '#202124' : '#5f6368',
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {node.heading}
                  </Typography>
                </Box>
              );
            })}
          </Breadcrumbs>
        </Box>

        {/* Folder Info Card */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', md: 'flex-start' },
          gap: { xs: 2, md: 3 },
          p: { xs: 2.5, sm: 3, md: 3.5 },
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e8eaed',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant={isMobile ? 'h5' : 'h4'} 
              sx={{ 
                fontWeight: 700, 
                color: '#202124',
                mb: { xs: 1, sm: 1.5 },
                wordBreak: 'break-word',
              }}
            >
              {currentNode?.heading}
            </Typography>
            
            {currentNode?.description && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#5f6368', 
                  mb: 2,
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: { xs: 3, sm: 2 },
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {currentNode.description}
              </Typography>
            )}

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 1.5, sm: 2 },
              flexWrap: 'wrap',
            }}>
              {isLoadingChildren ? (
                <LoadingSpinner text="Loading..." />
              ) : (
                <>
                  <Chip
                    icon={<FolderIcon sx={{ fontSize: 18 }} />}
                    label={`${childNodes.length} item${childNodes.length !== 1 ? 's' : ''}`}
                    size="small"
                    sx={{
                      backgroundColor: '#e8f0fe',
                      color: '#1967d2',
                      fontWeight: 500,
                      fontSize: '0.8125rem',
                    }}
                  />
                  
                  {currentNode?.lastDate && (
                    <Chip
                      icon={<CalendarIcon sx={{ fontSize: 16 }} />}
                      label={new Date(currentNode.lastDate).toLocaleDateString()}
                      size="small"
                      sx={{
                        backgroundColor: '#f8f9fa',
                        color: '#5f6368',
                        fontSize: '0.8125rem',
                      }}
                    />
                  )}

                  {currentNode?.tags && currentNode.tags.length > 0 && (
                    <>
                      {currentNode.tags.slice(0, isMobile ? 2 : 3).map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: '#f1f3f4',
                            color: '#3c4043',
                            fontSize: '0.75rem',
                          }}
                        />
                      ))}
                      {currentNode.tags.length > (isMobile ? 2 : 3) && (
                        <Typography variant="caption" sx={{ color: '#5f6368' }}>
                          +{currentNode.tags.length - (isMobile ? 2 : 3)} more
                        </Typography>
                      )}
                    </>
                  )}
                </>
              )}
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={!isMobile && <AddIcon />}
            onClick={handleOpenCreateDialog}
            disabled={isLoadingChildren}
            sx={{
              backgroundColor: '#1976d2',
              textTransform: 'none',
              borderRadius: '8px',
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontWeight: 600,
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              alignSelf: { xs: 'stretch', md: 'flex-start' },
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              '&:disabled': {
                backgroundColor: '#e0e0e0',
              }
            }}
          >
            {isMobile ? <AddIcon /> : 'Add Item'}
          </Button>
        </Box>
      </Box>

      {/* Child Nodes Grid or Loading State */}
      {isLoadingChildren ? (
        <ClassCardSkeleton count={isMobile ? 4 : isTablet ? 6 : 8} />
      ) : childNodes.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
              xl: 'repeat(5, 1fr)',
            },
            gap: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          {childNodes.map((node) => (
            <SubnodeCard
              key={node._id}
              node={node}
              onClick={handleNodeClick}
              onEdit={handleEditNode}
              onDelete={handleDeleteNode}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 6, sm: 8, md: 10 },
            px: 2,
            color: '#5f6368',
          }}
        >
          <FolderIcon sx={{ fontSize: { xs: 48, sm: 64 }, color: '#dadce0', mb: 2 }} />
          <Typography variant={isMobile ? 'body1' : 'h6'} sx={{ mb: 1, fontWeight: 500 }}>
            This folder is empty
          </Typography>
          <Typography variant="body2" sx={{ color: '#80868b' }}>
            Click "Add Item" to create folders or files
          </Typography>
        </Box>
      )}

      {/* Dialogs */}
      <NodeDialogForm
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        onSave={handleCreateNode}
        title="Create New Item"
        parentId={currentNodeId}
      />

      {editingNode && (
        <NodeDialogForm
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          onSave={handleSaveEdit}
          initialData={editingNode}
          title={`Edit ${editingNode.type === 'folder' ? 'Folder' : 'File'}`}
          parentId={editingNode.parentId || ''}
        />
      )}

      <Dialog 
        open={openDeleteDialog} 
        onClose={handleCloseDeleteDialog}
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : '12px',
            maxWidth: '500px',
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Are you sure you want to delete this item? This action cannot be undone.
          </Typography>
          {localNodes.find((n) => n._id === deletingNodeId)?.type === 'folder' && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Warning: This will also delete all files inside this folder.
              </Typography>
            </Alert>
          )}
          <Alert severity="warning">
            <Typography variant="body2">
              Note: Subfolders must be deleted separately before deleting the parent folder.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={handleCloseDeleteDialog}
            sx={{ 
              textTransform: 'none',
              color: '#5f6368',
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
    </Box>
  );
};

export default ShowSubnode;
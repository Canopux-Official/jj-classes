// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Breadcrumbs,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
//   useMediaQuery,
//   useTheme,
//   Paper,
//   Fade,
//   Chip,
// } from '@mui/material';
// import {
//   Home as HomeIcon,
//   Add as AddIcon,
//   NavigateNext as NavigateNextIcon,
//   Warning as WarningIcon,
//   Folder as FolderIcon,
// } from '@mui/icons-material';
// import type { Node } from '../types/node';
// import NodeDialogForm from '../DialogForm/DialogForm';
// import SubnodeCard from '../subnode/SubNode';
// import { confirmFolderDeletion, createFolder, deleteSubFolder, getChildrenByParentId, updateFolder } from '../services/FolderServiceApi';
// import { deleteFileFromDrive } from '../utils/googleDriveService';
// import { ClassCardSkeleton, LoadingSpinner } from '../utils/CardSkeleton';

// interface ShowSubnodeProps {
//   nodeId: string;
//   nodes: Node[];
//   onBack: () => void;
//   onNodesUpdate?: (nodes: Node[]) => void;
// }

// const ShowSubnode: React.FC<ShowSubnodeProps> = ({
//   nodeId: initialNodeId,
//   nodes: initialNodes,
//   onBack,
//   onNodesUpdate,
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   const [localNodes, setLocalNodes] = useState<Node[]>(initialNodes);
//   const [currentNodeId, setCurrentNodeId] = useState<string>(initialNodeId);
//   const [navigationStack, setNavigationStack] = useState<string[]>([initialNodeId]);
//   const [isLoadingChildren, setIsLoadingChildren] = useState(false);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [openCreateDialog, setOpenCreateDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [editingNode, setEditingNode] = useState<Node | null>(null);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [deletingNodeId, setDeletingNodeId] = useState<string | null>(null);




//   const [snackbar, setSnackbar] = useState<{
//     open: boolean;
//     message: string;
//     severity: 'success' | 'error' | 'warning' | 'info';
//   }>({
//     open: false,
//     message: '',
//     severity: 'info',
//   });

//   useEffect(() => {
//     const fetchChildNodes = async () => {
//       if (!currentNodeId) return;

//       setIsLoadingChildren(true);

//       try {
//         const children = await getChildrenByParentId(currentNodeId);

//         setLocalNodes((prevNodes) => {
//           const nodesWithoutCurrentChildren = prevNodes.filter(
//             (node) => node.parentId !== currentNodeId
//           );
//           return [...nodesWithoutCurrentChildren, ...children];
//         });
//       } catch (error) {
//         console.error('Error fetching child nodes:', error);
//         setSnackbar({
//           open: true,
//           message: 'Failed to load child nodes',
//           severity: 'error',
//         });
//       } finally {
//         setIsLoadingChildren(false);
//         setIsInitialLoad(false);
//       }
//     };

//     fetchChildNodes();
//   }, [currentNodeId]);

//   const currentNode = localNodes.find((node) => node._id === currentNodeId);
//   const childNodes = localNodes.filter((node) => node.parentId === currentNodeId);

//   console.log(currentNode)
//   console.log(childNodes)

//   const buildBreadcrumbPath = (targetNodeId: string): Node[] => {
//     const path: Node[] = [];
//     let currentId: string | null = targetNodeId;

//     while (currentId) {
//       const node = localNodes.find((n) => n._id === currentId);
//       if (!node) break;
//       path.unshift(node);
//       currentId = node.parentId;
//     }

//     return path;
//   };

//   const breadcrumbPath = currentNode ? buildBreadcrumbPath(currentNodeId) : [];

//   const handleNodeClick = (childId: string) => {
//     const childNode = localNodes.find((n) => n._id === childId);
//     if (childNode?.type === 'folder') {
//       setCurrentNodeId(childId);
//       setNavigationStack([...navigationStack, childId]);
//     }
//   };

//   // const handleBackClick = () => {
//   //   if (navigationStack.length > 1) {
//   //     const newStack = [...navigationStack];
//   //     newStack.pop();
//   //     const previousNodeId = newStack[newStack.length - 1];
//   //     setNavigationStack(newStack);
//   //     setCurrentNodeId(previousNodeId);
//   //   } else {
//   //     onBack();
//   //   }
//   // };

//   const handleBreadcrumbClick = (nodeId: string) => {
//     const nodeIndex = navigationStack.indexOf(nodeId);
//     if (nodeIndex !== -1) {
//       const newStack = navigationStack.slice(0, nodeIndex + 1);
//       setNavigationStack(newStack);
//       setCurrentNodeId(nodeId);
//     }
//   };

//   const handleOpenCreateDialog = () => {
//     setOpenCreateDialog(true);
//   };

//   const handleCloseCreateDialog = () => {
//     setOpenCreateDialog(false);
//   };

//   const handleCreateNode = async (nodeData: Partial<Node>) => {
//     try {
//       const newNode: Node = {
//         _id: Date.now().toString(),
//         heading: nodeData.heading!,
//         type: nodeData.type || 'folder',
//         parentId: currentNodeId,
//         targetExam: "",
//         stream: "",
//         classType: "",
//         description: nodeData.description || '',
//         tags: nodeData.tags || [],
//         createdAt: new Date().toISOString(),
//         lastDate: nodeData.lastDate,
//         fileDetails: nodeData.fileDetails || [],
//         referenceDetails: nodeData.referenceDetails || [],
//       };

//       const result = await createFolder(currentNodeId, newNode);

//       if ((result as { success: string }).success) {
//         const updatedNodes = [...localNodes, ((result as { data: Node }).data)];
//         setLocalNodes(updatedNodes);
//         onNodesUpdate?.(updatedNodes);

//         setSnackbar({
//           open: true,
//           message: ((result as { message: string }).message) || 'Folder created successfully',
//           severity: 'success',
//         });
//       } else {
//         setSnackbar({
//           open: true,
//           message: ((result as { message: string }).message) || 'Failed to create folder',
//           severity: 'error',
//         });
//       }
//     } catch (error: any) {
//       setSnackbar({
//         open: true,
//         message: error.message || 'Error creating folder',
//         severity: 'error',
//       });
//     }
//   };

//   const handleEditNode = (node: Node) => {
//     setEditingNode(node);
//     setOpenEditDialog(true);
//   };

//   const handleCloseEditDialog = () => {
//     setOpenEditDialog(false);
//     setEditingNode(null);
//   };

//   const handleSaveEdit = async (nodeData: Partial<Node>) => {
//     if (!editingNode) return;

//     try {
//       const updatedNode: Node = {
//         _id: editingNode._id,
//         heading: nodeData.heading!,
//         type: nodeData.type || editingNode.type,
//         targetExam: nodeData.targetExam || editingNode.targetExam,
//         stream: nodeData.stream || editingNode.stream,
//         classType: nodeData.classType || editingNode.classType,
//         description: nodeData.description || editingNode.description,
//         tags: nodeData.tags || editingNode.tags,
//         parentId: editingNode.parentId,
//         lastDate: nodeData.lastDate || editingNode.lastDate,
//         fileDetails: nodeData.fileDetails,
//         referenceDetails: nodeData.referenceDetails,
//         createdAt: editingNode.createdAt,
//       };

//       const result = await updateFolder(editingNode._id, updatedNode);

//       if ((result as { success: string }).success) {
//         const updatedNodes = localNodes.map((node) =>
//           node._id === editingNode._id ? updatedNode : node
//         );
//         setLocalNodes(updatedNodes);
//         onNodesUpdate?.(updatedNodes);
//         handleCloseEditDialog();

//         setSnackbar({
//           open: true,
//           message: ((result as { message: string }).message) || 'Folder updated successfully',
//           severity: 'success',
//         });
//       } else {
//         setSnackbar({
//           open: true,
//           message: ((result as { message: string }).message) || 'Failed to update folder',
//           severity: 'error',
//         });
//       }
//     } catch (error: any) {
//       setSnackbar({
//         open: true,
//         message: error.message || 'Error updating folder',
//         severity: 'error',
//       });
//     }
//   };

//   const handleDeleteNode = (nodeId: string) => {
//     setDeletingNodeId(nodeId);
//     setOpenDeleteDialog(true);
//   };

//   const handleCloseDeleteDialog = () => {
//     setOpenDeleteDialog(false);
//     setDeletingNodeId(null);
//   };

//   const handleConfirmDelete = async () => {
//     if (!deletingNodeId) return;

//     try {
//       const result = await deleteSubFolder(deletingNodeId);

//       if (result.requiresDriveDeletion && result.driveFileIds) {
//         handleCloseDeleteDialog();

//         setSnackbar({
//           open: true,
//           message: 'Deleting files from Google Drive...',
//           severity: 'info',
//         });

//         let deletedCount = 0;
//         for (const fileId of result.driveFileIds) {
//           try {
//             const success = await deleteFileFromDrive(fileId);
//             if (success) deletedCount++;
//           } catch (error) {
//             console.error('Error deleting file from Drive:', fileId, error);
//           }
//         }

//         const confirmData = await confirmFolderDeletion(result.folderId ? result.folderId : "");

//         if (confirmData.success) {
//           const updatedNodes = removeNodeAndChildren(deletingNodeId);

//           setLocalNodes(updatedNodes);
//           onNodesUpdate?.(updatedNodes);

//           setSnackbar({
//             open: true,
//             message: `Deleted ${deletedCount} file(s) from Drive and folder successfully`,
//             severity: 'success',
//           });
//         } else {
//           setSnackbar({
//             open: true,
//             message: confirmData.message || 'Failed to complete folder deletion',
//             severity: 'error',
//           });
//         }
//       } else if (result.success) {
//         const updatedNodes = removeNodeAndChildren(deletingNodeId);

//         setLocalNodes(updatedNodes);
//         onNodesUpdate?.(updatedNodes);
//         handleCloseDeleteDialog();

//         setSnackbar({
//           open: true,
//           message: result.message || 'Folder deleted successfully',
//           severity: 'success',
//         });
//       } else {
//         handleCloseDeleteDialog();
//         setSnackbar({
//           open: true,
//           message: result.message || 'Failed to delete folder',
//           severity: result.message?.includes('subfolders') ? 'warning' : 'error',
//         });
//       }
//     } catch (error: any) {
//       handleCloseDeleteDialog();
//       setSnackbar({
//         open: true,
//         message: error.message || 'Error deleting folder',
//         severity: 'error',
//       });
//     }
//   };

//   const removeNodeAndChildren = (nodeId: string): typeof localNodes => {
//     const deleteNodeAndChildren = (id: string): string[] => {
//       const idsToDelete = [id];
//       const children = localNodes.filter((node) => node.parentId === id);
//       children.forEach((child) => {
//         idsToDelete.push(...deleteNodeAndChildren(child._id));
//       });
//       return idsToDelete;
//     };

//     const idsToDelete = deleteNodeAndChildren(nodeId);
//     return localNodes.filter((node) => !idsToDelete.includes(node._id));
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   if (!currentNode && !isInitialLoad) {
//     return (
//       <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
//         <Typography variant="h6" color="error">
//           Node not found
//         </Typography>
//         <Button onClick={onBack} sx={{ mt: 2 }}>
//           Go Back
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: '#f8f9fa',
//         p: { xs: 2, sm: 3, md: 4 },
//       }}
//     >
//       <Box sx={{ maxWidth: '1600px', margin: '0 auto' }}>
//         {/* Compact Header with Breadcrumbs and Add Button */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 1.5, sm: 2 },
//             mb: 3,
//             borderRadius: '12px',
//             background: '#ffffff',
//             border: '1px solid #e8eaed',
//           }}
//         >
//           {/* Single Row - Breadcrumbs and Add Button */}
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               gap: 2,
//               flexWrap: isMobile ? 'wrap' : 'nowrap',
//             }}
//           >
//             {/* Breadcrumbs with Home Icon */}
//             <Breadcrumbs
//               separator={<NavigateNextIcon fontSize="small" sx={{ color: '#80868b' }} />}
//               sx={{
//                 flex: 1,
//                 minWidth: 0,
//                 '& .MuiBreadcrumbs-ol': {
//                   flexWrap: 'wrap',
//                 },
//               }}
//             >
//               {/* Home Icon */}
//               <Box
//                 onClick={onBack}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   cursor: 'pointer',
//                   color: '#5f6368',
//                   transition: 'all 0.2s ease',
//                   padding: '4px 8px',
//                   borderRadius: '6px',
//                   '&:hover': {
//                     color: '#1a472a',
//                     backgroundColor: '#f1f3f4',
//                   },
//                   '&:active': {
//                     backgroundColor: '#e8eaed',
//                   },
//                 }}
//               >
//                 <HomeIcon sx={{ fontSize: '1.25rem' }} />
//               </Box>

//               {/* Breadcrumb Path */}
//               {breadcrumbPath.map((node, index) => {
//                 const isLast = index === breadcrumbPath.length - 1;
//                 return (
//                   <Typography
//                     key={node._id}
//                     onClick={() => !isLast && handleBreadcrumbClick(node._id)}
//                     sx={{
//                       cursor: isLast ? 'default' : 'pointer',
//                       color: isLast ? '#1a472a' : '#5f6368',
//                       fontSize: '0.875rem',
//                       fontWeight: isLast ? 600 : 400,
//                       maxWidth: { xs: '120px', sm: '180px', md: 'none' },
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                       padding: '4px 8px',
//                       borderRadius: '6px',
//                       transition: 'all 0.2s ease',
//                       ...(!isLast && {
//                         '&:hover': {
//                           color: '#1a472a',
//                           backgroundColor: '#f1f3f4',
//                         },
//                         '&:active': {
//                           backgroundColor: '#e8eaed',
//                           color: '#0d2818',
//                         },
//                       }),
//                     }}
//                   >
//                     {node.heading}
//                   </Typography>
//                 );
//               })}
//             </Breadcrumbs>

//             {/* Add Button */}
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleOpenCreateDialog}
//               disabled={isLoadingChildren}
//               sx={{
//                 background: '#1a472a',
//                 color: '#ffffff',
//                 fontWeight: 600,
//                 borderRadius: '8px',
//                 px: 2.5,
//                 py: 0.75,
//                 fontSize: '0.875rem',
//                 textTransform: 'none',
//                 whiteSpace: 'nowrap',
//                 minWidth: 'fit-content',
//                 '&:hover': {
//                   background: '#0d2818',
//                 },
//                 '&:disabled': {
//                   background: '#e0e0e0',
//                   color: '#9e9e9e',
//                 },
//               }}
//             >
//               {isMobile ? 'Add' : 'Add Item'}
//             </Button>
//           </Box>

//           {/* Folder Title and Info Row */}
//           <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//             <Typography
//               variant={isMobile ? 'h6' : 'h5'}
//               sx={{
//                 fontWeight: 700,
//                 color: '#1a1a1a',
//                 wordBreak: 'break-word',
//                 lineHeight: 1.2,
//               }}
//             >
//               {currentNode?.heading}
//             </Typography>

//             {/* Item Count Chip */}
//             {!isLoadingChildren && (
//               <Chip
//                 label={`${childNodes.length} item${childNodes.length !== 1 ? 's' : ''}`}
//                 size="small"
//                 sx={{
//                   backgroundColor: '#e8f5e9',
//                   color: '#1a472a',
//                   fontWeight: 600,
//                   fontSize: '0.75rem',
//                   height: '24px',
//                 }}
//               />
//             )}

//             {/* Due Date */}
//             {currentNode?.lastDate && (
//               <Chip
//                 label={`Due: ${new Date(currentNode.lastDate).toLocaleDateString()}`}
//                 size="small"
//                 sx={{
//                   backgroundColor: '#ffebee',
//                   color: '#d32f2f',
//                   fontWeight: 600,
//                   fontSize: '0.75rem',
//                   height: '24px',
//                 }}
//               />
//             )}

//             {isLoadingChildren && <LoadingSpinner text="Loading..." />}
//           </Box>

//           {/* Description (if exists) */}
//           {currentNode?.description && (
//             <Typography
//               variant="body2"
//               sx={{
//                 color: '#5f6368',
//                 mt: 1.5,
//                 lineHeight: 1.5,
//                 fontSize: '0.875rem',
//               }}
//             >
//               {currentNode.description}
//             </Typography>
//           )}
//         </Paper>

//         {/* Child Nodes or Loading State */}
//         {isLoadingChildren ? (
//           <ClassCardSkeleton count={isMobile ? 4 : isTablet ? 6 : 8} />
//         ) : childNodes.length > 0 ? (
//           <Fade in={!isLoadingChildren} timeout={500}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 gap: { xs: 2, sm: 2.5, md: 3 },
//                 justifyContent: { xs: 'center', sm: 'flex-start' },
//               }}
//             >
//               {childNodes.map((node) => (
//                 <Box
//                   key={node._id}
//                   sx={{
//                     width: {
//                       xs: '100%',
//                       sm: 'calc(50% - 10px)',
//                       md: 'calc(33.333% - 16px)',
//                       lg: 'calc(25% - 18px)',
//                       xl: 'calc(20% - 19.2px)',
//                     },
//                     minWidth: { xs: '100%', sm: '280px' },
//                     maxWidth: { xs: '100%', sm: '450px' },
//                   }}
//                 >
//                   <SubnodeCard
//                     node={node}
//                     onClick={handleNodeClick}
//                     onEdit={handleEditNode}
//                     onDelete={handleDeleteNode}
//                   />
//                 </Box>
//               ))}
//             </Box>
//           </Fade>
//         ) : (
//           <Paper
//             elevation={0}
//             sx={{
//               textAlign: 'center',
//               py: { xs: 8, sm: 10, md: 12 },
//               px: 2,
//               borderRadius: '12px',
//               border: '2px dashed #dadce0',
//               background: '#ffffff',
//             }}
//           >
//             <FolderIcon sx={{ fontSize: 64, color: '#dadce0', mb: 2 }} />
//             <Typography
//               variant="h6"
//               sx={{
//                 mb: 1,
//                 fontWeight: 600,
//                 color: '#1a1a1a',
//               }}
//             >
//               This folder is empty
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 color: '#5f6368',
//               }}
//             >
//               Click "Add Item" to create folders or files
//             </Typography>
//           </Paper>
//         )}
//       </Box>

//       {/* Dialogs */}
//       <NodeDialogForm
//         open={openCreateDialog}
//         onClose={handleCloseCreateDialog}
//         onSave={handleCreateNode}
//         title="Create New Item"
//         parentId={currentNodeId}
//       />

//       {editingNode && (
//         <NodeDialogForm
//           open={openEditDialog}
//           onClose={handleCloseEditDialog}
//           onSave={handleSaveEdit}
//           initialData={editingNode}
//           title={`Edit ${editingNode.type === 'folder' ? 'Folder' : 'File'}`}
//           parentId={editingNode.parentId || ''}
//         />
//       )}

//       <Dialog
//         open={openDeleteDialog}
//         onClose={handleCloseDeleteDialog}
//         fullScreen={isMobile}
//         PaperProps={{
//           sx: {
//             borderRadius: isMobile ? 0 : '12px',
//             maxWidth: '500px',
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             fontWeight: 600,
//             pb: 2,
//             fontSize: '1.25rem',
//             color: '#1a1a1a',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1,
//           }}
//         >
//           <WarningIcon sx={{ color: '#d32f2f' }} />
//           Confirm Delete
//         </DialogTitle>
//         <DialogContent sx={{ pt: 2 }}>
//           <Typography
//             sx={{
//               mb: 2,
//               color: '#5f6368',
//               fontSize: '0.9375rem',
//             }}
//           >
//             Are you sure you want to delete this item? This action cannot be undone.
//           </Typography>
//           {localNodes.find((n) => n._id === deletingNodeId)?.type === 'folder' && (
//             <Alert
//               severity="warning"
//               sx={{
//                 mb: 2,
//                 borderRadius: '8px',
//               }}
//             >
//               This will also delete all files inside this folder.
//             </Alert>
//           )}
//           <Alert
//             severity="info"
//             sx={{
//               borderRadius: '8px',
//             }}
//           >
//             Subfolders must be deleted separately before deleting the parent folder.
//           </Alert>
//         </DialogContent>
//         <DialogActions sx={{ p: 2.5, gap: 1 }}>
//           <Button
//             onClick={handleCloseDeleteDialog}
//             sx={{
//               fontWeight: 600,
//               textTransform: 'none',
//               color: '#5f6368',
//               borderRadius: '8px',
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleConfirmDelete}
//             variant="contained"
//             sx={{
//               background: '#d32f2f',
//               borderRadius: '8px',
//               fontWeight: 600,
//               textTransform: 'none',
//               '&:hover': {
//                 background: '#c62828',
//               },
//             }}
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{
//             width: '100%',
//             borderRadius: '8px',
//             fontWeight: 600,
//           }}
//           variant="filled"
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ShowSubnode;


import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
  Paper,
  Fade,
  Chip,
} from '@mui/material';
import {
  Home as HomeIcon,
  Add as AddIcon,
  NavigateNext as NavigateNextIcon,
  Warning as WarningIcon,
  Folder as FolderIcon,
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

  // Sync with parent nodes when they change (e.g., after editing class name)
  useEffect(() => {
    setLocalNodes(initialNodes);
  }, [initialNodes]);
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

  console.log(currentNode)
  console.log(childNodes)

  // USE THE PATH FROM BACKEND - Much more efficient!
  // The path already contains the full ancestry, so just append current node
  const breadcrumbPath = currentNode 
    ? [...(currentNode.path || []), { id: currentNode._id, heading: currentNode.heading }]
    : [];

  const handleNodeClick = (childId: string) => {
    const childNode = localNodes.find((n) => n._id === childId);
    if (childNode?.type === 'folder') {
      setCurrentNodeId(childId);
      setNavigationStack([...navigationStack, childId]);
    }
  };

  const handleBreadcrumbClick = (nodeId: string) => {
    // Find index in breadcrumb path
    const pathIndex = breadcrumbPath.findIndex(p => p.id === nodeId);
    
    if (pathIndex !== -1) {
      // Update navigation stack to match the clicked breadcrumb
      const newStack = breadcrumbPath.slice(0, pathIndex + 1).map(p => p.id);
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
        targetExam: "",
        stream: "",
        classType: "",
        description: nodeData.description || '',
        tags: nodeData.tags || [],
        createdAt: new Date().toISOString(),
        lastDate: nodeData.lastDate,
        fileDetails: nodeData.fileDetails || [],
        referenceDetails: nodeData.referenceDetails || [],
        path: [], // Backend will populate this
      };

      const result = await createFolder(currentNodeId, newNode);

      if ((result as { success: string }).success) {
        const createdNode = (result as { data: Node }).data;
        const updatedNodes = [...localNodes, createdNode];
        setLocalNodes(updatedNodes);
        onNodesUpdate?.(updatedNodes);

        // Show breadcrumb in success message if available
        const breadcrumb = (result as any).breadcrumb;
        const message = breadcrumb 
          ? `Created: ${breadcrumb}`
          : ((result as { message: string }).message) || 'Folder created successfully';

        setSnackbar({
          open: true,
          message,
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
        targetExam: nodeData.targetExam || editingNode.targetExam,
        stream: nodeData.stream || editingNode.stream,
        classType: nodeData.classType || editingNode.classType,
        description: nodeData.description || editingNode.description,
        tags: nodeData.tags || editingNode.tags,
        parentId: editingNode.parentId,
        lastDate: nodeData.lastDate || editingNode.lastDate,
        fileDetails: nodeData.fileDetails,
        referenceDetails: nodeData.referenceDetails,
        createdAt: editingNode.createdAt,
        path: editingNode.path,
      };

      const result = await updateFolder(editingNode._id, updatedNode);

      if ((result as { success: string }).success) {
        const returnedData = (result as { data: Node }).data;
        
        // If the backend updated paths, re-fetch current folder to get fresh data
        const headingChanged = nodeData.heading && nodeData.heading !== editingNode.heading;
        
        if (headingChanged && (result as any).pathsUpdated) {
          // Re-fetch children to get updated paths
          const refreshedChildren = await getChildrenByParentId(currentNodeId);
          setLocalNodes((prevNodes) => {
            const nodesWithoutCurrentChildren = prevNodes.filter(
              (node) => node.parentId !== currentNodeId
            );
            return [...nodesWithoutCurrentChildren, ...refreshedChildren];
          });
        } else {
          // Just update the single node
          const updatedNodes = localNodes.map((node) =>
            node._id === editingNode._id ? returnedData : node
          );
          setLocalNodes(updatedNodes);
        }
        
        onNodesUpdate?.(localNodes);
        handleCloseEditDialog();

        // Show breadcrumb in success message if available
        const breadcrumb = (result as any).breadcrumb;
        const message = breadcrumb 
          ? `Updated: ${breadcrumb}`
          : ((result as { message: string }).message) || 'Folder updated successfully';

        setSnackbar({
          open: true,
          message,
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
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f8f9fa',
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Compact Header with Breadcrumbs and Add Button */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2 },
            mb: 3,
            borderRadius: '12px',
            background: '#ffffff',
            border: '1px solid #e8eaed',
          }}
        >
          {/* Single Row - Breadcrumbs and Add Button */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              flexWrap: isMobile ? 'wrap' : 'nowrap',
            }}
          >
            {/* Breadcrumbs with Home Icon - NOW USING BACKEND PATH */}
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" sx={{ color: '#80868b' }} />}
              sx={{
                flex: 1,
                minWidth: 0,
                '& .MuiBreadcrumbs-ol': {
                  flexWrap: 'wrap',
                },
              }}
            >
              {/* Home Icon */}
              <Box
                onClick={onBack}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: '#5f6368',
                  transition: 'all 0.2s ease',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  '&:hover': {
                    color: '#1a472a',
                    backgroundColor: '#f1f3f4',
                  },
                  '&:active': {
                    backgroundColor: '#e8eaed',
                  },
                }}
              >
                <HomeIcon sx={{ fontSize: '1.25rem' }} />
              </Box>

              {/* Breadcrumb Path from Backend */}
              {breadcrumbPath.map((pathItem, index) => {
                const isLast = index === breadcrumbPath.length - 1;
                return (
                  <Typography
                    key={pathItem.id}
                    onClick={() => !isLast && handleBreadcrumbClick(pathItem.id)}
                    sx={{
                      cursor: isLast ? 'default' : 'pointer',
                      color: isLast ? '#1a472a' : '#5f6368',
                      fontSize: '0.875rem',
                      fontWeight: isLast ? 600 : 400,
                      maxWidth: { xs: '120px', sm: '180px', md: 'none' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      transition: 'all 0.2s ease',
                      ...(!isLast && {
                        '&:hover': {
                          color: '#1a472a',
                          backgroundColor: '#f1f3f4',
                        },
                        '&:active': {
                          backgroundColor: '#e8eaed',
                          color: '#0d2818',
                        },
                      }),
                    }}
                  >
                    {pathItem.heading}
                  </Typography>
                );
              })}
            </Breadcrumbs>

            {/* Add Button */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateDialog}
              disabled={isLoadingChildren}
              sx={{
                background: '#1a472a',
                color: '#ffffff',
                fontWeight: 600,
                borderRadius: '8px',
                px: 2.5,
                py: 0.75,
                fontSize: '0.875rem',
                textTransform: 'none',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content',
                '&:hover': {
                  background: '#0d2818',
                },
                '&:disabled': {
                  background: '#e0e0e0',
                  color: '#9e9e9e',
                },
              }}
            >
              {isMobile ? 'Add' : 'Add Item'}
            </Button>
          </Box>

          {/* Folder Title and Info Row */}
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{
                fontWeight: 700,
                color: '#1a1a1a',
                wordBreak: 'break-word',
                lineHeight: 1.2,
              }}
            >
              {currentNode?.heading}
            </Typography>

            {/* Item Count Chip */}
            {!isLoadingChildren && (
              <Chip
                label={`${childNodes.length} item${childNodes.length !== 1 ? 's' : ''}`}
                size="small"
                sx={{
                  backgroundColor: '#e8f5e9',
                  color: '#1a472a',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: '24px',
                }}
              />
            )}

            {/* Due Date */}
            {currentNode?.lastDate && (
              <Chip
                label={`Due: ${new Date(currentNode.lastDate).toLocaleDateString()}`}
                size="small"
                sx={{
                  backgroundColor: '#ffebee',
                  color: '#d32f2f',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: '24px',
                }}
              />
            )}

            {isLoadingChildren && <LoadingSpinner text="Loading..." />}
          </Box>

          {/* Description (if exists) */}
          {currentNode?.description && (
            <Typography
              variant="body2"
              sx={{
                color: '#5f6368',
                mt: 1.5,
                lineHeight: 1.5,
                fontSize: '0.875rem',
              }}
            >
              {currentNode.description}
            </Typography>
          )}
        </Paper>

        {/* Child Nodes or Loading State */}
        {isLoadingChildren ? (
          <ClassCardSkeleton count={isMobile ? 4 : isTablet ? 6 : 8} />
        ) : childNodes.length > 0 ? (
          <Fade in={!isLoadingChildren} timeout={500}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 2, sm: 2.5, md: 3 },
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              {childNodes.map((node) => (
                <Box
                  key={node._id}
                  sx={{
                    width: {
                      xs: '100%',
                      sm: 'calc(50% - 10px)',
                      md: 'calc(33.333% - 16px)',
                      lg: 'calc(25% - 18px)',
                      xl: 'calc(20% - 19.2px)',
                    },
                    minWidth: { xs: '100%', sm: '280px' },
                    maxWidth: { xs: '100%', sm: '450px' },
                  }}
                >
                  <SubnodeCard
                    node={node}
                    onClick={handleNodeClick}
                    onEdit={handleEditNode}
                    onDelete={handleDeleteNode}
                  />
                </Box>
              ))}
            </Box>
          </Fade>
        ) : (
          <Paper
            elevation={0}
            sx={{
              textAlign: 'center',
              py: { xs: 8, sm: 10, md: 12 },
              px: 2,
              borderRadius: '12px',
              border: '2px dashed #dadce0',
              background: '#ffffff',
            }}
          >
            <FolderIcon sx={{ fontSize: 64, color: '#dadce0', mb: 2 }} />
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: 600,
                color: '#1a1a1a',
              }}
            >
              This folder is empty
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#5f6368',
              }}
            >
              Click "Add Item" to create folders or files
            </Typography>
          </Paper>
        )}
      </Box>

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
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            pb: 2,
            fontSize: '1.25rem',
            color: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <WarningIcon sx={{ color: '#d32f2f' }} />
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography
            sx={{
              mb: 2,
              color: '#5f6368',
              fontSize: '0.9375rem',
            }}
          >
            Are you sure you want to delete this item? This action cannot be undone.
          </Typography>
          {localNodes.find((n) => n._id === deletingNodeId)?.type === 'folder' && (
            <Alert
              severity="warning"
              sx={{
                mb: 2,
                borderRadius: '8px',
              }}
            >
              This will also delete all files inside this folder.
            </Alert>
          )}
          <Alert
            severity="info"
            sx={{
              borderRadius: '8px',
            }}
          >
            Subfolders must be deleted separately before deleting the parent folder.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{
              fontWeight: 600,
              textTransform: 'none',
              color: '#5f6368',
              borderRadius: '8px',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              background: '#d32f2f',
              borderRadius: '8px',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                background: '#c62828',
              },
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
          sx={{
            width: '100%',
            borderRadius: '8px',
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

export default ShowSubnode;
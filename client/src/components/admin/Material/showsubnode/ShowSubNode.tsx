// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Breadcrumbs,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
//   Chip,
//   useMediaQuery,
//   useTheme,
//   Paper,
//   Fade,
// } from '@mui/material';
// import {
//   ArrowBack as ArrowBackIcon,
//   Add as AddIcon,
//   Folder as FolderIcon,
//   NavigateNext as NavigateNextIcon,
//   CalendarToday as CalendarIcon,
//   Warning as WarningIcon,
//   Info as InfoIcon,
//   FolderOpen as FolderOpenIcon,
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

//   const handleBackClick = () => {
//     if (navigationStack.length > 1) {
//       const newStack = [...navigationStack];
//       newStack.pop();
//       const previousNodeId = newStack[newStack.length - 1];
//       setNavigationStack(newStack);
//       setCurrentNodeId(previousNodeId);
//     } else {
//       onBack();
//     }
//   };

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
//         background: 'linear-gradient(135deg, #fdfbf7 0%, #f5f5f5 100%)',
//         p: { xs: 2, sm: 3, md: 4 },
//       }}
//     >
//       <Box sx={{ maxWidth: '1600px', margin: '0 auto' }}>
//         {/* Breadcrumbs Navigation */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 2, sm: 2.5 },
//             mb: 3,
//             borderRadius: '12px',
//             background: '#ffffff',
//             border: '1px solid rgba(11, 32, 33, 0.08)',
//             display: 'flex',
//             alignItems: 'center',
//             gap: { xs: 1, sm: 2 },
//             flexWrap: 'wrap',
//           }}
//         >
//           <IconButton
//             onClick={handleBackClick}
//             sx={{
//               color: '#0b2021',
//               background: 'rgba(11, 32, 33, 0.06)',
//               '&:hover': {
//                 background: 'rgba(11, 32, 33, 0.12)',
//               },
//             }}
//             size={isMobile ? 'small' : 'medium'}
//           >
//             <ArrowBackIcon />
//           </IconButton>
//           <Breadcrumbs
//             separator={<NavigateNextIcon fontSize="small" sx={{ color: '#546e7a' }} />}
//             sx={{
//               flex: 1,
//               minWidth: 0,
//               '& .MuiBreadcrumbs-ol': {
//                 flexWrap: 'wrap',
//               },
//             }}
//           >
//             {breadcrumbPath.map((node, index) => {
//               const isLast = index === breadcrumbPath.length - 1;
//               return (
//                 <Box
//                   key={node._id}
//                   onClick={() => !isLast && handleBreadcrumbClick(node._id)}
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 0.5,
//                     cursor: isLast ? 'default' : 'pointer',
//                     maxWidth: { xs: '150px', sm: '200px', md: 'none' },
//                     overflow: 'hidden',
//                     transition: 'all 0.2s ease',
//                     '&:hover': {
//                       opacity: isLast ? 1 : 0.7,
//                     },
//                   }}
//                 >
//                   <FolderIcon
//                     sx={{
//                       fontSize: { xs: 16, sm: 18 },
//                       color: isLast ? '#FFD700' : '#546e7a',
//                       flexShrink: 0,
//                     }}
//                   />
//                   <Typography
//                     sx={{
//                       fontFamily: '"Open Sans", sans-serif',
//                       fontWeight: isLast ? 600 : 400,
//                       color: isLast ? '#0F2027' : '#546e7a',
//                       fontSize: { xs: '0.8rem', sm: '0.875rem' },
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     {node.heading}
//                   </Typography>
//                 </Box>
//               );
//             })}
//           </Breadcrumbs>
//         </Paper>

//         {/* Folder Info Header - Professional Rectangle */}
//         <Paper
//           elevation={0}
//           sx={{
//             mb: 4,
//             borderRadius: '16px',
//             background: '#ffffff',
//             border: '1px solid rgba(11, 32, 33, 0.08)',
//             overflow: 'hidden',
//             boxShadow: '0 2px 8px rgba(11, 32, 33, 0.06)',
//           }}
//         >
//           {/* Gradient Top Border */}
//           <Box
//             sx={{
//               height: '4px',
//               background: 'linear-gradient(90deg, #0b2021 0%, #203A43 100%)',
//             }}
//           />
          
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: { xs: 'column', md: 'row' },
//               justifyContent: 'space-between',
//               alignItems: { xs: 'stretch', md: 'flex-start' },
//               gap: { xs: 2, md: 3 },
//               p: { xs: 3, sm: 3.5, md: 4 },
//             }}
//           >
//             <Box sx={{ flex: 1, minWidth: 0 }}>
//               {/* Folder Icon and Title */}
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
//                 <Box
//                   sx={{
//                     width: 56,
//                     height: 56,
//                     borderRadius: '12px',
//                     background: 'linear-gradient(135deg, #0b2021 0%, #203A43 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     flexShrink: 0,
//                   }}
//                 >
//                   <FolderOpenIcon sx={{ color: '#9bc8c5', fontSize: 32 }} />
//                 </Box>
//                 <Box sx={{ flex: 1, minWidth: 0 }}>
//                   <Typography
//                     variant={isMobile ? 'h5' : 'h4'}
//                     sx={{
//                       fontFamily: '"Montserrat", sans-serif',
//                       fontWeight: 700,
//                       color: '#0F2027',
//                       wordBreak: 'break-word',
//                       lineHeight: 1.3,
//                     }}
//                   >
//                     {currentNode?.heading}
//                   </Typography>
//                   {currentNode?.targetExam && (
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: '#011816',
//                         fontWeight: 600,
//                         mt: 0.5,
//                       }}
//                     >
//                       Target: {currentNode.targetExam}
//                     </Typography>
//                   )}
//                 </Box>
//               </Box>

//               {currentNode?.description && (
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: '#546e7a',
//                     mb: 2.5,
//                     lineHeight: 1.6,
//                     fontFamily: '"Open Sans", sans-serif',
//                   }}
//                 >
//                   {currentNode.description}
//                 </Typography>
//               )}

//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1.5,
//                   flexWrap: 'wrap',
//                 }}
//               >
//                 {isLoadingChildren ? (
//                   <LoadingSpinner text="Loading..." />
//                 ) : (
//                   <>
//                     <Chip
//                       icon={<FolderIcon sx={{ fontSize: 18 }} />}
//                       label={`${childNodes.length} item${childNodes.length !== 1 ? 's' : ''}`}
//                       size="small"
//                       sx={{
//                         background: 'rgba(11, 32, 33, 0.08)',
//                         color: '#0b2021',
//                         fontWeight: 600,
//                         fontSize: '0.8125rem',
//                         border: '1px solid rgba(11, 32, 33, 0.12)',
//                         height: 28,
//                       }}
//                     />

//                     {currentNode?.lastDate && (
//                       <Chip
//                         icon={<CalendarIcon sx={{ fontSize: 16 }} />}
//                         label={new Date(currentNode.lastDate).toLocaleDateString()}
//                         size="small"
//                         sx={{
//                           background: 'rgba(255, 215, 0, 0.12)',
//                           color: '#C79100',
//                           fontSize: '0.8125rem',
//                           fontWeight: 500,
//                           height: 28,
//                         }}
//                       />
//                     )}

//                     {currentNode?.tags && currentNode.tags.length > 0 && (
//                       <>
//                         {currentNode.tags.slice(0, isMobile ? 2 : 3).map((tag, idx) => (
//                           <Chip
//                             key={idx}
//                             label={tag}
//                             size="small"
//                             sx={{
//                               background: '#f1f3f4',
//                               color: '#0F2027',
//                               fontSize: '0.75rem',
//                               height: 28,
//                             }}
//                           />
//                         ))}
//                         {currentNode.tags.length > (isMobile ? 2 : 3) && (
//                           <Typography variant="caption" sx={{ color: '#546e7a' }}>
//                             +{currentNode.tags.length - (isMobile ? 2 : 3)} more
//                           </Typography>
//                         )}
//                       </>
//                     )}
//                   </>
//                 )}
//               </Box>
//             </Box>

//             <Button
//               variant="contained"
//               startIcon={!isMobile && <AddIcon />}
//               onClick={handleOpenCreateDialog}
//               disabled={isLoadingChildren}
//               sx={{
//                 background: '#011816',
//                 color: 'white',
//                 fontFamily: '"Montserrat", sans-serif',
//                 fontWeight: 700,
//                 borderRadius: '12px',
//                 px: { xs: 2.5, sm: 3.5 },
//                 py: { xs: 1.25, sm: 1.5 },
//                 fontSize: { xs: '0.875rem', sm: '0.9375rem' },
//                 alignSelf: { xs: 'stretch', md: 'flex-start' },
//                 whiteSpace: 'nowrap',
//                 '&:hover': {
//                   background: '#011816',
//                   transform: 'translateY(-2px)',
//                 },
//                 transition: 'all 0.3s ease',
//                 '&:disabled': {
//                   background: '#e0e0e0',
//                   color: '#9e9e9e',
//                 },
//               }}
//             >
//               {isMobile ? <AddIcon /> : 'Add Item'}
//             </Button>
//           </Box>
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
//               borderRadius: '16px',
//               border: '2px dashed rgba(11, 32, 33, 0.2)',
//               background: '#ffffff',
//             }}
//           >
//             <Box
//               sx={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: '16px',
//                 background: 'rgba(11, 32, 33, 0.06)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 margin: '0 auto',
//                 mb: 3,
//               }}
//             >
//               <FolderOpenIcon sx={{ fontSize: 40, color: 'rgba(11, 32, 33, 0.3)' }} />
//             </Box>
//             <Typography
//               variant={isMobile ? 'body1' : 'h6'}
//               sx={{
//                 mb: 1,
//                 fontFamily: '"Montserrat", sans-serif',
//                 fontWeight: 600,
//                 color: '#0F2027',
//               }}
//             >
//               This folder is empty
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 color: '#546e7a',
//                 fontFamily: '"Open Sans", sans-serif',
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
//             borderRadius: isMobile ? 0 : '16px',
//             maxWidth: '500px',
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             fontFamily: '"Montserrat", sans-serif',
//             fontWeight: 700,
//             pb: 1,
//             fontSize: '1.25rem',
//             color: '#d32f2f',
//             borderBottom: '1px solid rgba(211, 47, 47, 0.1)',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <WarningIcon />
//             Confirm Delete
//           </Box>
//         </DialogTitle>
//         <DialogContent sx={{ pt: 3 }}>
//           <Typography
//             sx={{
//               mb: 2,
//               color: '#546e7a',
//               fontFamily: '"Open Sans", sans-serif',
//             }}
//           >
//             Are you sure you want to delete this item? This action cannot be undone.
//           </Typography>
//           {localNodes.find((n) => n._id === deletingNodeId)?.type === 'folder' && (
//             <Alert
//               severity="error"
//               icon={<WarningIcon />}
//               sx={{
//                 mb: 2,
//                 borderRadius: '12px',
//                 background: 'rgba(211, 47, 47, 0.08)',
//                 border: '1px solid rgba(211, 47, 47, 0.2)',
//               }}
//             >
//               <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                 Warning: This will also delete all files inside this folder.
//               </Typography>
//             </Alert>
//           )}
//           <Alert
//             severity="warning"
//             icon={<InfoIcon />}
//             sx={{
//               borderRadius: '12px',
//               background: 'rgba(255, 152, 0, 0.08)',
//               border: '1px solid rgba(255, 152, 0, 0.2)',
//             }}
//           >
//             <Typography variant="body2">
//               Note: Subfolders must be deleted separately before deleting the parent folder.
//             </Typography>
//           </Alert>
//         </DialogContent>
//         <DialogActions sx={{ p: 2.5, gap: 1 }}>
//           <Button
//             onClick={handleCloseDeleteDialog}
//             sx={{
//               fontFamily: '"Montserrat", sans-serif',
//               fontWeight: 600,
//               textTransform: 'none',
//               color: '#546e7a',
//               borderRadius: '10px',
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleConfirmDelete}
//             variant="contained"
//             sx={{
//               fontFamily: '"Montserrat", sans-serif',
//               background: '#d32f2f',
//               borderRadius: '10px',
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
//             borderRadius: '12px',
//             fontFamily: '"Montserrat", sans-serif',
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

  // const handleBackClick = () => {
  //   if (navigationStack.length > 1) {
  //     const newStack = [...navigationStack];
  //     newStack.pop();
  //     const previousNodeId = newStack[newStack.length - 1];
  //     setNavigationStack(newStack);
  //     setCurrentNodeId(previousNodeId);
  //   } else {
  //     onBack();
  //   }
  // };

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
        targetExam: "",
        stream: "",
        classType: "",
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
            {/* Breadcrumbs with Home Icon */}
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

              {/* Breadcrumb Path */}
              {breadcrumbPath.map((node, index) => {
                const isLast = index === breadcrumbPath.length - 1;
                return (
                  <Typography
                    key={node._id}
                    onClick={() => !isLast && handleBreadcrumbClick(node._id)}
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
                    {node.heading}
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
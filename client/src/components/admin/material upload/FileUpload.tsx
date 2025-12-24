// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Chip,
//   IconButton,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from '@mui/material';
// import type { SelectChangeEvent } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import DescriptionIcon from '@mui/icons-material/Description';
// import FolderIcon from '@mui/icons-material/Folder';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import FolderOpenIcon from '@mui/icons-material/FolderOpen';
// import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
// import {
//   StyledContainer,
//   StyledPaper,
//   HeaderBox,
//   SectionTitle,
//   UploadButton,
//   UploadSection,
//   MaterialsSection,
// } from './FileUpload.styles';

// interface FileItem {
//   id: string;
//   name: string;
//   size: number;
// }

// interface Node {
//   id: string;
//   name: string;
//   type: 'folder' | 'file';
//   parentId: string | null;
//   heading?: string;
//   description?: string;
//   tags?: string[];
//   uploadDate?: string;
//   size?: string;
//   classLevel?: string;
// }

// const FileUpload: React.FC = () => {
//   const [selectedClassLevel, setSelectedClassLevel] = useState<string>('');
//   const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);
//   const [successMessage, setSuccessMessage] = useState<string>('');

//   // Hierarchical structure
//   const [nodes, setNodes] = useState<Node[]>([]);

//   const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
//   const [selectedNode, setSelectedNode] = useState<string | null>(null);

//   // Dialog states
//   const [showFolderDialog, setShowFolderDialog] = useState(false);
//   const [folderName, setFolderName] = useState('');
//   const [folderHeading, setFolderHeading] = useState('');
//   const [folderDescription, setFolderDescription] = useState('');
//   const [folderTags, setFolderTags] = useState<string[]>([]);
//   const [folderTagInput, setFolderTagInput] = useState('');

//   const classOptions = [
//     'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6',
//     'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'JEE'
//   ];

//   const handleClassChange = (event: SelectChangeEvent) => {
//     const newClass = event.target.value;
//     setSelectedClassLevel(newClass);
    
//     // Check if root folder exists for this class
//     const existingRoot = nodes.find(n => n.name === newClass && n.parentId === null);
    
//     if (existingRoot) {
//       setSelectedNode(existingRoot.id);
//       setExpandedNodes(new Set([existingRoot.id]));
//     } else {
//       // Create root folder for this class
//       const rootId = `root-${Date.now()}`;
//       const newRoot: Node = {
//         id: rootId,
//         name: newClass,
//         type: 'folder',
//         parentId: null,
//         classLevel: newClass,
//       };
//       setNodes([...nodes, newRoot]);
//       setSelectedNode(rootId);
//       setExpandedNodes(new Set([rootId]));
//     }
//   };

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       const newFiles: FileItem[] = Array.from(files).map((file, index) => ({
//         id: `${Date.now()}_${index}`,
//         name: file.name,
//         size: file.size,
//       }));
//       setUploadedFiles([...uploadedFiles, ...newFiles]);
//     }
//   };

//   const handleAddFolderTag = () => {
//     if (folderTagInput.trim() && !folderTags.includes(folderTagInput.trim())) {
//       setFolderTags([...folderTags, folderTagInput.trim()]);
//       setFolderTagInput('');
//     }
//   };

//   const handleDeleteFolderTag = (tagToDelete: string) => {
//     setFolderTags(folderTags.filter(tag => tag !== tagToDelete));
//   };

//   const handleCreateFolder = () => {
//     if (!selectedNode || !folderName.trim()) {
//       return;
//     }

//     const newFolder: Node = {
//       id: `folder-${Date.now()}`,
//       name: folderName,
//       type: 'folder',
//       parentId: selectedNode,
//       heading: folderHeading,
//       description: folderDescription,
//       tags: folderTags,
//       classLevel: selectedClassLevel,
//     };

//     setNodes([...nodes, newFolder]);
//     setExpandedNodes(new Set([...expandedNodes, selectedNode]));

//     // Handle file uploads if any
//     if (uploadedFiles.length > 0) {
//       const newFileNodes: Node[] = uploadedFiles.map((file, idx) => ({
//         id: `file-${Date.now()}-${idx}`,
//         name: file.name,
//         type: 'file' as const,
//         parentId: newFolder.id,
//         uploadDate: new Date().toISOString().split('T')[0],
//         size: formatFileSize(file.size),
//         classLevel: selectedClassLevel,
//       }));
      
//       setNodes(prev => [...prev, ...newFileNodes]);
//       setSuccessMessage(`Folder created with ${uploadedFiles.length} file(s)`);
//       setUploadedFiles([]);
      
//       setTimeout(() => {
//         setSuccessMessage('');
//       }, 2000);
//     }

//     // Reset dialog
//     setShowFolderDialog(false);
//     setFolderName('');
//     setFolderHeading('');
//     setFolderDescription('');
//     setFolderTags([]);
//     setFolderTagInput('');
//   };

//   const handleDeleteNode = (nodeId: string) => {
//     const getDescendants = (id: string): string[] => {
//       const children = nodes.filter(n => n.parentId === id);
//       return [id, ...children.flatMap(child => getDescendants(child.id))];
//     };

//     const toDelete = getDescendants(nodeId);
//     setNodes(nodes.filter(n => !toDelete.includes(n.id)));
    
//     // If deleted node was selected, clear selection
//     if (selectedNode && toDelete.includes(selectedNode)) {
//       setSelectedNode(null);
//     }
//   };

//   const toggleExpand = (nodeId: string) => {
//     const newExpanded = new Set(expandedNodes);
//     if (newExpanded.has(nodeId)) {
//       newExpanded.delete(nodeId);
//     } else {
//       newExpanded.add(nodeId);
//     }
//     setExpandedNodes(newExpanded);
//   };

//   const getChildren = (parentId: string | null) => {
//     return nodes.filter(node => node.parentId === parentId);
//   };

//   const formatFileSize = (bytes: number): string => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
//   };

//   const renderNode = (node: Node, level: number = 0): React.ReactNode => {
//     const children = getChildren(node.id);
//     const hasChildren = children.length > 0;
//     const isExpanded = expandedNodes.has(node.id);
//     const isSelected = selectedNode === node.id;

//     return (
//       <Box key={node.id}>
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1,
//             py: 1,
//             px: 1.5,
//             ml: level * 3,
//             borderRadius: '8px',
//             cursor: 'pointer',
//             backgroundColor: isSelected ? 'rgba(6, 100, 102, 0.08)' : 'transparent',
//             border: isSelected ? '1px solid #066466' : '1px solid transparent',
//             '&:hover': {
//               backgroundColor: isSelected ? 'rgba(6, 100, 102, 0.08)' : '#f5f5f5',
//             },
//           }}
//           onClick={() => {
//             setSelectedNode(node.id);
//             if (node.type === 'folder' && !isExpanded) {
//               toggleExpand(node.id);
//             }
//           }}
//         >
//           {node.type === 'folder' && (
//             <IconButton
//               size="small"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleExpand(node.id);
//               }}
//               sx={{ p: 0.5 }}
//             >
//               {isExpanded ? (
//                 <ExpandMoreIcon sx={{ fontSize: 20 }} />
//               ) : (
//                 <ChevronRightIcon sx={{ fontSize: 20 }} />
//               )}
//             </IconButton>
//           )}

//           {node.type === 'folder' ? (
//             isExpanded ? (
//               <FolderOpenIcon sx={{ fontSize: 20, color: '#066466' }} />
//             ) : (
//               <FolderIcon sx={{ fontSize: 20, color: '#066466' }} />
//             )
//           ) : (
//             <DescriptionIcon sx={{ fontSize: 20, color: '#1976d2' }} />
//           )}

//           <Box sx={{ flex: 1, minWidth: 0 }}>
//             <Typography variant="body2" sx={{ fontWeight: isSelected ? 600 : 500, color: '#0c1c24ff' }}>
//               {node.name}
//             </Typography>
//             {node.heading && (
//               <Typography variant="caption" sx={{ color: '#666' }}>
//                 {node.heading}
//               </Typography>
//             )}
//             {node.tags && node.tags.length > 0 && (
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
//                 {node.tags.map(tag => (
//                   <Chip 
//                     key={tag} 
//                     label={tag} 
//                     size="small" 
//                     sx={{ height: '16px', fontSize: '0.65rem' }}
//                   />
//                 ))}
//               </Box>
//             )}
//           </Box>

//           {node.parentId !== null && (
//             <IconButton
//               size="small"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleDeleteNode(node.id);
//               }}
//               sx={{ color: '#d32f2f' }}
//             >
//               <DeleteIcon sx={{ fontSize: 18 }} />
//             </IconButton>
//           )}
//         </Box>

//         {isExpanded && hasChildren && (
//           <Box>
//             {children.map(child => renderNode(child, level + 1))}
//           </Box>
//         )}
//       </Box>
//     );
//   };

//   const getClassNodes = (className: string) => {
//     const classNode = nodes.find(n => n.classLevel === className && n.parentId === null);
//     return classNode ? [classNode] : [];
//   };

//   const selectedNodeData = nodes.find(n => n.id === selectedNode);
//   const canCreateFolder = selectedNodeData?.type === 'folder';

//   return (
//     <StyledContainer>
//       <Box sx={{ width: '100%', maxWidth: '1400px' }}>
//         <HeaderBox>
//           <FolderIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: '#066466' }} />
//           <Typography variant="h4" sx={{ fontWeight: 700, color: '#0c1c24ff', fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2.01rem' } }}>
//             Upload Materials
//           </Typography>
//         </HeaderBox>

//         {/* Class Selection Dropdown */}
//         <StyledPaper elevation={2} sx={{ mb: 3 }}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Select Class/Level *</InputLabel>
//             <Select
//               value={selectedClassLevel}
//               onChange={handleClassChange}
//               label="Select Class/Level *"
//             >
//               {classOptions.map((cls) => (
//                 <MenuItem key={cls} value={cls}>
//                   {cls}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </StyledPaper>

//         {successMessage && (
//           <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
//             {successMessage}
//           </Alert>
//         )}

//         {selectedClassLevel && (
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
//             {/* Upload Section */}
//             <Box sx={{ flex: { xs: '1', lg: '0 0 420px' } }}>
//               <UploadSection elevation={2}>
//                 <SectionTitle variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
//                   <CloudUploadIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: { xs: 20, sm: 24 } }} />
//                   Manage Structure
//                 </SectionTitle>

//                 {/* Selected Node Info */}
//                 {selectedNodeData && (
//                   <Alert severity="info" sx={{ mb: 2, borderRadius: '8px' }}>
//                     <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                       Selected: {selectedNodeData.name}
//                     </Typography>
//                     {selectedNodeData.heading && (
//                       <Typography variant="caption">{selectedNodeData.heading}</Typography>
//                     )}
//                     {selectedNodeData.description && (
//                       <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
//                         {selectedNodeData.description}
//                       </Typography>
//                     )}
//                   </Alert>
//                 )}

//                 {/* Create Folder Button */}
//                 {canCreateFolder ? (
//                   <Button
//                     variant="outlined"
//                     startIcon={<CreateNewFolderIcon />}
//                     onClick={() => setShowFolderDialog(true)}
//                     fullWidth
//                     sx={{
//                       mb: 2,
//                       borderColor: '#066466',
//                       color: '#066466',
//                       '&:hover': {
//                         borderColor: '#055254',
//                         backgroundColor: 'rgba(6, 100, 102, 0.04)',
//                       },
//                     }}
//                   >
//                     Create Subfolder
//                   </Button>
//                 ) : (
//                   <Alert severity="warning" sx={{ borderRadius: '8px' }}>
//                     Select a folder from the tree to create subfolders
//                   </Alert>
//                 )}
//               </UploadSection>
//             </Box>

//             {/* Materials Tree Section */}
//             <Box sx={{ flex: 1 }}>
//               <MaterialsSection elevation={2}>
//                 <SectionTitle variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
//                   <FolderIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: { xs: 20, sm: 24 } }} />
//                   {selectedClassLevel} Structure
//                 </SectionTitle>

//                 <Box sx={{ maxHeight: { xs: '500px', md: '700px' }, overflowY: 'auto', pr: 1 }}>
//                   {getClassNodes(selectedClassLevel).length > 0 ? (
//                     getClassNodes(selectedClassLevel).map(node => renderNode(node))
//                   ) : (
//                     <Box sx={{ textAlign: 'center', py: 6, color: '#999' }}>
//                       <FolderIcon sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
//                       <Typography variant="body1">No structure created yet</Typography>
//                       <Typography variant="body2" sx={{ mt: 1 }}>
//                         Click "Create Subfolder" to start building your hierarchy
//                       </Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </MaterialsSection>
//             </Box>
//           </Box>
//         )}

//         {!selectedClassLevel && (
//           <Box sx={{ textAlign: 'center', py: 8 }}>
//             <FolderIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
//             <Typography variant="h6" color="textSecondary">
//               Please select a class/level to begin
//             </Typography>
//           </Box>
//         )}

//         {/* Create Folder Dialog */}
//         <Dialog open={showFolderDialog} onClose={() => setShowFolderDialog(false)} maxWidth="sm" fullWidth>
//           <DialogTitle>Create New Subfolder</DialogTitle>
//           <DialogContent>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
//               <TextField
//                 fullWidth
//                 label="Folder Name *"
//                 value={folderName}
//                 onChange={(e) => setFolderName(e.target.value)}
//                 placeholder="e.g., Science, Physics, Assignments"
//                 size="small"
//               />

//               <TextField
//                 fullWidth
//                 label="Heading (Optional)"
//                 value={folderHeading}
//                 onChange={(e) => setFolderHeading(e.target.value)}
//                 placeholder="e.g., Chapter 1"
//                 size="small"
//               />

//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 label="Description (Optional)"
//                 value={folderDescription}
//                 onChange={(e) => setFolderDescription(e.target.value)}
//                 placeholder="Enter folder description..."
//                 size="small"
//               />

//               <input
//                 accept="*"
//                 style={{ display: 'none' }}
//                 id="file-upload-input"
//                 multiple
//                 type="file"
//                 onChange={handleFileSelect}
//               />
//               <label htmlFor="file-upload-input" style={{ display: 'block' }}>
//                 <UploadButton variant="outlined" startIcon={<CloudUploadIcon />} fullWidth>
//                   Choose Files (Optional)
//                 </UploadButton>
//               </label>

//               {uploadedFiles.length > 0 && (
//                 <Alert severity="success" sx={{ borderRadius: '8px' }}>
//                   <Typography variant="body2">
//                     {uploadedFiles.length} file(s) selected
//                   </Typography>
//                   {uploadedFiles.map((file) => (
//                     <Typography key={file.id} variant="caption" sx={{ display: 'block' }}>
//                       • {file.name} ({formatFileSize(file.size)})
//                     </Typography>
//                   ))}
//                 </Alert>
//               )}

//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 <TextField
//                   fullWidth
//                   label="Add Tags (Optional)"
//                   value={folderTagInput}
//                   onChange={(e) => setFolderTagInput(e.target.value)}
//                   onKeyPress={(e) => {
//                     if (e.key === 'Enter') {
//                       e.preventDefault();
//                       handleAddFolderTag();
//                     }
//                   }}
//                   size="small"
//                   placeholder="Press Enter"
//                 />
//                 <IconButton color="primary" onClick={handleAddFolderTag} size="small">
//                   <AddIcon />
//                 </IconButton>
//               </Box>

//               {folderTags.length > 0 && (
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                   {folderTags.map((tag) => (
//                     <Chip
//                       key={tag}
//                       label={tag}
//                       onDelete={() => handleDeleteFolderTag(tag)}
//                       color="primary"
//                       variant="outlined"
//                       size="small"
//                     />
//                   ))}
//                 </Box>
//               )}
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setShowFolderDialog(false)}>Cancel</Button>
//             <Button
//               onClick={handleCreateFolder}
//               variant="contained"
//               disabled={!folderName.trim()}
//               sx={{
//                 background: 'linear-gradient(135deg, #066466 0%, #0c1c24ff 100%)',
//                 '&:hover': {
//                   background: 'linear-gradient(135deg, #055254 0%, #0a161d 100%)',
//                 },
//                 color: "white"
//               }}
//             >
//               Create Folder
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </StyledContainer>
//   );
// };

// export default FileUpload;


// FileUpload.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import EditIcon from '@mui/icons-material/Edit';
import {
  StyledContainer,
  StyledPaper,
  HeaderBox,
  SectionTitle,
  UploadButton,
  TreeContainer,
  NodeBox,
  ActionButtonsContainer,
} from './FileUpload.styles';

interface FileItem {
  id: string;
  name: string;
  size: number;
}

interface Node {
  id: string;
  name: string;
  type: 'folder' | 'file';
  parentId: string | null;
  heading?: string;
  description?: string;
  tags?: string[];
  uploadDate?: string;
  size?: string;
  classLevel?: string;
}

const FileUpload: React.FC = () => {
  const [selectedClassLevel, setSelectedClassLevel] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [folderHeading, setFolderHeading] = useState('');
  const [folderDescription, setFolderDescription] = useState('');
  const [folderTags, setFolderTags] = useState<string[]>([]);
  const [folderTagInput, setFolderTagInput] = useState('');
  const [editingNode, setEditingNode] = useState<Node | null>(null);

  const classOptions = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6',
    'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'JEE'
  ];

  const handleClassChange = (event: SelectChangeEvent) => {
    const newClass = event.target.value;
    setSelectedClassLevel(newClass);
    
    const existingRoot = nodes.find(n => n.name === newClass && n.parentId === null);
    
    if (existingRoot) {
      setSelectedNode(existingRoot.id);
      setExpandedNodes(new Set([existingRoot.id]));
    } else {
      const rootId = `root-${Date.now()}`;
      const newRoot: Node = {
        id: rootId,
        name: newClass,
        type: 'folder',
        parentId: null,
        classLevel: newClass,
      };
      setNodes([...nodes, newRoot]);
      setSelectedNode(rootId);
      setExpandedNodes(new Set([rootId]));
    }
  };

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

  const handleAddFolderTag = () => {
    if (folderTagInput.trim() && !folderTags.includes(folderTagInput.trim())) {
      setFolderTags([...folderTags, folderTagInput.trim()]);
      setFolderTagInput('');
    }
  };

  const handleDeleteFolderTag = (tagToDelete: string) => {
    setFolderTags(folderTags.filter(tag => tag !== tagToDelete));
  };

  const openCreateFolderDialog = (parentNode: Node, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedNode(parentNode.id);
    setEditingNode(null);
    setFolderName('');
    setFolderHeading('');
    setFolderDescription('');
    setFolderTags([]);
    setUploadedFiles([]);
    setShowFolderDialog(true);
  };

  const openEditFolderDialog = (node: Node, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingNode(node);
    setFolderName(node.name);
    setFolderHeading(node.heading || '');
    setFolderDescription(node.description || '');
    setFolderTags(node.tags || []);
    setShowFolderDialog(true);
  };

  const handleCreateOrUpdateFolder = () => {
    if (!folderName.trim()) return;

    if (editingNode) {
      setNodes(nodes.map(n => 
        n.id === editingNode.id 
          ? { ...n, name: folderName, heading: folderHeading, description: folderDescription, tags: folderTags }
          : n
      ));
      setSuccessMessage('Folder updated successfully');
    } else {
      if (!selectedNode) return;

      const newFolder: Node = {
        id: `folder-${Date.now()}`,
        name: folderName,
        type: 'folder',
        parentId: selectedNode,
        heading: folderHeading,
        description: folderDescription,
        tags: folderTags,
        classLevel: selectedClassLevel,
      };

      setNodes([...nodes, newFolder]);
      setExpandedNodes(new Set([...expandedNodes, selectedNode]));

      if (uploadedFiles.length > 0) {
        const newFileNodes: Node[] = uploadedFiles.map((file, idx) => ({
          id: `file-${Date.now()}-${idx}`,
          name: file.name,
          type: 'file' as const,
          parentId: newFolder.id,
          uploadDate: new Date().toISOString().split('T')[0],
          size: formatFileSize(file.size),
          classLevel: selectedClassLevel,
        }));
        
        setNodes(prev => [...prev, ...newFileNodes]);
        setSuccessMessage(`Folder created with ${uploadedFiles.length} file(s)`);
      } else {
        setSuccessMessage('Folder created successfully');
      }
      
      setUploadedFiles([]);
    }

    setTimeout(() => setSuccessMessage(''), 2000);
    setShowFolderDialog(false);
    setFolderName('');
    setFolderHeading('');
    setFolderDescription('');
    setFolderTags([]);
    setFolderTagInput('');
    setEditingNode(null);
  };

  const handleDeleteNode = (nodeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const getDescendants = (id: string): string[] => {
      const children = nodes.filter(n => n.parentId === id);
      return [id, ...children.flatMap(child => getDescendants(child.id))];
    };

    const toDelete = getDescendants(nodeId);
    setNodes(nodes.filter(n => !toDelete.includes(n.id)));
    
    if (selectedNode && toDelete.includes(selectedNode)) {
      setSelectedNode(null);
    }

    setSuccessMessage('Deleted successfully');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const toggleExpand = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getChildren = (parentId: string | null) => {
    return nodes.filter(node => node.parentId === parentId);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const renderNode = (node: Node, level: number = 0): React.ReactNode => {
    const children = getChildren(node.id);
    const hasChildren = children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isRoot = node.parentId === null;

    return (
      <Box key={node.id}>
        <NodeBox
          isRoot={isRoot}
          level={level}
          onClick={() => {
            if (node.type === 'folder') {
              toggleExpand(node.id);
            }
          }}
        >
          {node.type === 'folder' && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
              }}
              sx={{ p: { xs: 0.25, sm: 0.5 } }}
            >
              {isExpanded ? (
                <ExpandMoreIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              ) : (
                <ChevronRightIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              )}
            </IconButton>
          )}

          {node.type === 'folder' ? (
            isExpanded ? (
              <FolderOpenIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: '#066466' }} />
            ) : (
              <FolderIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: '#066466' }} />
            )
          ) : (
            <DescriptionIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: '#1976d2' }} />
          )}

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: isRoot ? 700 : 500, 
                color: '#0c1c24ff',
                fontSize: { xs: '0.875rem', sm: '0.9375rem' }
              }}
            >
              {node.name}
            </Typography>
            {node.heading && (
              <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                {node.heading}
              </Typography>
            )}
            {node.tags && node.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                {node.tags.map(tag => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    size="small" 
                    sx={{ height: '16px', fontSize: '0.65rem' }}
                  />
                ))}
              </Box>
            )}
          </Box>

          {node.type === 'folder' && (
            <ActionButtonsContainer>
              <Tooltip title="Add Subfolder">
                <IconButton
                  size="small"
                  onClick={(e) => openCreateFolderDialog(node, e)}
                  sx={{ color: '#066466', p: { xs: 0.5, sm: 0.75 } }}
                >
                  <CreateNewFolderIcon sx={{ fontSize: { xs: isRoot ? 16 : 14, sm: isRoot ? 18 : 16 } }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={(e) => openEditFolderDialog(node, e)}
                  sx={{ color: '#1976d2', p: { xs: 0.5, sm: 0.75 } }}
                >
                  <EditIcon sx={{ fontSize: { xs: isRoot ? 16 : 14, sm: isRoot ? 18 : 16 } }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={(e) => handleDeleteNode(node.id, e)}
                  sx={{ color: '#d32f2f', p: { xs: 0.5, sm: 0.75 } }}
                >
                  <DeleteIcon sx={{ fontSize: { xs: isRoot ? 16 : 14, sm: isRoot ? 18 : 16 } }} />
                </IconButton>
              </Tooltip>
            </ActionButtonsContainer>
          )}

          {node.type === 'file' && (
            <IconButton
              size="small"
              onClick={(e) => handleDeleteNode(node.id, e)}
              sx={{ color: '#d32f2f', p: { xs: 0.5, sm: 0.75 } }}
            >
              <DeleteIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
            </IconButton>
          )}
        </NodeBox>

        {isExpanded && hasChildren && (
          <Box>
            {children.map(child => renderNode(child, level + 1))}
          </Box>
        )}
      </Box>
    );
  };

  const getClassNodes = (className: string) => {
    const classNode = nodes.find(n => n.classLevel === className && n.parentId === null);
    return classNode ? [classNode] : [];
  };

  return (
    <StyledContainer>
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <HeaderBox>
          <FolderIcon sx={{ fontSize: { xs: 28, sm: 40 }, color: '#066466' }} />
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: '#0c1c24ff', 
              fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' } 
            }}
          >
            Upload Materials
          </Typography>
        </HeaderBox>

        <StyledPaper elevation={2} sx={{ mb: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Select Class/Level *</InputLabel>
            <Select
              value={selectedClassLevel}
              onChange={handleClassChange}
              label="Select Class/Level *"
            >
              {classOptions.map((cls) => (
                <MenuItem key={cls} value={cls}>
                  {cls}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledPaper>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
            {successMessage}
          </Alert>
        )}

        {selectedClassLevel && (
          <StyledPaper elevation={2}>
            <SectionTitle variant="h6">
              <FolderIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: { xs: 20, sm: 24 } }} />
              {selectedClassLevel} Structure
            </SectionTitle>

            <TreeContainer>
              {getClassNodes(selectedClassLevel).length > 0 ? (
                getClassNodes(selectedClassLevel).map(node => renderNode(node))
              ) : (
                <Box sx={{ textAlign: 'center', py: { xs: 4, sm: 6 }, color: '#999' }}>
                  <FolderIcon sx={{ fontSize: { xs: 50, sm: 60 }, mb: 2, opacity: 0.3 }} />
                  <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    No structure created yet
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                    Structure will appear here once created
                  </Typography>
                </Box>
              )}
            </TreeContainer>
          </StyledPaper>
        )}

        {!selectedClassLevel && (
          <Box sx={{ textAlign: 'center', py: { xs: 6, sm: 8 } }}>
            <FolderIcon sx={{ fontSize: { xs: 60, sm: 80 }, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" color="textSecondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Please select a class/level to begin
            </Typography>
          </Box>
        )}

        <Dialog 
          open={showFolderDialog} 
          onClose={() => setShowFolderDialog(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: { m: { xs: 2, sm: 3 } }
          }}
        >
          <DialogTitle sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            {editingNode ? 'Edit Folder' : 'Create New Subfolder'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                fullWidth
                label="Folder Name *"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="e.g., Science, Physics, Assignments"
                size="small"
              />

              <TextField
                fullWidth
                label="Heading (Optional)"
                value={folderHeading}
                onChange={(e) => setFolderHeading(e.target.value)}
                placeholder="e.g., Chapter 1"
                size="small"
              />

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description (Optional)"
                value={folderDescription}
                onChange={(e) => setFolderDescription(e.target.value)}
                placeholder="Enter folder description..."
                size="small"
              />

              {!editingNode && (
                <>
                  <input
                    accept="*"
                    style={{ display: 'none' }}
                    id="file-upload-input"
                    multiple
                    type="file"
                    onChange={handleFileSelect}
                  />
                  <label htmlFor="file-upload-input" style={{ display: 'block' }}>
                    <UploadButton 
                      variant="outlined" 
                      startIcon={<CloudUploadIcon />} 
                      fullWidth
                    >
                      Choose Files (Optional)
                    </UploadButton>
                  </label>

                  {uploadedFiles.length > 0 && (
                    <Alert severity="success" sx={{ borderRadius: '8px' }}>
                      <Typography variant="body2">
                        {uploadedFiles.length} file(s) selected
                      </Typography>
                      {uploadedFiles.map((file) => (
                        <Typography key={file.id} variant="caption" sx={{ display: 'block' }}>
                          • {file.name} ({formatFileSize(file.size)})
                        </Typography>
                      ))}
                    </Alert>
                  )}
                </>
              )}

              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Add Tags (Optional)"
                  value={folderTagInput}
                  onChange={(e) => setFolderTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFolderTag();
                    }
                  }}
                  size="small"
                  placeholder="Press Enter"
                />
                <IconButton color="primary" onClick={handleAddFolderTag} size="small">
                  <AddIcon />
                </IconButton>
              </Box>

              {folderTags.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {folderTags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleDeleteFolderTag(tag)}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 2.5 } }}>
            <Button onClick={() => setShowFolderDialog(false)}>Cancel</Button>
            <Button
              onClick={handleCreateOrUpdateFolder}
              variant="contained"
              disabled={!folderName.trim()}
              sx={{
                background: 'linear-gradient(135deg, #066466 0%, #0c1c24ff 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #055254 0%, #0a161d 100%)',
                },
                color: "white"
              }}
            >
              {editingNode ? 'Update' : 'Create'} Folder
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </StyledContainer>
  );
};

export default FileUpload;

// FileUpload.styles.ts

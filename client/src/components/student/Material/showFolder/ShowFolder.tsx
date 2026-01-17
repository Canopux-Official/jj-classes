// import { useState, useEffect } from "react";
// import type { Node } from "../../../admin/Material/types/node";
// import { Box, Container, CircularProgress, Snackbar, Alert } from "@mui/material";
// import { Breadcrumbs, Link, Typography, Paper, Chip } from "@mui/material";
// import { Home, NavigateNext, FolderOpen } from "@mui/icons-material";
// import { SubfolderCard } from "../subfolder/Subfolder";
// import { ClassCard } from "../classcard/Classcard";
// import { fetchNodesByParentId, fetchStudentClasses } from "../services/StudentAccessMateral.services";


// interface SnackbarState {
//     open: boolean;
//     message: string;
//     severity: 'success' | 'error' | 'info' | 'warning';
// }

// // Main App Component
// const StudentFolderStructure: React.FC = () => {
//     const [currentPath, setCurrentPath] = useState<Node[]>([]);
//     const [currentItems, setCurrentItems] = useState<Node[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [snackbar, setSnackbar] = useState<SnackbarState>({
//         open: false,
//         message: '',
//         severity: 'info'
//     });

//     // Fetch root level classes on component mount
//     useEffect(() => {
//         loadRootClasses();
//     }, []);

//     const loadRootClasses = async () => {
//         setLoading(true);
//         try {
//             const classes = await fetchStudentClasses();
//             console.log(classes)
//             setCurrentItems(classes);
//             setSnackbar({
//                 open: true,
//                 message: `Loaded ${classes.length} classes successfully`,
//                 severity: 'success'
//             });
//         } catch (error) {
//             setSnackbar({
//                 open: true,
//                 message: 'Failed to load classes. Please try again.',
//                 severity: 'error'
//             });
//             setCurrentItems([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const loadFolderContents = async (parentId: string) => {
//         setLoading(true);
//         try {
//             const items = await fetchNodesByParentId(parentId);
//             setCurrentItems(items);
//             if (items.length === 0) {
//                 setSnackbar({
//                     open: true,
//                     message: 'This folder is empty',
//                     severity: 'info'
//                 });
//             }
//         } catch (error) {
//             setSnackbar({
//                 open: true,
//                 message: 'Failed to load folder contents. Please try again.',
//                 severity: 'error'
//             });
//             setCurrentItems([]);
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     const handleFolderClick = async (node: Node) => {
//         if (node.type === 'folder') {
//             setCurrentPath([...currentPath, node]);
//             await loadFolderContents(node._id);
//         }
//     };
    
//     const handleBreadcrumbClick = async (index: number) => {
//         if (index === -1) {
//             // Go back to root
//             setCurrentPath([]);
//             await loadRootClasses();
//         } else {
//             // Go to specific breadcrumb level
//             const newPath = currentPath.slice(0, index + 1);
//             setCurrentPath(newPath);
//             const parentId = newPath[newPath.length - 1]._id;
//             await loadFolderContents(parentId);
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar({ ...snackbar, open: false });
//     };
    
//     const isRootLevel = currentPath.length === 0;
    
//     return (
//         <Box 
//             sx={{ 
//                 minHeight: '100vh',
//                 background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
//                 pb: 6
//             }}
//         >
//             <Container maxWidth="lg" sx={{ pt: 4, pb: 2 }}>
//                 {/* Header Section */}
//                 <Box 
//                     sx={{ 
//                         mb: 4,
//                         pb: 3,
//                         borderBottom: '2px solid',
//                         borderColor: 'divider'
//                     }}
//                 >
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                         <Box
//                             sx={{
//                                 width: 48,
//                                 height: 48,
//                                 borderRadius: '12px',
//                                 background: 'linear-gradient(135deg, #06444a 0%, #1d3e46 100%)',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 mr: 2,
//                                 boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
//                             }}
//                         >
//                             <FolderOpen sx={{ color: 'white', fontSize: 28 }} />
//                         </Box>
//                         <Typography 
//                             variant="h4" 
//                             sx={{ 
//                                 fontWeight: 700,
//                                 background: 'linear-gradient(135deg, #042f1b 0%, #083542 100%)',
//                                 backgroundClip: 'text',
//                                 WebkitBackgroundClip: 'text',
//                                 WebkitTextFillColor: 'transparent',
//                             }}
//                         >
//                             My Classes
//                         </Typography>
//                     </Box>

//                     {/* Enhanced Breadcrumbs */}
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: 2,
//                             backgroundColor: '#ffffff',
//                             borderRadius: '12px',
//                             border: '1px solid #e0e0e0',
//                             boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
//                         }}
//                     >
//                         <Breadcrumbs 
//                             separator={
//                                 <NavigateNext 
//                                     fontSize="small" 
//                                     sx={{ color: '#9e9e9e' }} 
//                                 />
//                             }
//                         >
//                             <Link
//                                 component="button"
//                                 underline="none"
//                                 onClick={() => handleBreadcrumbClick(-1)}
//                                 disabled={loading}
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     cursor: loading ? 'not-allowed' : 'pointer',
//                                     px: 1.5,
//                                     py: 0.75,
//                                     borderRadius: '8px',
//                                     fontWeight: isRootLevel ? 600 : 500,
//                                     color: isRootLevel ? '#114a50' : '#0b3c54',
//                                     backgroundColor: isRootLevel ? '#e2f6f6' : 'transparent',
//                                     transition: 'all 0.2s ease',
//                                     opacity: loading ? 0.6 : 1,
//                                     '&:hover': {
//                                         backgroundColor: loading ? undefined : (isRootLevel ? '#e3fffd' : '#def3f6'),
//                                         transform: loading ? undefined : 'translateY(-1px)',
//                                     },
//                                 }}
//                             >
//                                 <Home sx={{ mr: 0.5, fontSize: 18 }} />
//                                 Home
//                             </Link>
//                             {currentPath.map((node, index) => {
//                                 const isLast = index === currentPath.length - 1;
//                                 return (
//                                     <Link
//                                         key={node._id}
//                                         component="button"
//                                         underline="none"
//                                         onClick={() => handleBreadcrumbClick(index)}
//                                         disabled={loading}
//                                         sx={{
//                                             cursor: loading ? 'not-allowed' : 'pointer',
//                                             px: 1.5,
//                                             py: 0.75,
//                                             borderRadius: '8px',
//                                             fontWeight: isLast ? 600 : 500,
//                                             color: isLast ? '#105d65' : '#616161',
//                                             backgroundColor: isLast ? '#f0fffa' : 'transparent',
//                                             transition: 'all 0.2s ease',
//                                             maxWidth: '200px',
//                                             overflow: 'hidden',
//                                             textOverflow: 'ellipsis',
//                                             whiteSpace: 'nowrap',
//                                             opacity: loading ? 0.6 : 1,
//                                             '&:hover': {
//                                                 backgroundColor: loading ? undefined : (isLast ? '#e3ebff' : '#f5f5f5'),
//                                                 transform: loading ? undefined : 'translateY(-1px)',
//                                             },
//                                         }}
//                                     >
//                                         {node.heading}
//                                     </Link>
//                                 );
//                             })}
//                         </Breadcrumbs>
//                     </Paper>

//                     {/* Path Info Chip */}
//                     {!isRootLevel && !loading && (
//                         <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//                             <Chip
//                                 label={`${currentItems.length} ${currentItems.length === 1 ? 'item' : 'items'}`}
//                                 size="small"
//                                 sx={{
//                                     backgroundColor: '#e8eaf6',
//                                     color: '#5c6bc0',
//                                     fontWeight: 600,
//                                     fontSize: '0.75rem',
//                                 }}
//                             />
//                         </Box>
//                     )}
//                 </Box>

//                 {/* Loading State */}
//                 {loading ? (
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             py: 8,
//                         }}
//                     >
//                         <CircularProgress size={60} sx={{ mb: 2 }} />
//                         <Typography variant="body1" color="text.secondary">
//                             Loading...
//                         </Typography>
//                     </Box>
//                 ) : currentItems.length === 0 ? (
//                     /* Empty State */
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             textAlign: 'center',
//                             py: 8,
//                             borderRadius: '16px',
//                             border: '2px dashed #e0e0e0',
//                             backgroundColor: '#fafafa',
//                         }}
//                     >
//                         <FolderOpen 
//                             sx={{ 
//                                 fontSize: 64, 
//                                 color: '#bdbdbd',
//                                 mb: 2 
//                             }} 
//                         />
//                         <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
//                             No items found
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                             This folder is empty
//                         </Typography>
//                     </Paper>
//                 ) : (
//                     /* Content Display using Flexbox */
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             flexWrap: 'wrap',
//                             gap: 3,
//                             '& > *': {
//                                 flexBasis: {
//                                     xs: '100%',
//                                     sm: isRootLevel ? 'calc(50% - 12px)' : 'calc(50% - 12px)',
//                                     md: isRootLevel ? 'calc(50% - 12px)' : 'calc(33.333% - 16px)',
//                                 },
//                                 flexGrow: 0,
//                                 flexShrink: 0,
//                             },
//                         }}
//                     >
//                         {currentItems.map((node) => (
//                             <Box key={node?._id}>
//                                 {isRootLevel ? (
//                                     <ClassCard node={node} onClick={() => handleFolderClick(node)} />
//                                 ) : (
//                                     <SubfolderCard
//                                         node={node}
//                                         onClick={node.type === 'folder' ? () => handleFolderClick(node) : undefined}
//                                     />
//                                 )}
//                             </Box>
//                         ))}
//                     </Box>
//                 )}
//             </Container>

//             {/* Snackbar for notifications */}
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={4000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//             >
//                 <Alert 
//                     onClose={handleCloseSnackbar} 
//                     severity={snackbar.severity}
//                     variant="filled"
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default StudentFolderStructure;

import { useState, useEffect } from "react";
import type { Node } from "../../../admin/Material/types/node";
import { Box, Container, CircularProgress, Snackbar, Alert } from "@mui/material";
import { Breadcrumbs, Link, Typography, Paper, Chip } from "@mui/material";
import { Home, NavigateNext, FolderOpen } from "@mui/icons-material";
import { SubfolderCard } from "../subfolder/Subfolder";
import { ClassCard } from "../classcard/Classcard";
import { fetchNodesByParentId, fetchStudentClasses } from "../services/StudentAccessMateral.services";


interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
}

// Main App Component
const StudentFolderStructure: React.FC = () => {
    const [currentNode, setCurrentNode] = useState<Node | null>(null);
    const [currentItems, setCurrentItems] = useState<Node[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        severity: 'info'
    });

    // Fetch root level classes on component mount
    useEffect(() => {
        loadRootClasses();
    }, []);

    const loadRootClasses = async () => {
        setLoading(true);
        try {
            const classes = await fetchStudentClasses();
            console.log(classes)
            setCurrentItems(classes);
            setCurrentNode(null); // Reset to root
            setSnackbar({
                open: true,
                message: `Loaded ${classes.length} classes successfully`,
                severity: 'success'
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Failed to load classes. Please try again.',
                severity: 'error'
            });
            setCurrentItems([]);
        } finally {
            setLoading(false);
        }
    };

    const loadFolderContents = async (node: Node) => {
        setLoading(true);
        try {
            const items = await fetchNodesByParentId(node._id);
            setCurrentItems(items);
            setCurrentNode(node);
            if (items.length === 0) {
                setSnackbar({
                    open: true,
                    message: 'This folder is empty',
                    severity: 'info'
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Failed to load folder contents. Please try again.',
                severity: 'error'
            });
            setCurrentItems([]);
        } finally {
            setLoading(false);
        }
    };
    
    const handleFolderClick = async (node: Node) => {
        if (node.type === 'folder') {
            await loadFolderContents(node);
        }
    };
    
    const handleBreadcrumbClick = async (pathItem: { id: string; heading: string } | null) => {
        if (!pathItem) {
            // Go back to root
            await loadRootClasses();
        } else {
            // Find the node in currentItems or fetch it
            const node = currentItems.find(item => item._id === pathItem.id);
            if (node) {
                await loadFolderContents(node);
            } else {
                // Node not in current items, need to reconstruct it from path
                // Load the folder by its ID
                setLoading(true);
                try {
                    const items = await fetchNodesByParentId(pathItem.id);
                    setCurrentItems(items);
                    // Create a minimal node representation for breadcrumb purposes
                    setCurrentNode({
                        _id: pathItem.id,
                        heading: pathItem.heading,
                        type: 'folder',
                        path: currentNode?.path?.filter(p => 
                            currentNode.path!.indexOf(p) <= currentNode.path!.findIndex(p => p.id === pathItem.id)
                        ),
                    } as Node);
                } catch (error) {
                    setSnackbar({
                        open: true,
                        message: 'Failed to load folder contents. Please try again.',
                        severity: 'error'
                    });
                } finally {
                    setLoading(false);
                }
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    
    const isRootLevel = !currentNode;
    
    // Build breadcrumb path from backend path data
    const breadcrumbPath = currentNode?.path || [];
    const currentBreadcrumb = currentNode 
        ? [...breadcrumbPath, { id: currentNode._id, heading: currentNode.heading }]
        : [];
    
    return (
        <Box 
            sx={{ 
                minHeight: '100vh',
                background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
                pb: 6
            }}
        >
            <Container maxWidth="lg" sx={{ pt: 4, pb: 2 }}>
                {/* Header Section */}
                <Box 
                    sx={{ 
                        mb: 4,
                        pb: 3,
                        borderBottom: '2px solid',
                        borderColor: 'divider'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #06444a 0%, #1d3e46 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            }}
                        >
                            <FolderOpen sx={{ color: 'white', fontSize: 28 }} />
                        </Box>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #042f1b 0%, #083542 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            My Classes
                        </Typography>
                    </Box>

                    {/* Enhanced Breadcrumbs - NOW USING BACKEND PATH */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            border: '1px solid #e0e0e0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}
                    >
                        <Breadcrumbs 
                            separator={
                                <NavigateNext 
                                    fontSize="small" 
                                    sx={{ color: '#9e9e9e' }} 
                                />
                            }
                        >
                            {/* Home Breadcrumb */}
                            <Link
                                component="button"
                                underline="none"
                                onClick={() => handleBreadcrumbClick(null)}
                                disabled={loading}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    px: 1.5,
                                    py: 0.75,
                                    borderRadius: '8px',
                                    fontWeight: isRootLevel ? 600 : 500,
                                    color: isRootLevel ? '#114a50' : '#0b3c54',
                                    backgroundColor: isRootLevel ? '#e2f6f6' : 'transparent',
                                    transition: 'all 0.2s ease',
                                    opacity: loading ? 0.6 : 1,
                                    '&:hover': {
                                        backgroundColor: loading ? undefined : (isRootLevel ? '#e3fffd' : '#def3f6'),
                                        transform: loading ? undefined : 'translateY(-1px)',
                                    },
                                }}
                            >
                                <Home sx={{ mr: 0.5, fontSize: 18 }} />
                                Home
                            </Link>
                            
                            {/* Path Breadcrumbs from Backend */}
                            {currentBreadcrumb.map((pathItem, index) => {
                                const isLast = index === currentBreadcrumb.length - 1;
                                return (
                                    <Link
                                        key={pathItem.id}
                                        component="button"
                                        underline="none"
                                        onClick={() => !isLast && handleBreadcrumbClick(pathItem)}
                                        disabled={loading || isLast}
                                        sx={{
                                            cursor: loading || isLast ? 'default' : 'pointer',
                                            px: 1.5,
                                            py: 0.75,
                                            borderRadius: '8px',
                                            fontWeight: isLast ? 600 : 500,
                                            color: isLast ? '#105d65' : '#616161',
                                            backgroundColor: isLast ? '#f0fffa' : 'transparent',
                                            transition: 'all 0.2s ease',
                                            maxWidth: '200px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            opacity: loading ? 0.6 : 1,
                                            '&:hover': {
                                                backgroundColor: loading || isLast ? undefined : '#f5f5f5',
                                                transform: loading || isLast ? undefined : 'translateY(-1px)',
                                            },
                                        }}
                                    >
                                        {pathItem.heading}
                                    </Link>
                                );
                            })}
                        </Breadcrumbs>
                    </Paper>

                    {/* Path Info Chip */}
                    {!isRootLevel && !loading && (
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                                label={`${currentItems.length} ${currentItems.length === 1 ? 'item' : 'items'}`}
                                size="small"
                                sx={{
                                    backgroundColor: '#e8eaf6',
                                    color: '#5c6bc0',
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                }}
                            />
                            {/* Optional: Show current folder name */}
                            <Typography variant="body2" color="text.secondary">
                                in <strong>{currentNode?.heading}</strong>
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Loading State */}
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 8,
                        }}
                    >
                        <CircularProgress size={60} sx={{ mb: 2 }} />
                        <Typography variant="body1" color="text.secondary">
                            Loading...
                        </Typography>
                    </Box>
                ) : currentItems.length === 0 ? (
                    /* Empty State */
                    <Paper
                        elevation={0}
                        sx={{
                            textAlign: 'center',
                            py: 8,
                            borderRadius: '16px',
                            border: '2px dashed #e0e0e0',
                            backgroundColor: '#fafafa',
                        }}
                    >
                        <FolderOpen 
                            sx={{ 
                                fontSize: 64, 
                                color: '#bdbdbd',
                                mb: 2 
                            }} 
                        />
                        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                            No items found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            This folder is empty
                        </Typography>
                    </Paper>
                ) : (
                    /* Content Display using Flexbox */
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 3,
                            '& > *': {
                                flexBasis: {
                                    xs: '100%',
                                    sm: isRootLevel ? 'calc(50% - 12px)' : 'calc(50% - 12px)',
                                    md: isRootLevel ? 'calc(50% - 12px)' : 'calc(33.333% - 16px)',
                                },
                                flexGrow: 0,
                                flexShrink: 0,
                            },
                        }}
                    >
                        {currentItems.map((node) => (
                            <Box key={node?._id}>
                                {isRootLevel ? (
                                    <ClassCard node={node} onClick={() => handleFolderClick(node)} />
                                ) : (
                                    <SubfolderCard
                                        node={node}
                                        onClick={node.type === 'folder' ? () => handleFolderClick(node) : undefined}
                                    />
                                )}
                            </Box>
                        ))}
                    </Box>
                )}
            </Container>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default StudentFolderStructure;
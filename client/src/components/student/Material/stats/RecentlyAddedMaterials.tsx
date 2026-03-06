// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   Chip,
//   IconButton,
// } from '@mui/material';
// import {
//   PictureAsPdf as PdfIcon,
//   VideoLibrary as VideoIcon,
//   Description as DocIcon,
//   ArrowForward as ArrowForwardIcon,
//   Refresh as RefreshIcon,
//   Update as UpdateIcon,
// } from '@mui/icons-material';
// import { fetchRecentMaterials, type RecentMaterial } from '../services/DashboardRecentMaterial';

// interface RecentlyAddedMaterialsProps {
//   onNavigateToMaterial?: (fullPath: Array<{ id: string; heading: string }>) => void;
//   maxItems?: number;
//   showHeader?: boolean;
//   containerStyles?: any;
// }

// const RecentlyAddedMaterials: React.FC<RecentlyAddedMaterialsProps> = ({
//   onNavigateToMaterial,
//   maxItems = 10,
//   showHeader = true,
//   containerStyles = {},
// }) => {
//   const [materials, setMaterials] = useState<RecentMaterial[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success' as 'success' | 'error' | 'info',
//   });

//   const loadMaterials = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await fetchRecentMaterials(maxItems);
//       setMaterials(data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to load recent materials. Please try again.');
//       console.error('Error loading materials:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadMaterials();
//   }, [maxItems]);

//   const handleRefresh = () => {
//     loadMaterials();
//     setSnackbar({
//       open: true,
//       message: 'Refreshing materials...',
//       severity: 'info',
//     });
//   };

//   const handleNavigate = (material: RecentMaterial) => {
//     if (onNavigateToMaterial) {
//       onNavigateToMaterial(material.fullPath);
//     } else {
//       // Default behavior: open first file link
//       if (material.fileDetails && material.fileDetails.length > 0) {
//         window.open(material.fileDetails[0].uploadLink, '_blank');
//       }
//     }
//   };

//   const getFileIcon = (fileName: string) => {
//     const extension = fileName.split('.').pop()?.toLowerCase();
//     if (extension === 'pdf') {
//       return <PdfIcon sx={{ fontSize: 40, color: '#d32f2f' }} />;
//     } else if (['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv'].includes(extension || '')) {
//       return <VideoIcon sx={{ fontSize: 40, color: '#1976d2' }} />;
//     } else {
//       return <DocIcon sx={{ fontSize: 40, color: '#757575' }} />;
//     }
//   };

//   const getTimeLabelColor = (timeLabel: string) => {
//     if (timeLabel.includes('Today')) {
//       return '#2e7d32';
//     } else if (timeLabel.includes('Yesterday')) {
//       return '#ed6c02';
//     } else {
//       return '#757575';
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           minHeight: '300px',
//           ...containerStyles
//         }}
//       >
//         <CircularProgress size={48} />
//         <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
//           Loading recent materials...
//         </Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={containerStyles}>
//         <Alert 
//           severity="error" 
//           sx={{ borderRadius: '12px' }}
//           action={
//             <IconButton
//               aria-label="retry"
//               color="inherit"
//               size="small"
//               onClick={loadMaterials}
//             >
//               <RefreshIcon fontSize="small" />
//             </IconButton>
//           }
//         >
//           {error}
//         </Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={containerStyles}>
//       {/* Header */}
//       {showHeader && (
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mb: 3,
//           }}
//         >
//           <Box>
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 700,
//                 color: '#1a1a1a',
//                 mb: 0.5,
//               }}
//             >
//               Recently Added Materials
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Documents and videos uploaded by your teachers recently.
//             </Typography>
//           </Box>

//           <IconButton
//             onClick={handleRefresh}
//             sx={{
//               backgroundColor: '#f5f5f5',
//               '&:hover': {
//                 backgroundColor: '#e0e0e0',
//               },
//             }}
//           >
//             <RefreshIcon />
//           </IconButton>
//         </Box>
//       )}

//       {/* Materials List */}
//       {materials.length === 0 ? (
//         <Paper
//           elevation={0}
//           sx={{
//             textAlign: 'center',
//             py: 8,
//             borderRadius: '16px',
//             border: '2px dashed #e0e0e0',
//             backgroundColor: '#fafafa',
//           }}
//         >
//           <UpdateIcon sx={{ fontSize: 64, color: '#bdbdbd', mb: 2 }} />
//           <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
//             No recent materials
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             New materials will appear here when your teachers upload them
//           </Typography>
//         </Paper>
//       ) : (
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//           {materials.map((material) => (
//             <Paper
//               key={material._id}
//               elevation={0}
//               sx={{
//                 p: 2.5,
//                 borderRadius: '12px',
//                 border: '1px solid #e0e0e0',
//                 transition: 'all 0.2s ease',
//                 cursor: 'pointer',
//                 '&:hover': {
//                   borderColor: '#1976d2',
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//                   transform: 'translateY(-2px)',
//                 },
//               }}
//               onClick={() => handleNavigate(material)}
//             >
//               <Box sx={{ display: 'flex', gap: 2.5 }}>
//                 {/* File Icon */}
//                 <Box
//                   sx={{
//                     width: 64,
//                     height: 64,
//                     borderRadius: '12px',
//                     backgroundColor: '#f5f5f5',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     flexShrink: 0,
//                   }}
//                 >
//                   {material.fileDetails && material.fileDetails.length > 0
//                     ? getFileIcon(material.fileDetails[0].fileName)
//                     : <DocIcon sx={{ fontSize: 40, color: '#757575' }} />}
//                 </Box>

//                 {/* Content */}
//                 <Box sx={{ flex: 1, minWidth: 0 }}>
//                   {/* Title */}
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontWeight: 600,
//                       color: '#1a1a1a',
//                       mb: 0.5,
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     {material.heading}
//                   </Typography>

//                   {/* Subject and Time Label */}
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: '#1976d2',
//                         fontWeight: 500,
//                       }}
//                     >
//                       {material.subject}
//                     </Typography>
//                     <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
//                       •
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: getTimeLabelColor(material.timeLabel),
//                         fontWeight: 500,
//                       }}
//                     >
//                       {material.timeLabel}
//                     </Typography>
//                   </Box>

//                   {/* Breadcrumb Path */}
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: '#757575',
//                       fontSize: '0.875rem',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                       mb: 1,
//                     }}
//                   >
//                     {material.breadcrumb}
//                   </Typography>

//                   {/* Tags and File Count */}
//                   <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
//                     {/* File Count Badge */}
//                     <Chip
//                       label={`${material.fileCount} ${material.fileCount === 1 ? 'file' : 'files'}`}
//                       size="small"
//                       sx={{
//                         height: '20px',
//                         fontSize: '0.7rem',
//                         backgroundColor: '#e8f5e9',
//                         color: '#2e7d32',
//                         fontWeight: 600,
//                       }}
//                     />
                    
//                     {/* Tags */}
//                     {material.tags && material.tags.length > 0 && (
//                       <>
//                         {material.tags.slice(0, 2).map((tag, index) => (
//                           <Chip
//                             key={index}
//                             label={tag}
//                             size="small"
//                             sx={{
//                               height: '20px',
//                               fontSize: '0.7rem',
//                               backgroundColor: '#e3f2fd',
//                               color: '#1976d2',
//                               fontWeight: 500,
//                             }}
//                           />
//                         ))}
//                         {material.tags.length > 2 && (
//                           <Chip
//                             label={`+${material.tags.length - 2}`}
//                             size="small"
//                             sx={{
//                               height: '20px',
//                               fontSize: '0.7rem',
//                               backgroundColor: '#f5f5f5',
//                               color: '#757575',
//                             }}
//                           />
//                         )}
//                       </>
//                     )}
//                   </Box>
//                 </Box>

//                 {/* Arrow Icon */}
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     flexShrink: 0,
//                   }}
//                 >
//                   <ArrowForwardIcon sx={{ color: '#bdbdbd' }} />
//                 </Box>
//               </Box>
//             </Paper>
//           ))}
//         </Box>
//       )}

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           variant="filled"
//           sx={{ width: '100%', borderRadius: '8px' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default RecentlyAddedMaterials;


import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, CircularProgress, Alert,
  IconButton, Chip, Snackbar,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { fetchRecentMaterials, type RecentMaterial } from '../services/DashboardRecentMaterial';

interface Props {
  onNavigateToMaterial?: (fullPath: Array<{ id: string; heading: string }>) => void;
  maxItems?: number;
  showHeader?: boolean;
  containerStyles?: object;
}

const timeColor = (t: string) =>
  t.includes('Today') ? 'success.main' : t.includes('Yesterday') ? 'warning.main' : 'text.disabled';

const FileTypeBadge: React.FC<{ fileName: string }> = ({ fileName }) => {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  const isVideo = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv'].includes(ext);
  return (
    <Chip
      label={isVideo ? 'VID' : ext.toUpperCase() || 'DOC'}
      size="small"
      sx={{
        height: 20, fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.05em',
        bgcolor: 'grey.100', color: 'grey.700', border: '1px solid', borderColor: 'grey.200',
        borderRadius: 1,
        '& .MuiChip-label': { px: 0.75 },
      }}
    />
  );
};

const RecentlyAddedMaterials: React.FC<Props> = ({
  onNavigateToMaterial, maxItems = 10, showHeader = true, containerStyles = {},
}) => {
  const [materials, setMaterials] = useState<RecentMaterial[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [snack, setSnack]         = useState(false);

  const load = async () => {
    setLoading(true); setError(null);
    try   { setMaterials(await fetchRecentMaterials(maxItems)); }
    catch (e: any) { setError(e.message || 'Failed to load materials'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [maxItems]);

  const handleNavigate = (m: RecentMaterial) => {
    if (onNavigateToMaterial) return onNavigateToMaterial(m.fullPath);
    if (m.fileDetails?.[0]) window.open(m.fileDetails[0].uploadLink, '_blank');
  };

  if (loading) return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 3, ...containerStyles }}>
      <CircularProgress size={18} thickness={4} color="inherit" sx={{ color: 'text.secondary' }} />
      <Typography variant="body2" color="text.secondary">Loading materials…</Typography>
    </Box>
  );

  if (error) return (
    <Box sx={containerStyles}>
      <Alert severity="error" sx={{ borderRadius: 2 }}
        action={<IconButton size="small" onClick={load}><RefreshIcon fontSize="small" /></IconButton>}
      >{error}</Alert>
    </Box>
  );

  return (
    <Box sx={containerStyles}>

      {/* Optional header */}
      {showHeader && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>Recently Added Materials</Typography>
            <Typography variant="caption" color="text.secondary">
              Documents and videos uploaded by your teachers
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => { load(); setSnack(true); }}
            sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: 2, p: 0.75 }}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Empty state */}
      {materials.length === 0 ? (
        <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center', py: 4 }}>
          No materials yet. New uploads will appear here.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.75 }}>
          {materials.map(m => (
            <Box key={m._id} sx={{ flex: '1 1 calc(50% - 7px)', minWidth: 0 }}>
              <Paper
                elevation={0}
                onClick={() => handleNavigate(m)}
                sx={{
                  p: 2.5,
                  border: '1px solid', borderColor: 'grey.200',
                  borderRadius: 3, cursor: 'pointer', height: '100%',
                  display: 'flex', flexDirection: 'column', gap: 1.25,
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 2px 12px rgba(79,70,229,0.09)',
                  },
                }}
              >
                {/* Top: file badges + time label */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                    {m.fileDetails?.slice(0, 2).map((f, i) => (
                      <FileTypeBadge key={i} fileName={f.fileName} />
                    ))}
                    {(m.fileDetails?.length || 0) > 2 && (
                      <Chip
                        label={`+${(m.fileDetails?.length || 0) - 2}`}
                        size="small"
                        sx={{ height: 20, fontSize: '0.65rem', bgcolor: 'grey.100', color: 'grey.500', '& .MuiChip-label': { px: 0.75 } }}
                      />
                    )}
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: timeColor(m.timeLabel), whiteSpace: 'nowrap', ml: 1 }}>
                    {m.timeLabel}
                  </Typography>
                </Box>

                {/* Heading */}
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{
                    color: 'text.primary', lineHeight: 1.45,
                    overflow: 'hidden', display: '-webkit-box',
                    WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  }}
                >
                  {m.heading}
                </Typography>

                {/* Subject + file count */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={m.subject}
                    size="small"
                    sx={{
                      height: 22, fontSize: '0.72rem', fontWeight: 600,
                      bgcolor: 'primary.50', color: 'primary.main',
                      '& .MuiChip-label': { px: 1.25 },
                    }}
                  />
                  <Typography variant="caption" color="text.disabled">
                    {m.fileCount} {m.fileCount === 1 ? 'file' : 'files'}
                  </Typography>
                </Box>

                {/* Breadcrumb */}
                <Typography
                  variant="caption" color="text.disabled"
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {m.breadcrumb}
                </Typography>

                {/* Tags */}
                {m.tags?.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                    {m.tags.slice(0, 3).map((tag, i) => (
                      <Chip
                        key={i} label={tag} size="small"
                        sx={{
                          height: 20, fontSize: '0.65rem', bgcolor: 'grey.100',
                          color: 'text.secondary', border: '1px solid', borderColor: 'grey.200',
                          '& .MuiChip-label': { px: 0.75 },
                        }}
                      />
                    ))}
                    {m.tags.length > 3 && (
                      <Typography variant="caption" color="text.disabled">+{m.tags.length - 3}</Typography>
                    )}
                  </Box>
                )}

                {/* Arrow */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                  <ArrowForwardIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
      )}

      <Snackbar
        open={snack} autoHideDuration={2500} onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message="Refreshing materials…"
      />
    </Box>
  );
};

export default RecentlyAddedMaterials;
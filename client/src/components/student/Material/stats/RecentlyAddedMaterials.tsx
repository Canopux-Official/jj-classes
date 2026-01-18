import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  Chip,
  IconButton,
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  VideoLibrary as VideoIcon,
  Description as DocIcon,
  ArrowForward as ArrowForwardIcon,
  Refresh as RefreshIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import { fetchRecentMaterials, type RecentMaterial } from '../services/DashboardRecentMaterial';

interface RecentlyAddedMaterialsProps {
  onNavigateToMaterial?: (fullPath: Array<{ id: string; heading: string }>) => void;
  maxItems?: number;
  showHeader?: boolean;
  containerStyles?: any;
}

const RecentlyAddedMaterials: React.FC<RecentlyAddedMaterialsProps> = ({
  onNavigateToMaterial,
  maxItems = 10,
  showHeader = true,
  containerStyles = {},
}) => {
  const [materials, setMaterials] = useState<RecentMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info',
  });

  const loadMaterials = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecentMaterials(maxItems);
      setMaterials(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load recent materials. Please try again.');
      console.error('Error loading materials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, [maxItems]);

  const handleRefresh = () => {
    loadMaterials();
    setSnackbar({
      open: true,
      message: 'Refreshing materials...',
      severity: 'info',
    });
  };

  const handleNavigate = (material: RecentMaterial) => {
    if (onNavigateToMaterial) {
      onNavigateToMaterial(material.fullPath);
    } else {
      // Default behavior: open first file link
      if (material.fileDetails && material.fileDetails.length > 0) {
        window.open(material.fileDetails[0].uploadLink, '_blank');
      }
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return <PdfIcon sx={{ fontSize: 40, color: '#d32f2f' }} />;
    } else if (['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv'].includes(extension || '')) {
      return <VideoIcon sx={{ fontSize: 40, color: '#1976d2' }} />;
    } else {
      return <DocIcon sx={{ fontSize: 40, color: '#757575' }} />;
    }
  };

  const getTimeLabelColor = (timeLabel: string) => {
    if (timeLabel.includes('Today')) {
      return '#2e7d32';
    } else if (timeLabel.includes('Yesterday')) {
      return '#ed6c02';
    } else {
      return '#757575';
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          ...containerStyles
        }}
      >
        <CircularProgress size={48} />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Loading recent materials...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={containerStyles}>
        <Alert 
          severity="error" 
          sx={{ borderRadius: '12px' }}
          action={
            <IconButton
              aria-label="retry"
              color="inherit"
              size="small"
              onClick={loadMaterials}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={containerStyles}>
      {/* Header */}
      {showHeader && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#1a1a1a',
                mb: 0.5,
              }}
            >
              Recently Added Materials
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Documents and videos uploaded by your teachers recently.
            </Typography>
          </Box>

          <IconButton
            onClick={handleRefresh}
            sx={{
              backgroundColor: '#f5f5f5',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Box>
      )}

      {/* Materials List */}
      {materials.length === 0 ? (
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
          <UpdateIcon sx={{ fontSize: 64, color: '#bdbdbd', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
            No recent materials
          </Typography>
          <Typography variant="body2" color="text.secondary">
            New materials will appear here when your teachers upload them
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {materials.map((material) => (
            <Paper
              key={material._id}
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: '12px',
                border: '1px solid #e0e0e0',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#1976d2',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transform: 'translateY(-2px)',
                },
              }}
              onClick={() => handleNavigate(material)}
            >
              <Box sx={{ display: 'flex', gap: 2.5 }}>
                {/* File Icon */}
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '12px',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {material.fileDetails && material.fileDetails.length > 0
                    ? getFileIcon(material.fileDetails[0].fileName)
                    : <DocIcon sx={{ fontSize: 40, color: '#757575' }} />}
                </Box>

                {/* Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#1a1a1a',
                      mb: 0.5,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {material.heading}
                  </Typography>

                  {/* Subject and Time Label */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#1976d2',
                        fontWeight: 500,
                      }}
                    >
                      {material.subject}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                      •
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: getTimeLabelColor(material.timeLabel),
                        fontWeight: 500,
                      }}
                    >
                      {material.timeLabel}
                    </Typography>
                  </Box>

                  {/* Breadcrumb Path */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#757575',
                      fontSize: '0.875rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      mb: 1,
                    }}
                  >
                    {material.breadcrumb}
                  </Typography>

                  {/* Tags and File Count */}
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* File Count Badge */}
                    <Chip
                      label={`${material.fileCount} ${material.fileCount === 1 ? 'file' : 'files'}`}
                      size="small"
                      sx={{
                        height: '20px',
                        fontSize: '0.7rem',
                        backgroundColor: '#e8f5e9',
                        color: '#2e7d32',
                        fontWeight: 600,
                      }}
                    />
                    
                    {/* Tags */}
                    {material.tags && material.tags.length > 0 && (
                      <>
                        {material.tags.slice(0, 2).map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            sx={{
                              height: '20px',
                              fontSize: '0.7rem',
                              backgroundColor: '#e3f2fd',
                              color: '#1976d2',
                              fontWeight: 500,
                            }}
                          />
                        ))}
                        {material.tags.length > 2 && (
                          <Chip
                            label={`+${material.tags.length - 2}`}
                            size="small"
                            sx={{
                              height: '20px',
                              fontSize: '0.7rem',
                              backgroundColor: '#f5f5f5',
                              color: '#757575',
                            }}
                          />
                        )}
                      </>
                    )}
                  </Box>
                </Box>

                {/* Arrow Icon */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ArrowForwardIcon sx={{ color: '#bdbdbd' }} />
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%', borderRadius: '8px' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RecentlyAddedMaterials;
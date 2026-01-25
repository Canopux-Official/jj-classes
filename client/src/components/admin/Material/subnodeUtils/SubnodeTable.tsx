import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import type { Node } from '../types/node';

interface SubnodeTableProps {
  nodes: Node[];
  onNodeClick: (nodeId: string) => void;
  onEdit: (node: Node) => void;
  onDelete: (nodeId: string) => void;
}

const SubnodeTable: React.FC<SubnodeTableProps> = ({
  nodes,
  onNodeClick,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isMobile) {
    // Mobile Card View
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {nodes.map((node) => (
          <Paper
            key={node._id}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: '12px',
              border: '1px solid #e8eaed',
              cursor: node.type === 'folder' ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: '#1a472a',
                boxShadow: '0 2px 8px rgba(26, 71, 42, 0.1)',
              },
            }}
          >
            <Box
              onClick={() => node.type === 'folder' && onNodeClick(node._id)}
              sx={{ mb: 1.5 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                {node.type === 'folder' ? (
                  <FolderIcon sx={{ color: '#1a472a', fontSize: '1.5rem' }} />
                ) : (
                  <FileIcon sx={{ color: '#5f6368', fontSize: '1.5rem' }} />
                )}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: '#1a1a1a',
                    flex: 1,
                  }}
                >
                  {node.heading}
                </Typography>
              </Box>

              {node.description && (
                <Typography
                  variant="body2"
                  sx={{
                    color: '#5f6368',
                    fontSize: '0.875rem',
                    mb: 1,
                  }}
                >
                  {node.description}
                </Typography>
              )}

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                <Chip
                  label={node.type === 'folder' ? 'Folder' : 'File'}
                  size="small"
                  sx={{
                    backgroundColor: node.type === 'folder' ? '#e8f5e9' : '#e3f2fd',
                    color: node.type === 'folder' ? '#1a472a' : '#1976d2',
                    fontSize: '0.75rem',
                  }}
                />
                {node.lastDate && (
                  <Chip
                    label={formatDate(node.lastDate)}
                    size="small"
                    sx={{
                      backgroundColor: '#ffebee',
                      color: '#d32f2f',
                      fontSize: '0.75rem',
                    }}
                  />
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(node);
                }}
                sx={{
                  color: '#1976d2',
                  '&:hover': { backgroundColor: '#e3f2fd' },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(node._id);
                }}
                sx={{
                  color: '#d32f2f',
                  '&:hover': { backgroundColor: '#ffebee' },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  // Desktop Table View
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: '12px',
        border: '1px solid #e8eaed',
        overflow: 'hidden',
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#fafafa' }}>
            <TableCell sx={{ fontWeight: 600, color: '#616161' }}>
              Name
            </TableCell>
            {!isTablet && (
              <TableCell sx={{ fontWeight: 600, color: '#616161', display: { xs: 'none', md: 'table-cell' } }}>
                Description
              </TableCell>
            )}
            <TableCell sx={{ fontWeight: 600, color: '#616161', display: { xs: 'none', md: 'table-cell' } }}>
              Type
            </TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#616161', display: { xs: 'none', md: 'table-cell' } }}>
              Due Date
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: 600, color: '#616161' }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nodes.map((node) => (
            <TableRow
              key={node._id}
              onClick={() => node.type === 'folder' && onNodeClick(node._id)}
              sx={{
                cursor: node.type === 'folder' ? 'pointer' : 'default',
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                },
                transition: 'background-color 0.2s ease',
              }}
            >
              {/* Name Column */}
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: '#1a1a1a',
                      fontSize: '0.95rem',
                    }}
                  >
                    {node.heading}
                  </Typography>
                </Box>
              </TableCell>

              {/* Description Column */}
              {!isTablet && (
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#5f6368',
                      fontSize: '0.875rem',
                      maxWidth: 250,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {node.description || '-'}
                  </Typography>
                </TableCell>
              )}

              {/* Type Column */}
              <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                <Typography variant="body2" sx={{ color: '#5f6368', fontSize: '0.875rem' }}>
                  {node.type === 'folder' ? 'Folder' : 'File'}
                </Typography>
              </TableCell>

              {/* Due Date Column */}
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: node.lastDate ? '#d32f2f' : '#5f6368',
                    fontSize: '0.875rem',
                    fontWeight: node.lastDate ? 600 : 400,
                  }}
                >
                  {formatDate(node.lastDate)}
                </Typography>
              </TableCell>

              {/* Actions Column */}
              <TableCell align="right">
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(node); // Handle Edit action
                      }}
                      sx={{
                        color: '#1976d2',
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(node._id); // Handle Delete action
                      }}
                      sx={{
                        color: '#d32f2f',
                        '&:hover': {
                          backgroundColor: '#ffebee',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubnodeTable;
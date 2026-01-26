
import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Link,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  AttachFile as AttachFileIcon,
  Link as LinkIcon,
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'files' | 'references'>('files');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleOpenDialog = (node: Node, type: 'files' | 'references') => {
    setSelectedNode(node);
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedNode(null);
  };

  console.log(selectedNode)

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
      <>
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
                    {node.heading ? node.heading : (typeof node.subject === 'object' && node.subject?.name) || ''}
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
                    {node.description ? node.description.slice(0,20)+"......." : '-'}
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
                  {node.fileDetails && node.fileDetails.length > 0 && (
                    <Chip
                      icon={<AttachFileIcon sx={{ fontSize: '0.875rem' }} />}
                      label={`${node.fileDetails.length} files`}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDialog(node, 'files');
                      }}
                      sx={{
                        backgroundColor: '#fff3e0',
                        color: '#e65100',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#ffe0b2',
                        },
                      }}
                    />
                  )}
                  {node.referenceDetails && node.referenceDetails.length > 0 && (
                    <Chip
                      icon={<LinkIcon sx={{ fontSize: '0.875rem' }} />}
                      label={`${node.referenceDetails.length} refs`}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDialog(node, 'references');
                      }}
                      sx={{
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#bbdefb',
                        },
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

        {/* Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {dialogType === 'files' ? (
                <AttachFileIcon sx={{ color: '#e65100' }} />
              ) : (
                <LinkIcon sx={{ color: '#1976d2' }} />
              )}
              <Typography variant="h6">
                {dialogType === 'files' ? 'File Details' : 'Reference Details'}
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            {selectedNode && (
              <>
                {dialogType === 'files' ? (
                  // File Details
                  selectedNode.fileDetails && selectedNode.fileDetails.length > 0 ? (
                    selectedNode.fileDetails.map((file: any, index: number) => (
                      <Box
                        key={file._id || index}
                        sx={{
                          p: 1.5,
                          mb: 1,
                          borderRadius: '8px',
                          border: '1px solid #e8eaed',
                          '&:hover': {
                            backgroundColor: '#f8f9fa',
                          }
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {file.fileName || 'Unnamed File'}
                        </Typography>
                        {file.uploadLink && (
                          <Link
                            href={file.uploadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              fontSize: '0.875rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              }
                            }}
                          >
                            <LinkIcon sx={{ fontSize: '1rem' }} />
                            Open File
                          </Link>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" sx={{ color: '#5f6368' }}>
                        No file details available
                      </Typography>
                    </Box>
                  )
                ) : (
                  // Reference Details
                  selectedNode.referenceDetails && selectedNode.referenceDetails.length > 0 ? (
                    selectedNode.referenceDetails.map((reference: any, index: number) => (
                      <Box
                        key={reference._id || index}
                        sx={{
                          p: 1.5,
                          mb: 1,
                          borderRadius: '8px',
                          border: '1px solid #e8eaed',
                          '&:hover': {
                            backgroundColor: '#f8f9fa',
                          }
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {reference.fileName}
                        </Typography>
                        {reference.referenceLink && (
                          <Link
                            href={reference.referenceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              fontSize: '0.875rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              }
                            }}
                          >
                            <LinkIcon sx={{ fontSize: '1rem' }} />
                            Open Link
                          </Link>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" sx={{ color: '#5f6368' }}>
                        No reference details available
                      </Typography>
                    </Box>
                  )
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  // Desktop Table View
  return (
    <>
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
              <TableCell sx={{ fontWeight: 600, color: '#616161', display: { xs: 'none', md: 'table-cell' } }}>
                Type
              </TableCell>
              {!isTablet && (
                <TableCell sx={{ fontWeight: 600, color: '#616161', display: { xs: 'none', md: 'table-cell' } }}>
                  Description
                </TableCell>
              )}
              <TableCell sx={{ fontWeight: 600, color: '#616161', display: { xs: 'none', lg: 'table-cell' } }}>
                File Details
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#616161', display: { xs: 'none', lg: 'table-cell' } }}>
                Reference Details
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
                  backgroundColor: node.type === 'folder' ? "#eff1f192" : "white",
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  },
                  transition: 'background-color 0.2s ease',
                }}
              >
                {/* Name Column */}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {/* Icon based on type */}
                    {node.type === 'folder' ? (
                      <FolderIcon sx={{ color: '#FFA726', fontSize: '1.5rem' }} />
                    ) : (
                      <FileIcon sx={{ color: '#42A5F5', fontSize: '1.5rem' }} />
                    )}

                    {/* Display heading */}
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: '#1a1a1a',
                        fontSize: '0.95rem',
                      }}
                    >
                      {node.heading ? node.heading : (typeof node.subject === 'object' && node.subject?.name) || ''}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Type Column */}
                <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                  <Typography variant="body2" sx={{ color: '#5f6368', fontSize: '0.875rem' }}>
                    {node.type === 'folder' ? 'Folder' : 'File'}
                  </Typography>
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
                      {node.description ? node.description.slice(0,20)+"......." : '-'}
                    </Typography>
                  </TableCell>
                )}

                {/* File Details Column */}
                <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                  {node.fileDetails && node.fileDetails.length > 0 ? (
                    <Button
                      size="small"
                      startIcon={<AttachFileIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDialog(node, 'files');
                      }}
                      sx={{
                        textTransform: 'none',
                        color: '#e65100',
                        '&:hover': {
                          backgroundColor: '#fff3e0',
                        },
                      }}
                    >
                      {node.fileDetails.length} {node.fileDetails.length === 1 ? 'file' : 'files'}
                    </Button>
                  ) : (
                    <Typography variant="body2" sx={{ color: '#5f6368', fontSize: '0.875rem' }}>
                      N/A
                    </Typography>
                  )}
                </TableCell>

                {/* Reference Details Column */}
                <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                  {node.referenceDetails && node.referenceDetails.length > 0 ? (
                    <Button
                      size="small"
                      startIcon={<LinkIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDialog(node, 'references');
                      }}
                      sx={{
                        textTransform: 'none',
                        color: '#1976d2',
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                        },
                      }}
                    >
                      {node.referenceDetails.length} {node.referenceDetails.length === 1 ? 'reference' : 'references'}
                    </Button>
                  ) : (
                    <Typography variant="body2" sx={{ color: '#5f6368', fontSize: '0.875rem' }}>
                      N/A
                    </Typography>
                  )}
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
                          onEdit(node);
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
                          onDelete(node._id);
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

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {dialogType === 'files' ? (
              <AttachFileIcon sx={{ color: '#e65100' }} />
            ) : (
              <LinkIcon sx={{ color: '#1976d2' }} />
            )}
            <Typography variant="h6">
              {dialogType === 'files' ? 'File Details' : 'Reference Details'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedNode && (
            <>
              {dialogType === 'files' ? (
                // File Details
                selectedNode.fileDetails && selectedNode.fileDetails.length > 0 ? (
                  selectedNode.fileDetails.map((file: any, index: number) => (
                    <Box
                      key={file._id || index}
                      sx={{
                        p: 1.5,
                        mb: 1,
                        borderRadius: '8px',
                        border: '1px solid #e8eaed',
                        '&:hover': {
                          backgroundColor: '#f8f9fa',
                        }
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {file.fileName || 'Unnamed File'}
                      </Typography>
                      {file.uploadLink && (
                        <Link
                          href={file.uploadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline',
                            }
                          }}
                        >
                          <LinkIcon sx={{ fontSize: '1rem' }} />
                          Open File
                        </Link>
                      )}
                    </Box>
                  ))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="body2" sx={{ color: '#5f6368' }}>
                      No file details available
                    </Typography>
                  </Box>
                )
              ) : (
                // Reference Details
                selectedNode.referenceDetails && selectedNode.referenceDetails.length > 0 ? (
                  selectedNode.referenceDetails.map((reference: any, index: number) => (
                    <Box
                      key={reference._id || index}
                      sx={{
                        p: 1.5,
                        mb: 1,
                        borderRadius: '8px',
                        border: '1px solid #e8eaed',
                        '&:hover': {
                          backgroundColor: '#f8f9fa',
                        }
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {reference.fileName}
                      </Typography>
                      {reference.referenceLink && (
                        <Link
                          href={reference.referenceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline',
                            }
                          }}
                        >
                          <LinkIcon sx={{ fontSize: '1rem' }} />
                          Open Link
                        </Link>
                      )}
                    </Box>
                  ))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="body2" sx={{ color: '#5f6368' }}>
                      No reference details available
                    </Typography>
                  </Box>
                )
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SubnodeTable;
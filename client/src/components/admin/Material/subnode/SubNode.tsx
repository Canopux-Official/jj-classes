// components/SubnodeCard/SubnodeCard.tsx
import React from 'react';
import {
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Link,
  Paper,
} from '@mui/material';
import {
  Folder as FolderIcon,
  Description as FileIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AttachFile as AttachFileIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import type { Node } from '../types/node';

export interface SubnodeCardProps {
  node: Node;
  onClick?: (id: string) => void;
  onEdit?: (node: Node) => void;
  onDelete?: (id: string) => void;
}

const SubnodeCard: React.FC<SubnodeCardProps> = ({
  node,
  onClick,
  onEdit,
  onDelete,
}) => {
  const {
    _id,
    heading,
    type,
    description,
    tags = [],
    lastDate,
    createdAt,
    fileDetails = [],
    referenceDetails = [],
  } = node;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const handleCardClick = () => {
    if (type === 'folder') {
      onClick?.(_id);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event?: React.MouseEvent<HTMLElement>) => {
    event?.stopPropagation();
    setAnchorEl(null);
  };

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
    onEdit?.(node);
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
    onDelete?.(_id);
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  const isFolder = type === 'folder';

  return (
    <Paper
      onClick={handleCardClick}
      elevation={0}
      sx={{
        position: 'relative',
        cursor: isFolder ? 'pointer' : 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        border: '1px solid #e8eaed',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        background: '#ffffff',
        '&:hover': {
          transform: isFolder ? 'translateY(-2px)' : 'none',
          boxShadow: isFolder
            ? '0 4px 12px rgba(0, 0, 0, 0.12)'
            : '0 1px 3px rgba(0, 0, 0, 0.08)',
          borderColor: isFolder ? '#d0d4d9' : '#e8eaed',
        },
      }}
    >

      <CardContent
        sx={{
          flexGrow: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          '&:last-child': { pb: 3 },
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          {/* Icon */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              mr: 2,
            }}
          >
            {isFolder ? (
              <FolderIcon sx={{ color: '#075c4f', fontSize: 28 }} />
            ) : (
              <FileIcon sx={{ color: '#075c4f', fontSize: 28 }} />
            )}
          </Box>

          {/* Title and Type */}
          <Box sx={{ flex: 1, minWidth: 0, mr: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: '#1a1a1a',
                fontSize: '1.125rem',
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}
            >
              {heading}
            </Typography>

            {/* Due Date Badge */}
            {lastDate && (
              <Typography
                variant="body2"
                sx={{
                  color: '#d32f2f',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                }}
              >
                Due: {formatDate(lastDate)}
              </Typography>
            )}
          </Box>

          {/* Menu Button */}
          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{
              flexShrink: 0,
              color: '#5f6368',
              padding: '6px',
              '&:hover': {
                backgroundColor: '#f1f3f4',
                color: '#1a1a1a',
              },
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={(e: any) => {
              e?.stopPropagation();
              handleMenuClose();
            }}
            PaperProps={{
              sx: {
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                mt: 0.5,
                minWidth: 140,
              },
            }}
          >
            <MenuItem
              onClick={handleEdit}
              sx={{
                fontSize: '0.875rem',
                py: 1,
                '&:hover': {
                  backgroundColor: '#f1f3f4',
                },
              }}
            >
              <EditIcon fontSize="small" sx={{ mr: 1.5, color: '#5f6368' }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={handleDelete}
              sx={{
                color: '#d32f2f',
                fontSize: '0.875rem',
                py: 1,
                '&:hover': {
                  backgroundColor: '#fef1f1',
                },
              }}
            >
              <DeleteIcon fontSize="small" sx={{ mr: 1.5 }} />
              Delete
            </MenuItem>
          </Menu>
        </Box>

        {/* Description */}
        {description && (
          <Typography
            variant="body2"
            sx={{
              color: '#5f6368',
              fontSize: '0.875rem',
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
        )}

        {/* Files Section */}
        {fileDetails.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#1a1a1a',
                fontSize: '0.875rem',
                mb: 1,
              }}
            >
              Files:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {fileDetails.map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    minWidth: 0,
                  }}
                >
                  <AttachFileIcon
                    sx={{ fontSize: 16, color: '#5f6368', flexShrink: 0 }}
                  />
                  <Link
                    href={file.uploadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    sx={{
                      fontSize: '0.8125rem',
                      color: '#1976D2',
                      textDecoration: 'none',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                      minWidth: 0,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {file.fileName}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* References Section */}
        {referenceDetails.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#1a1a1a',
                fontSize: '0.875rem',
                mb: 1,
              }}
            >
              References:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {referenceDetails.slice(0, 2).map((ref, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    minWidth: 0,
                  }}
                >
                  <LinkIcon
                    sx={{ fontSize: 16, color: '#5f6368', flexShrink: 0 }}
                  />
                  <Link
                    href={ref.referenceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    sx={{
                      fontSize: '0.8125rem',
                      color: '#1976D2',
                      textDecoration: 'none',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                      minWidth: 0,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {ref.fileName}
                  </Link>
                </Box>
              ))}
              {referenceDetails.length > 2 && (
                <Typography
                  variant="caption"
                  sx={{
                    color: '#80868b',
                    fontSize: '0.75rem',
                    ml: 3,
                  }}
                >
                  +{referenceDetails.length - 2} more references
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Divider */}
        {(tags.length > 0 || createdAt) && (
          <Box
            sx={{
              height: '1px',
              backgroundColor: '#e8eaed',
              mb: 2,
            }}
          />
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: createdAt ? 1.5 : 0,
            }}
          >
            {tags.slice(0, 2).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#616161',
                  fontSize: '0.75rem',
                  height: 24,
                  fontWeight: 500,
                  border: '1px solid #e0e0e0',
                }}
              />
            ))}
            {tags.length > 2 && (
              <Chip
                label={`+${tags.length - 2}`}
                size="small"
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#616161',
                  fontSize: '0.75rem',
                  height: 24,
                  fontWeight: 500,
                  border: '1px solid #e0e0e0',
                }}
              />
            )}
          </Box>
        )}

        {/* Created Date */}
        {createdAt && (
          <Typography
            variant="caption"
            sx={{
              color: '#80868b',
              fontSize: '0.75rem',
            }}
          >
            Created {formatDate(createdAt)}
          </Typography>
        )}
      </CardContent>
    </Paper>
  );
};

export default SubnodeCard;
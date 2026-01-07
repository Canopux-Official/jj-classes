
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
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Folder as FolderIcon,
  Description as FileIcon,
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarIcon,
  Tag as TagIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AttachFile as AttachFileIcon,
  Link as LinkIcon,
  InsertDriveFile as DriveFileIcon,
} from '@mui/icons-material';
import { StyledCard, CardHeader, IconWrapper } from './SubNode.styles';
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

  const getIcon = () => {
    return type === 'folder' ? <FolderIcon /> : <FileIcon />;
  };

  const getTypeColor = () => {
    return type === 'folder' ? '#1976d2' : '#4caf50';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
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

  return (
    <StyledCard
      onClick={handleCardClick}
      sx={{
        cursor: type === 'folder' ? 'pointer' : 'default',
        height: '100%',
        width: "15rem",
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: type === 'folder' ? 'translateY(-4px)' : 'none',
          boxShadow: type === 'folder' ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.08)',
        },
      }}
    >
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 2.5, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          '&:last-child': { pb: { xs: 2, sm: 2.5, md: 3 } },
        }}
      >
        {/* Header Section */}
        <CardHeader sx={{ mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
            <IconWrapper
              type={type}
              sx={{
                backgroundColor: getTypeColor() + '15',
                color: getTypeColor(),
                flexShrink: 0,
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
              }}
            >
              {getIcon()}
            </IconWrapper>
            <Box sx={{ flex: 1, ml: { xs: 1.5, sm: 2 }, minWidth: 0 }}>
              <Tooltip title={heading.length > 40 ? heading : ''} arrow placement="top">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#202124',
                    mb: 0.5,
                    fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    wordBreak: 'break-word',
                  }}
                >
                  {heading}
                </Typography>
              </Tooltip>
              <Chip
                label={type === 'folder' ? 'Folder' : 'File'}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  backgroundColor: getTypeColor() + '15',
                  color: getTypeColor(),
                  border: `1px solid ${getTypeColor()}30`,
                }}
              />
            </Box>
          </Box>

          {/* More Options Menu */}
          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{
              opacity: 0.6,
              flexShrink: 0,
              ml: 1,
              '&:hover': {
                opacity: 1,
                backgroundColor: 'rgba(0,0,0,0.04)',
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
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                borderRadius: '8px',
                mt: 0.5,
              },
            }}
          >
            <MenuItem
              onClick={handleEdit}
              sx={{
                fontSize: '0.875rem',
                py: 1,
                px: 2,
                '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' },
              }}
            >
              <EditIcon fontSize="small" sx={{ mr: 1.5, color: '#1976d2' }} />
              Edit
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={handleDelete}
              sx={{
                fontSize: '0.875rem',
                py: 1,
                px: 2,
                color: 'error.main',
                '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' },
              }}
            >
              <DeleteIcon fontSize="small" sx={{ mr: 1.5 }} />
              Delete
            </MenuItem>
          </Menu>
        </CardHeader>

        {/* Description */}
        {description && (
          <Typography
            variant="body2"
            sx={{
              color: '#5f6368',
              mb: 2,
              lineHeight: 1.6,
              fontSize: { xs: '0.813rem', sm: '0.875rem' },
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
            }}
          >
            {description}
          </Typography>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
            <TagIcon sx={{ fontSize: 14, color: '#9e9e9e', flexShrink: 0 }} />
            {tags.slice(0, 3).map((tag, index) => (
              <Tooltip key={index} title={tag.length > 15 ? tag : ''} arrow>
                <Chip
                  label={truncateText(tag, 15)}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.7rem',
                    height: 22,
                    maxWidth: '120px',
                    borderColor: '#e0e0e0',
                    color: '#5f6368',
                    '& .MuiChip-label': {
                      px: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  }}
                />
              </Tooltip>
            ))}
            {tags.length > 3 && (
              <Chip
                label={`+${tags.length - 3}`}
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  height: 22,
                  backgroundColor: '#f5f5f5',
                  color: '#5f6368',
                  fontWeight: 500,
                }}
              />
            )}
          </Box>
        )}

        {/* File Details Section */}
        {fileDetails.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
              <AttachFileIcon sx={{ fontSize: 16, color: '#4caf50', flexShrink: 0 }} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: '#4caf50',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.7rem',
                }}
              >
                Attached Files ({fileDetails.length})
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, ml: 3 }}>
              {fileDetails.slice(0, 2).map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    minWidth: 0,
                  }}
                >
                  <DriveFileIcon sx={{ fontSize: 14, color: '#5f6368', flexShrink: 0 }} />
                  <Tooltip title={file.fileName} arrow placement="top">
                    <Link
                      href={file.uploadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      sx={{
                        fontSize: '0.75rem',
                        color: '#1976d2',
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
                      {truncateText(file.fileName, 30)}
                    </Link>
                  </Tooltip>
                </Box>
              ))}
              {fileDetails.length > 2 && (
                <Typography
                  variant="caption"
                  sx={{
                    color: '#5f6368',
                    fontSize: '0.7rem',
                    ml: 2.5,
                    fontStyle: 'italic',
                  }}
                >
                  +{fileDetails.length - 2} more file{fileDetails.length - 2 > 1 ? 's' : ''}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Reference Details Section */}
        {referenceDetails.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
              <LinkIcon sx={{ fontSize: 16, color: '#ff9800', flexShrink: 0 }} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: '#ff9800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.7rem',
                }}
              >
                References ({referenceDetails.length})
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, ml: 3 }}>
              {referenceDetails.slice(0, 2).map((ref, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    minWidth: 0,
                  }}
                >
                  <LinkIcon sx={{ fontSize: 14, color: '#5f6368', flexShrink: 0 }} />
                  <Tooltip title={ref.fileName} arrow placement="top">
                    <Link
                      href={ref.referenceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      sx={{
                        fontSize: '0.75rem',
                        color: '#1976d2',
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
                      {truncateText(ref.fileName, 30)}
                    </Link>
                  </Tooltip>
                </Box>
              ))}
              {referenceDetails.length > 2 && (
                <Typography
                  variant="caption"
                  sx={{
                    color: '#5f6368',
                    fontSize: '0.7rem',
                    ml: 2.5,
                    fontStyle: 'italic',
                  }}
                >
                  +{referenceDetails.length - 2} more reference{referenceDetails.length - 2 > 1 ? 's' : ''}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Summary Chips */}
        {(fileDetails.length > 0 || referenceDetails.length > 0) && (
          <Box sx={{ mb: 2 }}>
            <Divider sx={{ mb: 1.5 }} />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {fileDetails.length > 0 && (
                <Chip
                  icon={<AttachFileIcon sx={{ fontSize: '0.9rem !important' }} />}
                  label={`${fileDetails.length} File${fileDetails.length > 1 ? 's' : ''}`}
                  size="small"
                  sx={{
                    height: 26,
                    fontSize: '0.75rem',
                    backgroundColor: '#e8f5e9',
                    color: '#2e7d32',
                    fontWeight: 600,
                    border: '1px solid #a5d6a7',
                    '& .MuiChip-icon': { color: '#2e7d32' },
                  }}
                />
              )}
              {referenceDetails.length > 0 && (
                <Chip
                  icon={<LinkIcon sx={{ fontSize: '0.9rem !important' }} />}
                  label={`${referenceDetails.length} Link${referenceDetails.length > 1 ? 's' : ''}`}
                  size="small"
                  sx={{
                    height: 26,
                    fontSize: '0.75rem',
                    backgroundColor: '#fff3e0',
                    color: '#e65100',
                    fontWeight: 600,
                    border: '1px solid #ffcc80',
                    '& .MuiChip-icon': { color: '#e65100' },
                  }}
                />
              )}
            </Box>
          </Box>
        )}

        {/* Spacer to push dates to bottom */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Dates Section */}
        {(lastDate || createdAt) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1.5,
              pt: 2,
              borderTop: '1px solid #f0f0f0',
              mt: 'auto',
            }}
          >
            {lastDate && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarIcon sx={{ fontSize: 14, color: '#d32f2f', flexShrink: 0 }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#d32f2f',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Due: {formatDate(lastDate)}
                </Typography>
              </Box>
            )}
            {createdAt && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarIcon sx={{ fontSize: 14, color: '#5f6368', flexShrink: 0 }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#5f6368',
                    fontSize: '0.7rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {formatDate(createdAt)}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default SubnodeCard;
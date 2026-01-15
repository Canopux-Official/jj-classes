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
  Paper,
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
  AccessTime as AccessTimeIcon,
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

  // const getIcon = () => {
  //   return type === 'folder' ? <FolderIcon /> : <FileIcon />;
  // };

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
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid #e0e0e0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        background: '#ffffff',
        '&:hover': {
          transform: isFolder ? 'translateY(-4px)' : 'none',
          boxShadow: isFolder ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
          borderColor: isFolder ? '#bdbdbd' : '#e0e0e0',
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
              width: 40,
              height: 40,
              borderRadius: '8px',
              background: '#0F2027',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {isFolder ? (
              <FolderIcon sx={{ color: 'white', fontSize: 24 }} />
            ) : (
              <FileIcon sx={{ color: '#ffffff', fontSize: 24 }} />
            )}
          </Box>

          {/* Title and Badge */}
          <Box sx={{ flex: 1, ml: 1.5, minWidth: 0 }}>
            <Tooltip title={heading.length > 35 ? heading : ''} arrow placement="top">
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 600,
                  color: '#0F2027',
                  mb: 0.5,
                  fontSize: '0.95rem',
                  lineHeight: 1.4,
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
                fontSize: '0.65rem',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: '#f5f5f5',
                color: '#616161',
                border: '1px solid #e0e0e0',
              }}
            />
          </Box>

          {/* More Options Menu */}
          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{
              flexShrink: 0,
              color: '#9e9e9e',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                color: '#616161',
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
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                borderRadius: '8px',
                mt: 0.5,
              },
            }}
          >
            <MenuItem
              onClick={handleEdit}
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
                py: 1,
                px: 2,
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              <EditIcon fontSize="small" sx={{ mr: 1.5, color: '#616161' }} />
              Edit
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={handleDelete}
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
                py: 1,
                px: 2,
                color: '#d32f2f',
                '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' },
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
              fontFamily: '"Open Sans", sans-serif',
              color: '#757575',
              mb: 2,
              lineHeight: 1.6,
              fontSize: '0.875rem',
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
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center' }}>
            <TagIcon sx={{ fontSize: 14, color: '#9e9e9e', flexShrink: 0 }} />
            {tags.slice(0, 3).map((tag, index) => (
              <Tooltip key={index} title={tag.length > 12 ? tag : ''} arrow>
                <Chip
                  label={truncateText(tag, 12)}
                  size="small"
                  sx={{
                    fontSize: '0.7rem',
                    height: 22,
                    maxWidth: '100px',
                    background: '#fafafa',
                    color: '#616161',
                    border: '1px solid #e0e0e0',
                    fontWeight: 500,
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
                  background: '#f5f5f5',
                  color: '#757575',
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
        )}

        {/* File Details Section */}
        {fileDetails.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
              <AttachFileIcon sx={{ fontSize: 16, color: '#FFD700', flexShrink: 0 }} />
              <Typography
                variant="caption"
                sx={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 600,
                  color: '#424242',
                  fontSize: '0.7rem',
                }}
              >
                Files ({fileDetails.length})
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, pl: 2 }}>
              {fileDetails.slice(0, 2).map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    minWidth: 0,
                  }}
                >
                  <DriveFileIcon sx={{ fontSize: 14, color: '#9e9e9e', flexShrink: 0 }} />
                  <Tooltip title={file.fileName} arrow placement="top">
                    <Link
                      href={file.uploadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      sx={{
                        fontFamily: '"Open Sans", sans-serif',
                        fontSize: '0.75rem',
                        color: '#424242',
                        textDecoration: 'none',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                        minWidth: 0,
                        '&:hover': {
                          color: '#0F2027',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {truncateText(file.fileName, 25)}
                    </Link>
                  </Tooltip>
                </Box>
              ))}
              {fileDetails.length > 2 && (
                <Typography
                  variant="caption"
                  sx={{
                    color: '#9e9e9e',
                    fontSize: '0.7rem',
                    pl: 1,
                    fontStyle: 'italic',
                  }}
                >
                  +{fileDetails.length - 2} more
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Reference Details Section */}
        {referenceDetails.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
              <LinkIcon sx={{ fontSize: 16, color: '#FFD700', flexShrink: 0 }} />
              <Typography
                variant="caption"
                sx={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 600,
                  color: '#424242',
                  fontSize: '0.7rem',
                }}
              >
                Links ({referenceDetails.length})
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, pl: 2 }}>
              {referenceDetails.slice(0, 2).map((ref, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    minWidth: 0,
                  }}
                >
                  <LinkIcon sx={{ fontSize: 14, color: '#9e9e9e', flexShrink: 0 }} />
                  <Tooltip title={ref.fileName} arrow placement="top">
                    <Link
                      href={ref.referenceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      sx={{
                        fontFamily: '"Open Sans", sans-serif',
                        fontSize: '0.75rem',
                        color: '#424242',
                        textDecoration: 'none',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                        minWidth: 0,
                        '&:hover': {
                          color: '#0F2027',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {truncateText(ref.fileName, 25)}
                    </Link>
                  </Tooltip>
                </Box>
              ))}
              {referenceDetails.length > 2 && (
                <Typography
                  variant="caption"
                  sx={{
                    color: '#9e9e9e',
                    fontSize: '0.7rem',
                    pl: 1,
                    fontStyle: 'italic',
                  }}
                >
                  +{referenceDetails.length - 2} more
                </Typography>
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
                    fontFamily: '"Open Sans", sans-serif',
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
                <AccessTimeIcon sx={{ fontSize: 14, color: '#9e9e9e', flexShrink: 0 }} />
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: '"Open Sans", sans-serif',
                    color: '#757575',
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
    </Paper>
  );
};

export default SubnodeCard;
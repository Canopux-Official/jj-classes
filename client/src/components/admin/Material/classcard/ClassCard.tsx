
// components/ClassCard/ClassCard.tsx
import React from 'react';
import { Typography, IconButton, Menu, MenuItem, Box, Chip } from '@mui/material';
import {
  Folder,
  MoreVert,
  Edit,
  Delete,
} from '@mui/icons-material';
import type { Node } from '../types/node';

export interface ClassCardProps {
  id: string;
  name: string;
  tags: string[];
  description?: string;
  fileDetails?: unknown[];
  targetExam: string;
  classType: string;
  stream: string;
  referenceDetails?: unknown[];
  createdAt?: string;
  updatedAt?: string;
  lastDate?: string;
  node: Node;
  onClick?: (id: string) => void;
  onEdit?: (node: Node) => void;
  onDelete?: (id: string) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  id,
  classType,
  targetExam,
  stream,
  description,
  createdAt,
  updatedAt,
  node,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event?: React.MouseEvent) => {
    event?.stopPropagation();
    setAnchorEl(null);
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose();
    onEdit?.(node);
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleMenuClose();
    onDelete?.(id);
  };

  const handleCardClick = () => {
    onClick?.(id);
  };

  const formatDate = (dateString?: string) => {
    return dateString
      ? new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
      : 'N/A';
  };

  return (
    <Box
      onClick={handleCardClick}
      sx={{
        position: 'relative',
        background: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '1px solid #e8eaed',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-2px)',
          borderColor: '#d0d4d9',
        },
      }}
    >

      <Box sx={{ p: 3 }}>
        {/* Header with icon, title and menu */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2.5 }}>
          {/* Folder Icon */}
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              mr: 2,
            }}
          >
            <Folder sx={{ color: '#075c4f', fontSize: 26 }} />
          </Box>

          {/* Title and Subtitle */}
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
              {`Class ${classType}`}
            </Typography>

            {/* Target Exam Badge */}
            <Typography
              variant="body2"
              sx={{
                color: '#5f6368',
                fontSize: '0.8125rem',
                fontWeight: 500,
              }}
            >
              {targetExam}
            </Typography>
          </Box>

          {/* Menu Button */}
          <IconButton
            aria-label="more options"
            aria-controls={open ? 'class-card-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleMenuClick}
            size="small"
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
            <MoreVert fontSize="small" />
          </IconButton>

          <Menu
            id="class-card-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={(e: React.SyntheticEvent) => {
              (e as React.SyntheticEvent)?.stopPropagation();
              handleMenuClose();
            }}
            MenuListProps={{
              'aria-labelledby': 'more-options-button',
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
              <Edit fontSize="small" sx={{ mr: 1.5, color: '#5f6368' }} />
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
              <Delete fontSize="small" sx={{ mr: 1.5 }} />
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
              mb: 2.5,
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

        {/* Divider */}
        <Box
          sx={{
            height: '1px',
            backgroundColor: '#e8eaed',
            mb: 2,
          }}
        />

        {/* Footer with chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          {stream && (
            <Chip
              label={stream}
              size="small"
              sx={{
                backgroundColor: '#f5f5f5',
                color: 'black',
                fontSize: '0.75rem',
                height: 26,
                fontWeight: 600,
                border: 'none',
                '&:hover': {
                  backgroundColor: '#c8e6c9',
                },
              }}
            />
          )}
          {createdAt && (
            <Typography
              variant="caption"
              sx={{
                color: '#80868b',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Created {formatDate(createdAt)}
            </Typography>
          )}
          {updatedAt && formatDate(createdAt) !== formatDate(updatedAt) && (
            <>
              <Box sx={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#dadce0' }} />
              <Typography
                variant="caption"
                sx={{
                  color: '#80868b',
                  fontSize: '0.75rem',
                }}
              >
                Updated {formatDate(updatedAt)}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ClassCard;
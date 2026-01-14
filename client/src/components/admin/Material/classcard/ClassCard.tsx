// components/ClassCard/ClassCard.tsx
import React from 'react';
import { Typography, IconButton, Menu, MenuItem, Box, Chip } from '@mui/material';
import {
  School,
  CalendarToday,
  MoreVert,
  Edit,
  Delete,
  Update,
  TrendingUp,
  Category,
} from '@mui/icons-material';
import type { Node } from '../types/node';

export interface ClassCardProps {
  id: string;
  name: string;
  tags: string[];
  description?: string;
  fileDetails?: unknown[];
  targetExam: string;
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
  name,
  targetExam,
  stream,
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
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(15, 32, 39, 0.08)',
        boxShadow: '0 2px 8px rgba(15, 32, 39, 0.06)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(15, 32, 39, 0.12)',
          borderColor: 'rgba(255, 215, 0, 0.3)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #0b2021 0%, #203A43 100%)',
        },
      }}
    >
      {/* Header Section */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2.5 }}>
          {/* Icon with gradient background */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0b2021 0%, #203A43 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(11, 32, 33, 0.2)',
            }}
          >
            <School sx={{ color: '#d1f5dd', fontSize: 26 }} />
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 700,
                color: '#0F2027',
                fontSize: { xs: '1.15rem', sm: '1.3rem' },
                lineHeight: 1.3,
                mb: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {name}
            </Typography>

            {/* Badges */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {targetExam && (
                <Chip
                  icon={<TrendingUp sx={{ fontSize: 16 }} />}
                  label={targetExam}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(25, 26, 26, 0.08)',
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 26,
                    '& .MuiChip-icon': {
                      color: '#000000',
                      marginLeft: '8px',
                    },
                  }}
                />
              )}
              {stream && (
                <Chip
                  icon={<Category sx={{ fontSize: 16 }} />}
                  label={stream}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(31, 32, 31, 0.15)',
                    color: '#032d25',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 26,
                    '& .MuiChip-icon': {
                      color: '#03261e',
                      marginLeft: '8px',
                    },
                  }}
                />
              )}
            </Box>
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
              color: '#546e7a',
              '&:hover': {
                backgroundColor: 'rgba(11, 32, 33, 0.06)',
                color: '#0b2021',
              },
            }}
          >
            <MoreVert />
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
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(15, 32, 39, 0.15)',
                mt: 1,
              },
            }}
          >
            <MenuItem 
              onClick={handleEdit}
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(11, 32, 33, 0.06)',
                },
              }}
            >
              <Edit fontSize="small" sx={{ mr: 1.5, color: '#546e7a' }} />
              Edit
            </MenuItem>
            <MenuItem 
              onClick={handleDelete} 
              sx={{ 
                color: '#d32f2f',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(211, 47, 47, 0.08)',
                },
              }}
            >
              <Delete fontSize="small" sx={{ mr: 1.5 }} />
              Delete
            </MenuItem>
          </Menu>
        </Box>

        {/* Divider */}
        <Box
          sx={{
            height: '1px',
            background: 'linear-gradient(90deg, rgba(15, 32, 39, 0.1) 0%, rgba(15, 32, 39, 0.05) 50%, rgba(15, 32, 39, 0) 100%)',
            mb: 2,
          }}
        />

        {/* Dates Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CalendarToday 
              sx={{ 
                fontSize: 16, 
                color: '#546e7a',
                flexShrink: 0,
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '0.875rem',
                color: '#546e7a',
                fontFamily: '"Open Sans", sans-serif',
              }}
            >
              <Box component="span" sx={{ fontWeight: 600, color: '#0F2027' }}>
                Created:
              </Box>{' '}
              {formatDate(createdAt)}
            </Typography>
          </Box>

          {formatDate(createdAt) !== formatDate(updatedAt) && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Update 
                sx={{ 
                  fontSize: 16, 
                  color: '#FFD700',
                  flexShrink: 0,
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '0.875rem',
                  color: '#546e7a',
                  fontFamily: '"Open Sans", sans-serif',
                }}
              >
                <Box component="span" sx={{ fontWeight: 600, color: '#0F2027' }}>
                  Updated:
                </Box>{' '}
                {formatDate(updatedAt)}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ClassCard;
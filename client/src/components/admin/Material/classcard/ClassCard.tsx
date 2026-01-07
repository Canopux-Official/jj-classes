// components/ClassCard/ClassCard.tsx
import React from 'react';
import { Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
import {
  School,
  CalendarToday,
  MoreVert,
  Edit,
  Delete,
  Update,
} from '@mui/icons-material';
import {
  StyledClassCard,
  CardHeader,
  IconWrapper,
  ContentWrapper,
  DetailsContainer,
  DetailItem,
  IconButtonWrapper,
} from './ClassCard.styles';
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
    <StyledClassCard onClick={handleCardClick}>
      <CardHeader>
        {/* Header with Icon and Menu Button */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <IconWrapper>
            <School />
          </IconWrapper>

          <ContentWrapper>
            {/* Class Name */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#202124',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                lineHeight: 1.3,
                mb: 0.5,
              }}
            >
              {name}
            </Typography>

            {/* Target Exam and Stream as Text */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {targetExam && (
                <Typography
                  variant="body2"
                  sx={{
                    color: '#1976d2',
                    fontWeight: 600,
                    fontSize: '0.813rem',
                  }}
                >
                  Target Exam: {targetExam}
                </Typography>
              )}
              {stream && (
                <Typography
                  variant="body2"
                  sx={{
                    color: '#7b1fa2',
                    fontWeight: 600,
                    fontSize: '0.813rem',
                  }}
                >
                  Stream: {stream}
                </Typography>
              )}
            </Box>
          </ContentWrapper>

          {/* Actions Menu - Positioned at top right */}
          <IconButtonWrapper>
            <IconButton
              aria-label="more options"
              aria-controls={open ? 'class-card-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleMenuClick}
              size="small"
              sx={{
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
              }}
            >
              <MoreVert />
            </IconButton>
          </IconButtonWrapper>

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
          >
            <MenuItem onClick={handleEdit}>
              <Edit fontSize="small" sx={{ mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
              <Delete fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </CardHeader>


      {/* Dates Section */}
      <DetailsContainer>
        <DetailItem>
          <CalendarToday sx={{ fontSize: '18px' }} />
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            <Box component="span" sx={{ fontWeight: 600 }}>Created:</Box> {formatDate(createdAt)}
          </Typography>
        </DetailItem>

        {formatDate(createdAt) !== formatDate(updatedAt) && (
          <DetailItem>
            <Update sx={{ fontSize: '18px' }} />
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              <Box component="span" sx={{ fontWeight: 600 }}>Updated:</Box> {formatDate(updatedAt)}
            </Typography>
          </DetailItem>
        )}
      </DetailsContainer>
    </StyledClassCard>
  );
};

export default ClassCard;
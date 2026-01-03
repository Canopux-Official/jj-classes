// components/ClassCard/ClassCard.tsx
import React from 'react';
import { Typography, IconButton, Menu, MenuItem } from '@mui/material';
import {
  School,
  CalendarToday,
  Description,
  MoreVert,
  Edit,
  Delete,
} from '@mui/icons-material';
import {
  StyledClassCard,
  CardHeader,
  IconWrapper,
  ContentWrapper,
  DetailsContainer,
  DetailItem,
  TagsWrapper,
  TagChip,
  CardFooter,
} from './ClassCard.styles';
import type { Node } from '../types/node';
import { Box } from '@mui/system';

export interface ClassCardProps {
  id: string;
  name: string;
  tags: string[];
  description?: string;
  fileDetails?: unknown[];
  referenceDetails?: unknown[];
  createdAt?: string;
  lastDate?: string;
  node: Node; // Add the full node object
  onClick?: (id: string) => void;
  onEdit?: (node: Node) => void; // Changed to pass full node
  onDelete?: (id: string) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  id,
  name,
  tags,
  description,
  fileDetails = [],
  referenceDetails = [],
  createdAt,
  lastDate,
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
    onEdit?.(node); // Pass the full node object
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
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  };

  return (
    <StyledClassCard onClick={handleCardClick}>
      <CardHeader>
        <IconWrapper>
          <School />
        </IconWrapper>
        <ContentWrapper>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#202124',
              fontSize: '1.1rem',
              lineHeight: 1.3,
            }}
          >
            {name}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              sx={{
                color: '#5f6368',
                fontSize: '0.8rem',
                mt: 0.5,
                fontStyle: 'italic',
              }}
            >
              {description.length > 100 ? `${description.substring(0, 100)}...` : description}
            </Typography>
          )}
        </ContentWrapper>

        {/* Status + Actions Menu */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>

          <IconButton
            aria-label="more options"
            aria-controls={open ? 'class-card-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleMenuClick}
            size="small"
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
          >
            <MenuItem onClick={handleEdit}>
              <Edit fontSize="small" sx={{ mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={handleDelete}
              sx={{ color: 'error.main' }}
            >
              <Delete fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </CardHeader>

      <DetailsContainer>
        <DetailItem>
          <CalendarToday />
          <Typography variant="body2">Created: {formatDate(createdAt)}</Typography>
        </DetailItem>
        <DetailItem>
          <CalendarToday />
          <Typography variant="body2">Last Date: {formatDate(lastDate)}</Typography>
        </DetailItem>
      </DetailsContainer>

      <TagsWrapper>
        {tags.map((tag, index) => (
          <TagChip key={index} label={tag} size="small" />
        ))}
      </TagsWrapper>

      <CardFooter>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <DetailItem sx={{ justifyContent: 'flex-start' }}>
            <Description />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {fileDetails.length} Uploads
            </Typography>
          </DetailItem>
          <DetailItem sx={{ justifyContent: 'flex-start' }}>
            <Description />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {referenceDetails.length} References
            </Typography>
          </DetailItem>
        </Box>
      </CardFooter>
    </StyledClassCard>
  );
};

export default ClassCard;
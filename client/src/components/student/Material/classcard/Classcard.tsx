
// Imports
import React from 'react';
import {
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  Folder,
} from '@mui/icons-material';
import type { Node } from '../../../admin/Material/types/node';
import { ClickableCard, IconWrapper } from '../theme/material.styles';


export const ClassCard: React.FC<{ node: Node; onClick: () => void }> = ({ node, onClick }) => {
  return (
    <ClickableCard onClick={onClick}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <IconWrapper itemType={node.type}>
            <Folder sx={{ fontSize: 32 }} />
          </IconWrapper>
          <Box sx={{ ml: 2, flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {node.heading}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {node.targetExam}
            </Typography>
          </Box>
        </Box>
        {node.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {node.description}
          </Typography>
        )}
        {node.tags && node.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {node.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: '#f5f5f5',
                  fontSize: '0.75rem',
                  height: '24px',
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </ClickableCard>
  );
};
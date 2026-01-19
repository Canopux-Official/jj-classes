import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Notice } from '../types/types';

interface NoticeListProps {
  notices: Notice[];
  onEdit: (notice: Notice) => void;
  onDelete: (id: string) => void;
}

const NoticeList: React.FC<NoticeListProps> = ({ notices, onEdit, onDelete }) => {
  if (notices.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No notices found. Create your first notice!
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={3} direction="row" flexWrap="wrap" justifyContent="space-evenly">
      {notices.map((notice) => (
        <Box key={notice._id} sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {notice.heading}
              </Typography>
              
              {notice.description && (
                <Typography variant="body2" color="text.secondary" paragraph>
                  {notice.description}
                </Typography>
              )}

              <Stack spacing={1} sx={{ mt: 2 }}>
                {notice.tag && (
                  <Box>
                    <Chip label={notice.tag} size="small" color="primary" />
                  </Box>
                )}

                {notice.isForAll ? (
                  <Chip label="All Students" size="small" color="success" />
                ) : (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {notice.classType && (
                      <Chip label={`Class ${notice.classType}`} size="small" variant="outlined" />
                    )}
                    
                    {notice.streams && notice.streams.length > 0 && (
                      <>
                        {notice.streams.map((stream) => (
                          <Chip 
                            key={stream._id} 
                            label={stream.name} 
                            size="small" 
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                      </>
                    )}
                    
                    {notice.targetExams && notice.targetExams.length > 0 && (
                      <>
                        {notice.targetExams.map((exam) => (
                          <Chip 
                            key={exam._id} 
                            label={exam.name} 
                            size="small" 
                            variant="outlined"
                            color="secondary"
                          />
                        ))}
                      </>
                    )}
                  </Box>
                )}
              </Stack>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                Created: {new Date(notice.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => onEdit(notice)}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => onDelete(notice._id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Stack>
  );
};

export default NoticeList;

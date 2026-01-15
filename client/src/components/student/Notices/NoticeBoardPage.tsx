import React from 'react';
import { Typography, Box, Chip, Stack } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import { NoticeCard, DateBadge } from './NoticeBoardPage.styles';

const NoticeBoardPage: React.FC = () => {
  const notices = [
    {
      id: 1,
      heading: "Diwali Vacation Schedule",
      date: "2025-10-15",
      description: "The institute will remain closed from Oct 20th to Oct 25th. Online classes resume on Oct 26th.",
      tag: "General"
    },
    {
      id: 2,
      heading: "Physics Extra Class - Class 12",
      date: "2025-10-12",
      description: "Extra class for Electrostatics doubt clearing scheduled for Sunday at 10 AM.",
      tag: "Academic"
    }
  ];

  return (
    <Box maxWidth="md">
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <CampaignIcon color="secondary" sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h4" fontWeight={700}>Notice Board</Typography>
          <Typography variant="body1" color="text.secondary">Stay updated with latest announcements.</Typography>
        </Box>
      </Stack>

      {notices.map((notice) => (
        <NoticeCard key={notice.id} elevation={0}>
          <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
            <Typography variant="h6" fontWeight={600} color="primary">
              {notice.heading}
            </Typography>
            <DateBadge>{notice.date}</DateBadge>
          </Box>
          <Typography variant="body2" color="text.secondary" paragraph>
            {notice.description}
          </Typography>
          <Chip 
            label={notice.tag} 
            size="small" 
            variant="outlined" 
            color={notice.tag === 'Admin' ? 'error' : notice.tag === 'General' ? 'default' : 'primary'} 
          />
        </NoticeCard>
      ))}
    </Box>
  );
};

export default NoticeBoardPage;
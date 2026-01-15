import React from 'react';
import { Typography, Box, Stack,  Divider, Avatar, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

import { 
  WelcomeCard, InfoCard, NoticePreview, 
  CountdownCard, QuickActionButton, QuoteBox 
} from './StudentDashboard.styles';

const StudentDashboard: React.FC = () => {
  // Mock Data
  const student = {
    name: "Anjali Singh",
    currentClass: "Class 12",
    targetExams: ["NEET"]
  };

  const recentMaterials = [
    { id: 1, title: "Electrostatics - Full Chapter Notes", type: "pdf", subject: "Physics", date: "Added Today" },
    { id: 2, title: "Organic Chemistry - Reaction Mechanisms", type: "video", subject: "Chemistry", date: "Added Yesterday" },
    { id: 3, title: "Biology Practice Paper Set A", type: "pdf", subject: "Biology", date: "2 days ago" },
  ];

  const notices = [
    { id: 1, title: "Diwali Vacation Schedule", date: "15 Oct 2025" },
    { id: 2, title: "Physics Guest Lecture by Dr. Verma", date: "12 Oct 2025" },
  ];

  return (
    <Box>
      {/* 1. Welcome Header (Simplified) */}
      <WelcomeCard elevation={3}>
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: -0.5 }}>
            Hello, {student.name}!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 0.5 }}>
            Stay focused. Your goal <strong>{student.targetExams[0]}</strong> is closer than you think.
          </Typography>
        </Box>
        {/* Decorative Icon or simple visual */}
        <Box sx={{ display: { xs: 'none', sm: 'block' }, opacity: 0.8 }}>
             <EmojiObjectsIcon sx={{ fontSize: 60, color: '#ffca28' }} />
        </Box>
      </WelcomeCard>

      {/* 2. Motivational Quote */}
      <QuoteBox>
        <Typography variant="body2" fontWeight={600}>
          "Success is the sum of small efforts, repeated day in and day out."
        </Typography>
        <Typography variant="caption" display="block" mt={0.5}>
          — Robert Collier
        </Typography>
      </QuoteBox>

      {/* 3. General Utilities Row (Countdown + Quick Actions) */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={3}>
        
        {/* Exam Countdown (Flex 1) */}
        <Box flex={1}>
           <CountdownCard elevation={0}>
              <HourglassEmptyIcon sx={{ fontSize: 40, mb: 1, opacity: 0.8 }} />
              <Typography variant="h3" fontWeight={800}>142</Typography>
              <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', letterSpacing: 1, opacity: 0.9 }}>
                 Days to NEET 2026
              </Typography>
           </CountdownCard>
        </Box>

        {/* Quick Actions (Flex 2) */}
        <Box flex={2}>
            <Stack direction="row" spacing={2} height="100%">
                <Box flex={1}>
                    <QuickActionButton>
                        <ReceiptLongIcon color="primary" fontSize="large" />
                        <Typography variant="body2" fontWeight={600}>Fee Receipts</Typography>
                    </QuickActionButton>
                </Box>
                <Box flex={1}>
                    <QuickActionButton>
                        <MenuBookIcon color="secondary" fontSize="large" />
                        <Typography variant="body2" fontWeight={600}>Syllabus</Typography>
                    </QuickActionButton>
                </Box>
                <Box flex={1}>
                    <QuickActionButton>
                        <SupportAgentIcon color="action" fontSize="large" />
                        <Typography variant="body2" fontWeight={600}>Help Desk</Typography>
                    </QuickActionButton>
                </Box>
            </Stack>
        </Box>
      </Stack>

      {/* 4. Main Content Row (Materials & Notices) */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        
        {/* Left: Recent Materials (Flex 2) */}
        <Box flex={2}>
            <InfoCard elevation={0}>
                <Typography variant="h6" fontWeight={700} mb={2}>Recently Added Materials</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    Documents and videos uploaded by your teachers recently.
                </Typography>
                
                <Stack spacing={2}>
                    {recentMaterials.map((mat) => (
                        <Box key={mat.id} display="flex" alignItems="center" justifyContent="space-between" p={2} borderRadius={2} border="1px solid #f0f0f0" sx={{ '&:hover': { bgcolor: '#f9fafb', borderColor: '#e0e0e0' } }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar sx={{ bgcolor: mat.type === 'pdf' ? '#ffebee' : '#e3f2fd', color: mat.type === 'pdf' ? '#d32f2f' : '#1976d2' }} variant="rounded">
                                    {mat.type === 'pdf' ? <PictureAsPdfIcon /> : <PlayCircleIcon />}
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2" fontWeight={600}>{mat.title}</Typography>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        {mat.subject} • <span style={{ color: '#2e7d32', fontWeight: 500 }}>{mat.date}</span>
                                    </Typography>
                                </Box>
                            </Stack>
                            <IconButton size="small">
                                <ArrowForwardIcon fontSize="small" color="action" />
                            </IconButton>
                        </Box>
                    ))}
                </Stack>
            </InfoCard>
        </Box>

        {/* Right: Notices (Flex 1) */}
        <Box flex={1}>
          <InfoCard elevation={0}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={700}>Notice Board</Typography>
              <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 600 }}>VIEW ALL</Typography>
            </Box>
            
            {notices.map((notice) => (
              <NoticePreview key={notice.id}>
                <Typography variant="subtitle2" fontWeight={600}>{notice.title}</Typography>
                <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                  <EventNoteIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">{notice.date}</Typography>
                </Stack>
              </NoticePreview>
            ))}

            <Divider sx={{ my: 2 }} />
            
            {/* Institute Contact Info (General Thing) */}
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary" mb={1}>
                Institute Contact
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
                Email: support@jjinstitute.com
            </Typography>
             <Typography variant="caption" display="block" color="text.secondary">
                Phone: +91 98765 43210
            </Typography>

          </InfoCard>
        </Box>

      </Stack>
    </Box>
  );
};

export default StudentDashboard;
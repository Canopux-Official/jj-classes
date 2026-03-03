// import React from 'react';
// import { Typography, Box, Stack, Divider } from '@mui/material';

// import EventNoteIcon from '@mui/icons-material/EventNote';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
// import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

// import {
//   WelcomeCard, InfoCard, NoticePreview,
//   CountdownCard, QuickActionButton, QuoteBox
// } from './StudentDashboard.styles';
// import RecentlyAddedMaterials from '../Material/stats/RecentlyAddedMaterials';
// import { useNavigate } from 'react-router-dom';

// // Import the new component

// const StudentDashboard: React.FC = () => {
//   // Mock Data
//   const student = {
//     name: "Anjali Singh",
//     currentClass: "Class 12",
//     targetExams: ["NEET"]
//   };

//   const notices = [
//     { id: 1, title: "Diwali Vacation Schedule", date: "15 Oct 2025" },
//     { id: 2, title: "Physics Guest Lecture by Dr. Verma", date: "12 Oct 2025" },
//   ];

//   const navigate = useNavigate()

//   // Handler for when student clicks on a material
//   const handleNavigateToMaterial = (fullPath: Array<{ id: string; heading: string }>) => {
//     console.log('Navigating to:', fullPath.map(p => p.heading).join(' → '));

//     // Navigate to materials page with the full path
//     navigate('/student/material', {
//       state: {
//         navigateToPath: fullPath,
//         shouldNavigate: true
//       }
//     });
//   };

//   return (
//     <Box>
//       {/* 1. Welcome Header (Simplified) */}
//       <WelcomeCard elevation={3}>
//         <Box>
//           <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: -0.5 }}>
//             Hello, {student.name}!
//           </Typography>
//           <Typography variant="body1" sx={{ opacity: 0.9, mt: 0.5 }}>
//             Stay focused. Your goal <strong>{student.targetExams[0]}</strong> is closer than you think.
//           </Typography>
//         </Box>
//         {/* Decorative Icon or simple visual */}
//         <Box sx={{ display: { xs: 'none', sm: 'block' }, opacity: 0.8 }}>
//           <EmojiObjectsIcon sx={{ fontSize: 60, color: '#ffca28' }} />
//         </Box>
//       </WelcomeCard>

//       {/* 2. Motivational Quote */}
//       <QuoteBox>
//         <Typography variant="body2" fontWeight={600}>
//           "Success is the sum of small efforts, repeated day in and day out."
//         </Typography>
//         <Typography variant="caption" display="block" mt={0.5}>
//           — Robert Collier
//         </Typography>
//       </QuoteBox>

//       {/* 3. General Utilities Row (Countdown + Quick Actions) */}
//       <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={3}>

//         {/* Exam Countdown (Flex 1) */}
//         <Box flex={1}>
//           <CountdownCard elevation={0}>
//             <HourglassEmptyIcon sx={{ fontSize: 40, mb: 1, opacity: 0.8 }} />
//             <Typography variant="h3" fontWeight={800}>142</Typography>
//             <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', letterSpacing: 1, opacity: 0.9 }}>
//               Days to NEET 2026
//             </Typography>
//           </CountdownCard>
//         </Box>

//         {/* Quick Actions (Flex 2) */}
//         <Box flex={2}>
//           <Stack direction="row" spacing={2} height="100%">
//             <Box flex={1}>
//               <QuickActionButton>
//                 <ReceiptLongIcon color="primary" fontSize="large" />
//                 <Typography variant="body2" fontWeight={600}>Fee Receipts</Typography>
//               </QuickActionButton>
//             </Box>
//             <Box flex={1}>
//               <QuickActionButton>
//                 <MenuBookIcon color="secondary" fontSize="large" />
//                 <Typography variant="body2" fontWeight={600}>Syllabus</Typography>
//               </QuickActionButton>
//             </Box>
//             <Box flex={1}>
//               <QuickActionButton>
//                 <SupportAgentIcon color="action" fontSize="large" />
//                 <Typography variant="body2" fontWeight={600}>Help Desk</Typography>
//               </QuickActionButton>
//             </Box>
//           </Stack>
//         </Box>
//       </Stack>

//       {/* 4. Main Content Row (Materials & Notices) */}
//       <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>

//         {/* Left: Recent Materials (Flex 2) - REPLACED WITH REAL COMPONENT */}
//         <Box flex={2}>
//           <InfoCard elevation={0}>
//             {/* Use the real RecentlyAddedMaterials component */}
//             <RecentlyAddedMaterials
//               onNavigateToMaterial={handleNavigateToMaterial}
//               maxItems={5}
//               showHeader={false}
//               containerStyles={{ padding: 0 }}
//             />
//           </InfoCard>
//         </Box>

//         {/* Right: Notices (Flex 1) */}
//         <Box flex={1}>
//           <InfoCard elevation={0}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//               <Typography variant="h6" fontWeight={700}>Notice Board</Typography>
//               <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 600 }}>VIEW ALL</Typography>
//             </Box>

//             {notices.map((notice) => (
//               <NoticePreview key={notice.id}>
//                 <Typography variant="subtitle2" fontWeight={600}>{notice.title}</Typography>
//                 <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
//                   <EventNoteIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
//                   <Typography variant="caption" color="text.secondary">{notice.date}</Typography>
//                 </Stack>
//               </NoticePreview>
//             ))}

//             <Divider sx={{ my: 2 }} />

//             {/* Institute Contact Info (General Thing) */}
//             <Typography variant="subtitle2" fontWeight={700} color="text.secondary" mb={1}>
//               Institute Contact
//             </Typography>
//             <Typography variant="caption" display="block" color="text.secondary">
//               Email: support@jjinstitute.com
//             </Typography>
//             <Typography variant="caption" display="block" color="text.secondary">
//               Phone: +91 98765 43210
//             </Typography>

//           </InfoCard>
//         </Box>

//       </Stack>
//     </Box>
//   );
// };

// export default StudentDashboard;


import React, { useEffect, useState } from 'react';
import { Typography, Box, Stack, Divider, CircularProgress } from '@mui/material';

import EventNoteIcon from '@mui/icons-material/EventNote';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

import {
  WelcomeCard, InfoCard, NoticePreview, QuoteBox
} from './StudentDashboard.styles';
import RecentlyAddedMaterials from '../Material/stats/RecentlyAddedMaterials';
import MaterialStatsCard from '../Material/stats/MaterialStatsCard';
import { useNavigate } from 'react-router-dom';
import { getStudentProfile, getStudentNotices } from '../../../api/apiFunctions';

interface StudentData {
  name?: string;
  targetExams?: { name?: string }[];
  currentClass?: string;
  stream?: { name?: string };
}

interface NoticeData {
  _id: string;
  title?: string;
  heading?: string;
  createdAt?: string;
}

const StudentDashboard: React.FC = () => {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, noticesRes] = await Promise.all([
          getStudentProfile(),
          getStudentNotices()
        ]);
        
        if (profileRes.success && profileRes.data) {
          // Backend returns the student document directly (not wrapped in { student })
          setStudent(profileRes.data as StudentData);
        }
        
        if (noticesRes.success && noticesRes.data) {
          // Backend returns { success, data: [...notices], count }
          const payload = noticesRes.data as { data?: NoticeData[] };
          if (Array.isArray(payload.data)) {
            setNotices(payload.data);
          }
        }
      } catch (error) {
        console.error("Error loading dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handler for when student clicks on a material
  const handleNavigateToMaterial = (fullPath: Array<{ id: string; heading: string }>) => {
    console.log('Navigating to:', fullPath.map(p => p.heading).join(' → '));

    // Navigate to materials page with the full path
    navigate('/student/material', {
      state: {
        navigateToPath: fullPath,
        shouldNavigate: true,
        timestamp: Date.now() // Add timestamp to ensure navigation triggers
      }
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Fallback defaults if APIs fail
  const studentName = student?.name || "Student";
  const studentTargets = student?.targetExams?.length
    ? student.targetExams.map(t => t.name || '').filter(Boolean).join(', ')
    : "Your upcoming exams";

  return (
    <Box>
      {/* 1. Welcome Header */}
      <WelcomeCard elevation={3}>
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: -0.5 }}>
            Hello, {studentName}!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 0.5 }}>
            Stay focused. <strong>{studentTargets}</strong> is closer than you think.
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, opacity: 0.8 }}>
          <EmojiObjectsIcon sx={{ fontSize: 60, color: '#ffca28' }} />
        </Box>
      </WelcomeCard>

      {/* 2. Motivational Quote */}
      <QuoteBox mb={3}>
        <Typography variant="body2" fontWeight={600}>
          "Success is the sum of small efforts, repeated day in and day out."
        </Typography>
        <Typography variant="caption" display="block" mt={0.5}>
          — Robert Collier
        </Typography>
      </QuoteBox>

      {/* 4. Material Statistics Section (FULL WIDTH) */}
      <Box mb={3}>
        <InfoCard elevation={0}>
          <MaterialStatsCard />
        </InfoCard>
      </Box>

      {/* 5. Main Content Row (Recent Materials & Notices) */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {/* Left: Recent Materials */}
        <Box flex={2}>
          <InfoCard elevation={0}>
            <RecentlyAddedMaterials
              onNavigateToMaterial={handleNavigateToMaterial}
              maxItems={5}
              showHeader={false}
              containerStyles={{ padding: 0 }}
            />
          </InfoCard>
        </Box>

        {/* Right: Notices */}
        <Box flex={1}>
          <InfoCard elevation={0}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={700}>Notice Board</Typography>
              <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 600 }}>
                VIEW ALL
              </Typography>
            </Box>

            {notices.length === 0 ? (
              <Typography variant="body2" color="text.secondary">No active notices.</Typography>
            ) : (
              notices.slice(0, 3).map((notice) => (
                <NoticePreview key={notice._id}>
                  <Typography variant="subtitle2" fontWeight={600}>{notice.title || notice.heading}</Typography>
                  <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                    <EventNoteIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                       {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : ''}
                    </Typography>
                  </Stack>
                </NoticePreview>
              ))
            )}

            <Divider sx={{ my: 2 }} />

            {/* Institute Contact Info */}
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



// import React from 'react';
// import { 
//   Typography, 
//   Box, 
//   Stack, 
//   Container, 
//   useTheme,
//   useMediaQuery,
//   IconButton,
//   Chip,
//   Avatar
// } from '@mui/material';

// // Icons
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
// import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import AutoStoriesIcon from '@mui/icons-material/AutoStories';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// // Custom Styled Components
// import {
//   WelcomeCard, 
//   SectionContainer,
//   SectionHeader, 
//   NoticePreview,
//   CountdownCard, 
//   QuickActionButton
// } from './StudentDashboard.styles';

// // Functional Components
// import RecentlyAddedMaterials from '../Material/stats/RecentlyAddedMaterials';
// import MaterialStatsCard from '../Material/stats/MaterialStatsCard';
// import { useNavigate } from 'react-router-dom';

// const StudentDashboard: React.FC = () => {
//   const theme = useTheme();
//   // Using 'md' breakpoint: stack vertically on mobile/tablets, row on desktop
//   const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
//   const navigate = useNavigate();

//   // --- Mock Data ---
//   const student = {
//     name: "Anjali Singh",
//     currentClass: "Class 12",
//     targetExams: ["NEET"]
//   };

//   const notices = [
//     { id: 1, title: "Diwali Vacation Schedule declared", date: "15 Oct 2025", type: "Holiday" },
//     { id: 2, title: "Physics Guest Lecture by Dr. Verma", date: "12 Oct 2025", type: "Event" },
//   ];

//   const quickLinks = [
//     { label: "Pay Fees", icon: <ReceiptLongIcon />, color: "#E91E63", route: "/student/fees" },
//     { label: "Syllabus", icon: <MenuBookIcon />, color: "#2196F3", route: "/student/syllabus" },
//     { label: "Support", icon: <SupportAgentIcon />, color: "#FF9800", route: "/student/support" },
//     { label: "Library", icon: <AutoStoriesIcon />, color: "#4CAF50", route: "/student/material" },
//   ];

//   // --- Logic ---
//   const handleNavigateToMaterial = (fullPath: Array<{ id: string; heading: string }>) => {
//     navigate('/student/material', {
//       state: { navigateToPath: fullPath, shouldNavigate: true, timestamp: Date.now() }
//     });
//   };

//   const getCurrentDate = () => {
//     return new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
//   };

//   return (
//     <Box sx={{ flexGrow: 1, pb: 4, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
//       <Container maxWidth="xl" sx={{ pt: 3 }}>
        
//         {/* HEADER SECTION */}
//         <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
//           <Box>
//             <Typography variant="body2" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={1}>
//               {getCurrentDate()}
//             </Typography>
//             <Typography variant={isMobile ? "h5" : "h4"} fontWeight={800} color="#1a237e">
//               Student Dashboard
//             </Typography>
//           </Box>
//           <IconButton sx={{ bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
//             <NotificationsNoneIcon color="action" />
//           </IconButton>
//         </Stack>

//         {/* TOP ROW: Welcome & Countdown */}
//         {/* Uses Stack with flex-basis for responsive sizing without Grid */}
//         <Stack direction={isMobile ? 'column' : 'row'} spacing={3} mb={4}>
          
//           {/* Left: Welcome Card (Takes 66% width on desktop) */}
//           <Box flexBasis={isMobile ? '100%' : '66.66%'} flexGrow={1}>
//             <WelcomeCard elevation={0}>
//               <Box position="relative" zIndex={2}>
//                 <Chip 
//                   label="Academic Year 2025-26" 
//                   size="small" 
//                   sx={{ 
//                     bgcolor: 'rgba(255,255,255,0.15)', 
//                     color: 'white', 
//                     mb: 2, 
//                     fontWeight: 600, 
//                     border: '1px solid rgba(255,255,255,0.2)' 
//                   }} 
//                 />
//                 <Typography variant="h4" fontWeight={800} sx={{ mb: 1, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
//                   Hello, {student.name.split(' ')[0]}! 👋
//                 </Typography>
//                 <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: '600px', lineHeight: 1.6, fontSize: '1.05rem' }}>
//                   You are preparing for <strong>{student.targetExams[0]}</strong>. Consistency is the key to cracking it. Keep your momentum going!
//                 </Typography>
//               </Box>
//               <EmojiObjectsIcon sx={{ 
//                 position: 'absolute', right: 30, bottom: -20, 
//                 fontSize: 180, opacity: 0.15, color: 'white', transform: 'rotate(-20deg)' 
//               }} />
//             </WelcomeCard>
//           </Box>

//           {/* Right: Countdown (Takes 33% width on desktop) */}
//           <Box flexBasis={isMobile ? '100%' : '33.33%'} flexGrow={1}>
//             <CountdownCard elevation={0}>
//               <Box position="relative" zIndex={2}>
//                 <Typography variant="h2" fontWeight={800} sx={{ lineHeight: 1, mb: 0.5, textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
//                   142
//                 </Typography>
//                 <Typography variant="h6" fontWeight={600} sx={{ mb: 2, opacity: 0.9 }}>Days Remaining</Typography>
//                 <Chip 
//                   label={`Target: ${student.targetExams[0]}`} 
//                   size="small" 
//                   sx={{ bgcolor: 'white', color: '#EF6C00', fontWeight: 800 }} 
//                 />
//               </Box>
//               <HourglassEmptyIcon sx={{ position: 'absolute', right: -20, bottom: -30, fontSize: 160, opacity: 0.2, color: 'white' }} />
//             </CountdownCard>
//           </Box>
//         </Stack>

//         {/* MIDDLE SECTION: Stats & Quick Actions */}
//         <Stack direction={isMobile ? 'column' : 'row'} spacing={3} mb={4}>
          
//           {/* Material Stats (Takes 66%) */}
//           <Box flexBasis={isMobile ? '100%' : '66.66%'} flexGrow={1}>
//              <SectionContainer elevation={0}>
//                 <SectionHeader bgcolor="#e3f2fd"> {/* Light Blue Header */}
//                   <Stack direction="row" alignItems="center" spacing={1.5}>
//                     <Avatar sx={{ bgcolor: '#2196F3', width: 32, height: 32 }}>
//                       <TrendingUpIcon fontSize="small" />
//                     </Avatar>
//                     <Box>
//                       <Typography variant="h6" fontWeight={700} color="#0d47a1">Study Analytics</Typography>
//                       <Typography variant="caption" color="text.secondary">Your learning progress overview</Typography>
//                     </Box>
//                   </Stack>
//                 </SectionHeader>
                
//                 {/* Padding Wrapper to contain the Stats Card */}
//                 <Box p={3}>
//                    <MaterialStatsCard /> 
//                 </Box>
//              </SectionContainer>
//           </Box>

//           {/* Quick Actions (Takes 33%) */}
//           <Box flexBasis={isMobile ? '100%' : '33.33%'} flexGrow={1} display="flex" flexDirection="column">
//              <Typography variant="h6" fontWeight={700} color="text.primary" mb={2}>Quick Access</Typography>
             
//              {/* Using CSS Grid for the 2x2 Layout within the flex item */}
//              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} flexGrow={1}>
//                {quickLinks.map((link, index) => (
//                  <QuickActionButton key={index} accentColor={link.color}>
//                     {link.icon}
//                     <Typography variant="body2" fontWeight={700}>{link.label}</Typography>
//                  </QuickActionButton>
//                ))}
//              </Box>
//           </Box>
//         </Stack>

//         {/* BOTTOM SECTION: Library & Notices */}
//         <Stack direction={isMobile ? 'column' : 'row'} spacing={3}>
          
//           {/* Recent Materials (Takes 70%) */}
//           <Box flexBasis={isMobile ? '100%' : '70%'} flexGrow={1}>
//             <SectionContainer elevation={0} sx={{ minHeight: '400px' }}>
//               <SectionHeader bgcolor="#f3e5f5"> {/* Light Purple Header */}
//                 <Stack direction="row" alignItems="center" spacing={1.5}>
//                   <Avatar sx={{ bgcolor: '#9c27b0', width: 32, height: 32 }}>
//                     <MenuBookIcon fontSize="small" />
//                   </Avatar>
//                   <Box>
//                     <Typography variant="h6" fontWeight={700} color="#4a148c">Recently Added Materials</Typography>
//                     <Typography variant="caption" color="text.secondary">Latest uploads by your teachers</Typography>
//                   </Box>
//                 </Stack>
//                 <Typography 
//                   variant="caption" 
//                   color="secondary" 
//                   fontWeight={700} 
//                   sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
//                   onClick={() => navigate('/student/material')}
//                 >
//                   VIEW LIBRARY
//                 </Typography>
//               </SectionHeader>
              
//               <Box p={2}>
//                 <RecentlyAddedMaterials
//                   onNavigateToMaterial={handleNavigateToMaterial}
//                   maxItems={5}
//                   showHeader={false}
//                   containerStyles={{ padding: 0 }}
//                 />
//               </Box>
//             </SectionContainer>
//           </Box>

//           {/* Notices (Takes 30%) */}
//           <Box flexBasis={isMobile ? '100%' : '30%'} flexGrow={1}>
//             <SectionContainer elevation={0} sx={{ height: 'auto' }}>
//               <SectionHeader bgcolor="#fff3e0"> {/* Light Orange Header */}
//                 <Stack direction="row" alignItems="center" spacing={1.5}>
//                   <Avatar sx={{ bgcolor: '#ed6c02', width: 32, height: 32 }}>
//                     <EventNoteIcon fontSize="small" />
//                   </Avatar>
//                   <Typography variant="h6" fontWeight={700} color="#e65100">Notice Board</Typography>
//                 </Stack>
//               </SectionHeader>

//               <Box p={2}>
//                 <Stack spacing={2}>
//                   {notices.map((notice) => (
//                     <NoticePreview key={notice.id}>
//                       <Stack direction="row" justifyContent="space-between" mb={1}>
//                         <Chip 
//                           label={notice.type} 
//                           size="small" 
//                           sx={{ 
//                             height: 20, 
//                             fontSize: '0.65rem', 
//                             fontWeight: 700,
//                             borderRadius: '4px',
//                             bgcolor: notice.type === 'Holiday' ? '#ffebee' : '#e3f2fd',
//                             color: notice.type === 'Holiday' ? '#c62828' : '#1565c0'
//                           }} 
//                         />
//                         <Typography variant="caption" color="text.secondary" fontWeight={600}>{notice.date}</Typography>
//                       </Stack>
//                       <Typography variant="subtitle2" fontWeight={700} color="text.primary" sx={{ lineHeight: 1.3 }}>
//                         {notice.title}
//                       </Typography>
//                     </NoticePreview>
//                   ))}
//                 </Stack>
//               </Box>
//             </SectionContainer>
//           </Box>

//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// export default StudentDashboard;
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


import React from 'react';
import { Typography, Box, Stack, Divider } from '@mui/material';

import EventNoteIcon from '@mui/icons-material/EventNote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

import {
  WelcomeCard, InfoCard, NoticePreview,
  CountdownCard, QuickActionButton, QuoteBox
} from './StudentDashboard.styles';
import RecentlyAddedMaterials from '../Material/stats/RecentlyAddedMaterials';
import MaterialStatsCard from '../Material/stats/MaterialStatsCard';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  // Mock Data
  const student = {
    name: "Anjali Singh",
    currentClass: "Class 12",
    targetExams: ["NEET"]
  };

  const notices = [
    { id: 1, title: "Diwali Vacation Schedule", date: "15 Oct 2025" },
    { id: 2, title: "Physics Guest Lecture by Dr. Verma", date: "12 Oct 2025" },
  ];

  const navigate = useNavigate();

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

  return (
    <Box>
      {/* 1. Welcome Header */}
      <WelcomeCard elevation={3}>
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: -0.5 }}>
            Hello, {student.name}!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 0.5 }}>
            Stay focused. Your goal <strong>{student.targetExams[0]}</strong> is closer than you think.
          </Typography>
        </Box>
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
        {/* Exam Countdown */}
        <Box flex={1}>
          <CountdownCard elevation={0}>
            <HourglassEmptyIcon sx={{ fontSize: 40, mb: 1, opacity: 0.8 }} />
            <Typography variant="h3" fontWeight={800}>142</Typography>
            <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', letterSpacing: 1, opacity: 0.9 }}>
              Days to NEET 2026
            </Typography>
          </CountdownCard>
        </Box>

        {/* Quick Actions */}
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
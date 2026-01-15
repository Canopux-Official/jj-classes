import { styled } from '@mui/material/styles';
import { Paper, Box, Button } from '@mui/material';

// 1. Welcome Card (Cleaned up)
export const WelcomeCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #004d40 100%)`, // Dark Teal Gradient
  color: theme.palette.common.white,
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  marginBottom: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // Decorative circle
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -60,
    right: -20,
    width: 200,
    height: 200,
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)', 
  }
}));

// 2. General Info Card (Used for Materials, Notices)
export const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  height: '100%',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
}));

// 3. Exam Countdown Card
export const CountdownCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)`, // Green Gradient
  color: 'white',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)',
}));

// 4. Quick Action Button (Icon + Text)
export const QuickActionButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  backgroundColor: '#f8f9fa',
  textTransform: 'none',
  height: '100%',
  width: '100%',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#e8f5e9', // Light green hover
    borderColor: '#66bb6a',
    transform: 'translateY(-2px)',
  },
}));

// 5. Quote Section
export const QuoteBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#fff3e0', // Light Orange/Gold tint
  borderRadius: theme.shape.borderRadius,
  borderLeft: `4px solid #ffb74d`,
  fontStyle: 'italic',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
}));

export const NoticePreview = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f8fcf8', 
  borderRadius: theme.shape.borderRadius,
  borderLeft: `4px solid #66bb6a`, 
  marginBottom: theme.spacing(2),
}));
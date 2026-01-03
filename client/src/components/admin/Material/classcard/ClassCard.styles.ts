// components/ClassCard/ClassCard.styles.ts
import { styled } from '@mui/material/styles';
import { Box, Card, Chip } from '@mui/material';

export const StyledClassCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: '1px solid #e8eaed',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    borderColor: '#1976d2',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
  },
}));

export const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2.5),
  gap: theme.spacing(2),
}));

export const IconWrapper = styled(Box)(() => ({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: '#e3f2fd',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  '& .MuiSvgIcon-root': {
    fontSize: '28px',
    color: '#1976d2',
  },
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export const DetailsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(2),
}));

export const DetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  color: '#5f6368',
  fontSize: '0.9rem',
  '& .MuiSvgIcon-root': {
    fontSize: '18px',
    color: '#80868b',
  },
}));

export const TagsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

export const TagChip = styled(Chip)(() => ({
  height: '26px',
  fontSize: '0.75rem',
  fontWeight: 500,
  borderRadius: '8px',
  backgroundColor: '#f1f3f4',
  color: '#3c4043',
  '&:hover': {
    backgroundColor: '#e8eaed',
  },
}));

export const CardFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2.5),
  paddingTop: theme.spacing(2),
  borderTop: '1px solid #e8eaed',
}));

export const StudentInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  color: '#5f6368',
  fontSize: '0.875rem',
  fontWeight: 500,
}));

export const StatusIndicator = styled(Box)<{ status: 'active' | 'inactive' | 'upcoming' }>(
  ({ theme, status }) => ({
    padding: theme.spacing(0.5, 1.5),
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    backgroundColor:
      status === 'active'
        ? '#e8f5e9'
        : status === 'upcoming'
        ? '#fff3e0'
        : '#f5f5f5',
    color:
      status === 'active'
        ? '#2e7d32'
        : status === 'upcoming'
        ? '#e65100'
        : '#616161',
  })
);
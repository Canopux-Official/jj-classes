import { styled } from '@mui/material/styles';
import { Card, Box, Chip } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    borderColor: '#1976d2',
  },
}));

export const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

export const IconWrapper = styled(Box)<{ type: string }>(({ theme, type }) => {
  const colors: Record<string, string> = {
    assignment: '#1976d2',
    quiz: '#9c27b0',
    video: '#f44336',
    material: '#4caf50',
  };

  return {
    width: 48,
    height: 48,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors[type]}15`,
    color: colors[type],
    marginRight: theme.spacing(2),
  };
});

export const StatusChip = styled(Chip)<{ status: string }>(({ status }) => {
  const statusColors: Record<string, { bg: string; color: string }> = {
    completed: { bg: '#e8f5e9', color: '#2e7d32' },
    pending: { bg: '#fff3e0', color: '#e65100' },
    overdue: { bg: '#ffebee', color: '#c62828' },
  };

  return {
    backgroundColor: statusColors[status].bg,
    color: statusColors[status].color,
    fontWeight: 600,
    fontSize: '0.75rem',
    height: '24px',
  };
});
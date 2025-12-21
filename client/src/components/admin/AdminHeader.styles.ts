import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

export const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0px 1px 10px rgba(0,0,0,0.05)',
  zIndex: theme.zIndex.drawer + 1,
  width: '100%',
  position: 'sticky',
  top: 0,
}));

export const HeaderContent = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0, 3),
  minHeight: '64px',
}));

export const ProfileSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '8px',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
});
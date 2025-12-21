import type { SxProps, Theme } from '@mui/material';

export const navbarStyles: Record<string, SxProps<Theme>> = {
  appBar: {
    background: 'rgba(255, 255, 255, 0.8)', // Glass effect
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    py: 1,
  },
  logo: {
    fontWeight: 800,
    background: 'linear-gradient(45deg, #0F2027 30%, #2C5364 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    cursor: 'pointer',
    letterSpacing: '-1px',
  },
  navLinks: {
    display: { xs: 'none', md: 'flex' },
    gap: 4,
  },
  linkItem: {
    color: 'text.primary',
    fontWeight: 600,
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      color: 'primary.main',
    },
  }
};
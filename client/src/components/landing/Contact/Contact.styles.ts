import type { SxProps, Theme } from '@mui/material';

export const contactStyles: Record<string, SxProps<Theme>> = {
  section: {
   py: { xs: 6, md: 10 },
    bgcolor: '#0b2021', // Dark Blue background for contrast
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    zIndex: 2,
  },
  // Left Side (Info)
  infoBox: {
    color: 'common.white',
    pr: { md: 6 },
    mb: { xs: 6, md: 0 },
  },
  title: {
    fontWeight: 800,
    mb: 2,
    background: 'linear-gradient(45deg, #FFD700 30%, #FF8E53 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 3,
    fontSize: '1.1rem',
    opacity: 0.9,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    bgcolor: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'secondary.main',
  },

  // Right Side (Form)
  formCard: {
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 4,
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  },
  formTitle: {
    fontWeight: 700,
    mb: 3,
    color: 'primary.main',
    textAlign: 'center',
  },
  submitBtn: {
    mt: 2,
    py: 1.5,
    fontWeight: 700,
    fontSize: '1rem',
    borderRadius: 2,
    textTransform: 'none',
  },
};
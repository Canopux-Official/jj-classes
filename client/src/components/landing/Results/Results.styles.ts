import type { SxProps, Theme } from '@mui/material';

export const resultStyles: Record<string, SxProps<Theme>> = {
  section: {
    py: { xs: 6, md: 8 },
    bgcolor: 'background.paper',
  },
  header: {
    textAlign: 'center',
    mb: 6,
  },
  imageCard: {
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    transition: 'transform 0.3s ease',
    bgcolor: '#f5f5f5', // Light grey background for the "empty" space if image is narrow
    height: '400px',    // FIXED HEIGHT to prevent scrolling
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain', // Ensures the whole image is visible inside the 400px box
    display: 'block',
  },
};
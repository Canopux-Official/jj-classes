import type { SxProps, Theme } from '@mui/material';

export const featureStyles: Record<string, SxProps<Theme>> = {
  section: {
    py: { xs: 6, md: 8 },
    bgcolor: 'background.default',
  },
  header: {
    textAlign: 'center',
    maxWidth: '700px',
    mx: 'auto',
    mb: 6,
  },
  card: {
    height: '100%', // Ensures all cards in a row match height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centers content horizontally (Icon & Text)
    justifyContent: 'flex-start', // text starts from top
    textAlign: 'center', // Centers the text itself
    p: 3,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
    border: '1px solid rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      borderColor: 'secondary.main',
    },
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: '16px',
    bgcolor: 'rgba(255, 215, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 2,
    color: 'secondary.dark',
  },
  cardTitle: {
    fontWeight: 700,
    fontSize: '1.1rem',
    mb: 1,
  },
  cardDesc: {
    fontSize: '0.9rem',
    color: 'text.secondary',
    lineHeight: 1.6,
  }
};
import type { SxProps, Theme } from '@mui/material';

export const facultyStyles: Record<string, SxProps<Theme>> = {
  section: {
    py: { xs: 6, md: 10 },
    bgcolor: 'background.default',
  },
  header: {
    textAlign: 'center',
    mb: 8,
    maxWidth: '800px',
    mx: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
    gap: 4,
  },
  card: {
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
    bgcolor: 'background.paper',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
      '& .faculty-overlay': {
        opacity: 1,
      }
    },
  },
  imageBox: {
    width: '100%',
    height: '320px',
    overflow: 'hidden',
    bgcolor: 'grey.200', // Placeholder color
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  info: {
    p: 3,
    textAlign: 'center',
    borderTop: '4px solid',
    borderColor: 'secondary.main',
  },
  subjectBadge: {
    display: 'inline-block',
    px: 1.5,
    py: 0.5,
    borderRadius: '4px',
    bgcolor: 'primary.light',
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: 600,
    mb: 1,
    letterSpacing: 0.5,
  }
};
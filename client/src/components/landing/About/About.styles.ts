import type { SxProps, Theme } from '@mui/material';

export const aboutStyles: Record<string, SxProps<Theme>> = {
  section: {
   py: { xs: 6, md: 8 },
    bgcolor: 'background.paper',
  },
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    gap: 6,
  },
  textContent: {
    flex: 1,
  },
  heading: {
    mb: 3,
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      width: '60px',
      height: '4px',
      bgcolor: 'secondary.main', // Gold underline
      marginTop: '16px',
      borderRadius: '2px',
    },
  },
  paragraph: {
    mb: 2,
    color: 'text.secondary',
    lineHeight: 1.8,
    fontSize: '1.05rem',
  },
  aimBox: {
    mt: 4,
    p: 3,
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    borderRadius: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    flex: 0.8,
    height: '400px',
    bgcolor: '#e0e0e0',
    borderRadius: 4,
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    backgroundImage: 'url("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
};
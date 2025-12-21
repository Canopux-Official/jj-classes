import type { SxProps, Theme } from '@mui/material';

export const heroStyles: Record<string, SxProps<Theme>> = {
  wrapper: {
   minHeight: { xs: 'auto', md: '90vh' },
   py: { xs: 8, md: 0 }, // Keeps the section tall and grand
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(255,255,255,0) 70%)',
    borderRadius: '50%',
    top: '-20%',
    right: '-10%', // Kept as a subtle background element
    zIndex: 0,
  },
  contentContainer: {
    zIndex: 1,
    textAlign: { xs: 'center', md: 'left' }, // Keeps text aligned left on desktop
  },
  title: {
    lineHeight: 1.2,
    mb: 2,
    color: 'primary.main',
  },
  highlight: {
    color: 'secondary.dark', // Uses the Gold/Dark Yellow from your theme
    display: 'inline-block',
  },
  subtitle: {
    color: 'text.secondary',
    mb: 4,
    maxWidth: { xs: '100%', md: '90%' },
    fontSize: '1.1rem',
    lineHeight: 1.6,
  },
  buttonGroup: {
    display: 'flex',
    gap: 2,
    justifyContent: { xs: 'center', md: 'flex-start' },
  },
};
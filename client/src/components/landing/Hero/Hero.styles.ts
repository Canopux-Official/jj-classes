import type { SxProps, Theme } from '@mui/material';

export const heroStyles: Record<string, SxProps<Theme>> = {
  wrapper: {
    minHeight: { xs: 'auto', md: '90vh' },
    py: { xs: 8, md: 0 }, // Keeps the section tall and grand
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #fbfdfcff 0%, #ebedee 100%)',
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
    color: '#064849',
  },
  highlight: {
    color: '#064849', // Uses the Gold/Dark Yellow from your theme
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
  // Carousel Styles
  carouselContainer: {
    width: { xs: '100%', md: '50%' },
    maxWidth: '500px',
    position: 'relative',
    mt: { xs: 6, md: 0 },
  },
  championCard: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    // Removed shadow and background to let the image blend with the section background
    transition: 'transform 0.4s ease',
    mx: 2,
    bgcolor: 'transparent',
    '&:hover': {
      transform: 'translateY(-8px)',
    },
  },
  championImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
    minHeight: '450px', // Taller to look grander
    objectFit: 'cover',
  },
  championOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)',
    padding: '60px 24px 32px',
    color: 'white',
    textAlign: 'left',
  },
  championTag: {
    position: 'absolute',
    top: 24,
    right: 24,
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#0D47A1', // Deep blue text
    padding: '8px 20px',
    borderRadius: '30px',
    fontWeight: 800,
    fontSize: '0.9rem',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    zIndex: 2,
    backdropFilter: 'blur(5px)',
  },
};
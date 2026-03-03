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
    // Changed from Gold to Teal/Cyan radial gradient
    background: 'radial-gradient(circle, rgba(0, 137, 123, 0.15) 0%, rgba(255,255,255,0) 70%)',
    borderRadius: '50%',
    top: '-20%',
    right: '-10%',
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
    width: { xs: '100%', md: '45%' }, // Slightly smaller to give text room
    maxWidth: '550px',
    position: 'relative',
    mt: { xs: 8, md: 0 },
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
    background: '#6404ffb1',
    color: 'white', // Deep blue text

    padding: '8px 20px',
    borderRadius: '30px',
    fontWeight: 1000,
    fontSize: '0.9rem',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    zIndex: 2,
    backdropFilter: 'blur(5px)',
  },
  // Add these to your heroStyles object
  carouselRelativeWrapper: {
    position: 'relative',
    p: { xs: 1, md: 4 },
  },

  championsLabel: {
    position: 'absolute',
    top: -20,
    left: { xs: '50%', md: 40 },
    transform: { xs: 'translateX(-50%)', md: 'none' },
    bgcolor: '#064849', // Your theme deep teal
    color: 'white',
    px: 3,
    py: 1,
    borderRadius: '4px',
    fontWeight: 800,
    letterSpacing: 1.5,
    fontSize: '0.85rem',
    zIndex: 10,
    boxShadow: '0 8px 20px rgba(6, 72, 73, 0.3)',
  },

  experienceBadge: {
    position: 'absolute',
    bottom: 60,
    right: -20,
    width: 100,
    height: 100,
    bgcolor: '#6404ffb1',
    color: 'white',
    borderRadius: '50%',
    display: { xs: 'none', lg: 'flex' },
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 11,
    border: '4px solid white',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },

  carouselGlassCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.7)',
    p: 2,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '& .slick-dots': {
      bottom: '-35px',
    },
    '& .slick-dots li button:before': {
      color: '#064849',
      fontSize: '12px',
    },
  }

 
};
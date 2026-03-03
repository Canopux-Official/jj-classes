import type { SxProps, Theme } from '@mui/material';

// Define the Keyframes for the scrolling animation
const marqueeKeyframes = {
  '@keyframes scroll': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' }, // Moves half the width
  },
};

export const resultStyles: Record<string, SxProps<Theme>> = {
  section: {
    py: { xs: 6, md: 8 },
    bgcolor: 'background.paper',
    overflow: 'hidden',
    ...marqueeKeyframes,
  },
  header: {
    textAlign: 'center',
    mb: 6,
  },
  // The Track Container
  marqueeWrapper: {
    display: 'flex',
    overflow: 'hidden',
    userSelect: 'none',
    width: '100%',
    // REMOVED: maskImage (fading effect)
  },
  // The Moving Track
  marqueeTrack: {
    display: 'flex',
    gap: '2rem',
    width: 'max-content',
    animation: 'scroll 20s linear infinite', // INCREASED SPEED (40s -> 20s)
    '&:hover': {
      animationPlayState: 'paused',
    },
    pl: '2rem',
  },
  // The Card Component
  imageCard: {
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
    height: '450px',
    width: '300px',
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
      '& .play-overlay': { opacity: 1 },
      '& .card-image': { transform: 'scale(1.05)' }
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  playOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    bgcolor: 'rgba(11, 32, 33, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
  },
  // Rank Badge
  rankBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    background: '#6404ffb1',
    color: '#fff',
    px: 2,
    py: 0.5,
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: 700,
    boxShadow: '0 4px 10px rgba(0, 137, 123, 0.3)',
    zIndex: 2,
  },
  nameTag: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    background: 'linear-gradient(to top, rgba(11,32,33,0.95) 0%, rgba(11,32,33,0) 100%)',
    p: 3,
    pt: 8,
    color: 'white',
    zIndex: 2,
  },
  // Modal Styles
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', md: '900px' },
    maxWidth: '95vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    outline: 'none',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    overflow: 'hidden',
    maxHeight: '90vh',
  },
  videoSection: {
    flex: { xs: 'none', md: '0 0 350px' },
    bgcolor: '#000',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsSection: {
    flex: 1,
    p: { xs: 3, md: 5 },
    overflowY: 'auto',
  }
};
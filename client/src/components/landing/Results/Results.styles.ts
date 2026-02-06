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
  // Carousel Specifics
  carouselWrapper: {
    mt: 6,
    '.slick-slide': {
      padding: '0 16px', // Increased gap
    },
    '.slick-track': {
      display: 'flex',
      alignItems: 'stretch',
    },
  },
  studentCard: {
    bgcolor: 'background.paper',
    borderRadius: 5, // Softer curves
    overflow: 'hidden',
    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)', // Softer, deeper shadow
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Bouncy effect
    height: '100%',
    position: 'relative',
    border: '1px solid rgba(0,0,0,0.05)',
    '&:hover': {
      transform: 'translateY(-12px)',
      boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
    },
  },
  studentImage: {
    width: '100%',
    height: '280px', // Taller image
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
    display: 'block',
  },
  cardContent: {
    p: 3,
    pt: 5, // Extra top padding for the rank badge
    textAlign: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  rankBadge: {
    position: 'absolute',
    top: -20,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', // Gold gradient
    color: '#fff',
    px: 3,
    py: 0.8,
    borderRadius: '50px',
    fontSize: '0.85rem',
    fontWeight: 800,
    boxShadow: '0 4px 10px rgba(255, 165, 0, 0.4)',
    zIndex: 2,
    whiteSpace: 'nowrap',
  },
  // Modal Styles
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', sm: '80%', md: '900px' },
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    overflow: 'hidden',
    maxHeight: { xs: '90vh', md: '80vh' },
  },
  videoContainer: {
    width: { xs: '100%', md: '40%' }, // 9:16 aspect ratio roughly maintained
    bgcolor: 'black',
    position: 'relative',
    minHeight: { xs: '300px', md: 'auto' },
  },
  detailsContainer: {
    width: { xs: '100%', md: '60%' },
    p: 4,
    overflowY: 'auto',
  },
};
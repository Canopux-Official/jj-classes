import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { heroStyles } from './Hero.styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={heroStyles.wrapper}>
      <Box sx={heroStyles.blob} />
      <Container maxWidth="lg">
        {/* Main Flex Container - Full Width */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          minHeight: '60vh',
          width: '100%', 
          py: { xs: 8, md: 0 }
        }}>
          
          {/* Content Wrapper - FORCED TO 100% WIDTH */}
          <Box sx={{ width: '100%' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              
              {/* Text Container */}
              <Box sx={{ 
                ...heroStyles.contentContainer,
                width: '100%',      // Force full width
                maxWidth: 'none',   // Remove any previous max-width limits
                textAlign: 'left'   // Keep text aligned left
              }}>
                
                <Typography variant="overline" sx={{ color: 'secondary.dark', fontWeight: 700, letterSpacing: 2 }}>
                  PREMIERE COACHING IN KORAPUT
                </Typography>
                
                {/* Title with increased size and full width */}
                <Typography variant="h1" sx={{ 
                  ...heroStyles.title, 
                  maxWidth: '100%', // Ensure title spans full width
                  fontSize: { xs: '2.5rem', md: '4.5rem' }, // Make it bigger since we have space
                  lineHeight: 1.1 
                }}>
                  Unlock Your Potential for <br />
                  <span style={heroStyles.highlight as React.CSSProperties}>JEE, NEET & Boards</span>
                </Typography>
                
                {/* Subtitle stretched */}
                <Typography variant="body1" sx={{ 
                  ...heroStyles.subtitle, 
                  maxWidth: '800px', // Allow subtitle to be wider
                  fontSize: '1.25rem'
                }}>
                  Join JJ Institue Of Science for a personalized learning experience. 
                  We provide expert faculty, modern facilities, and a rigorous academic 
                  environment to help you secure your future.
                </Typography>
                
                <Box sx={heroStyles.buttonGroup}>
                  <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={() => scrollToSection('contact')} sx={{ bgcolor: 'primary.main', px: 4, py: 1.5 }}>
                    Register Now
                  </Button>
                  <Button variant="outlined" size="large" onClick={() => navigate('/courses')} sx={{ borderColor: 'primary.main', color: 'primary.main', px: 4, py: 1.5 }}>
                    View Courses
                  </Button>
                </Box>

              </Box>
            </motion.div>
          </Box>
          
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { heroStyles } from './Hero.styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom'; // Import hook

const Hero = () => {
  const navigate = useNavigate(); // Initialize hook
  
  // Smooth Scroll Function (Only for Contact now)
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={heroStyles.wrapper}>
      <Box sx={heroStyles.blob} />

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          
          <Grid item xs={12} md={7}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Box sx={heroStyles.contentContainer}>
                <Typography variant="overline" sx={{ color: 'secondary.dark', fontWeight: 700, letterSpacing: 2 }}>
                  PREMIERE COACHING IN KORAPUT
                </Typography>
                <Typography variant="h1" sx={heroStyles.title}>
                  Unlock Your Potential for <br />
                  <span style={heroStyles.highlight as React.CSSProperties}>JEE, NEET & Boards</span>
                </Typography>
                <Typography variant="body1" sx={heroStyles.subtitle}>
                  Join JJ Classes for a personalized learning experience. 
                  We provide expert faculty, modern facilities, and a rigorous academic 
                  environment to help you secure your future.
                </Typography>
                
                <Box sx={heroStyles.buttonGroup}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => scrollToSection('contact')} 
                    sx={{ bgcolor: 'primary.main', px: 4, py: 1.5 }}
                  >
                    Register Now
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    // UPDATED ACTION: Navigate to /courses
                    onClick={() => navigate('/courses')} 
                    sx={{ borderColor: 'primary.main', color: 'primary.main', px: 4, py: 1.5 }}
                  >
                    View Courses
                  </Button>
                </Box>
              </Box>
            </motion.div>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
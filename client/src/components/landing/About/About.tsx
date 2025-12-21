import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { aboutStyles } from './About.styles';

const About = () => {
  return (
    <Box sx={aboutStyles.section} id="about">
      <Container maxWidth="lg" sx={aboutStyles.container}>
        
        {/* Left Side: Image */}
        <Box component={motion.div} 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             sx={aboutStyles.imagePlaceholder} 
        />

        {/* Right Side: Text */}
        <Box sx={aboutStyles.textContent}>
          <Typography variant="overline" color="secondary.main" fontWeight="bold" letterSpacing={1.5}>
            WHO WE ARE
          </Typography>
          <Typography variant="h3" sx={aboutStyles.heading}>
            Excellence in Education
          </Typography>
          
          <Typography variant="body1" sx={aboutStyles.paragraph}>
            Looking for high-quality CBSE Class 9 to 12, JEE, and NEET coaching in Koraput? 
            **JJ Classes** provides personalized coaching programs with experienced faculty. 
            Our modern facilities and updated study material ensure that our students receive 
            the best education possible.
          </Typography>

          {/* Special "AIM" Box */}
          <Box sx={aboutStyles.aimBox}>
            <Typography variant="h6" gutterBottom color="secondary.main">
              OUR AIM
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              To provide affordable and high-quality coaching for Boards and JEE aspirants. 
              We focus on the emotional well-being of students with consistent counselling 
              to help them face future challenges.
            </Typography>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default About;
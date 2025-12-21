import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar/Navbar'; // Reuse Navbar
import Footer from '../../components/landing/Footer/Footer'; // Reuse Footer

const CoursesPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <Box sx={{ flexGrow: 1, py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight={700} gutterBottom color="primary.main">
            Our Courses
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Explore our comprehensive coaching programs for JEE, NEET, and Boards.
          </Typography>
          
          <Box sx={{ 
            p: 6, 
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            textAlign: 'center', 
            border: '1px dashed grey',
            mt: 4 
          }}>
            <Typography variant="h5" color="text.secondary">
              Detailed Course Curriculum Coming Soon...
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 3 }} 
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default CoursesPage;
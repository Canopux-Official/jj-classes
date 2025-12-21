import Navbar from '../../components/landing/Navbar/Navbar';
import Hero from '../../components/landing/Hero/Hero';
import Results from '../../components/landing/Results/Results';
import About from '../../components/landing/About/About';
import Features from '../../components/landing/Features/Features';
import FAQ from '../../components/landing/FAQ/FAQ'; // Import FAQ
import Contact from '../../components/landing/Contact/Contact';
import Footer from '../../components/landing/Footer/Footer';
import { Box } from '@mui/material';

const LandingPage = () => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <Results />
      <About />
      <Features />
      <FAQ /> {/* Added Here */}
      <Contact />
      <Footer />
    </Box>
  );
};

export default LandingPage;
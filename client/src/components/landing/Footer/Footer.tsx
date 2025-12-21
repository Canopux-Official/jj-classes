import { Box, Container, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (type: 'scroll' | 'route', target: string) => {
    if (type === 'route') {
      navigate(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(target);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(target);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const footerLinks = [
    { label: 'About Us', target: 'about', type: 'scroll' },
    { label: 'Courses', target: '/courses', type: 'route' },
    { label: 'Results', target: 'results', type: 'scroll' },
    { label: 'Contact', target: 'contact', type: 'scroll' },
  ];

  return (
    <Box sx={{ bgcolor: '#0a192f', color: 'gray', py: 6, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <Container maxWidth="lg">
        {/* FLEX LAYOUT */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'space-between' }}>
          
          <Box sx={{ width: { xs: '100%', md: '35%' } }}>
            <Typography variant="h5" color="white" fontWeight={700} gutterBottom>JJ CLASSES</Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>Empowering students in Koraput to achieve their dreams.</Typography>
          </Box>

          <Box sx={{ width: { xs: '100%', md: '20%' } }}>
            <Typography variant="subtitle1" color="white" fontWeight={600} gutterBottom>Quick Links</Typography>
            {footerLinks.map((item) => (
              <Typography key={item.label} variant="body2" onClick={() => handleNavigation(item.type as 'scroll' | 'route', item.target)} sx={{ mb: 1, cursor: 'pointer', transition: 'color 0.2s', '&:hover': { color: 'secondary.main', textDecoration: 'underline' } }}>
                {item.label}
              </Typography>
            ))}
          </Box>

          <Box sx={{ width: { xs: '100%', md: '25%' } }}>
            <Typography variant="subtitle1" color="white" fontWeight={600} gutterBottom>Follow Us</Typography>
            <Box>
              <IconButton color="inherit" sx={{ '&:hover': { color: '#1877F2' } }}><FacebookIcon /></IconButton>
              <IconButton color="inherit" sx={{ '&:hover': { color: '#E4405F' } }}><InstagramIcon /></IconButton>
              <IconButton color="inherit" sx={{ '&:hover': { color: '#FF0000' } }}><YouTubeIcon /></IconButton>
            </Box>
          </Box>

        </Box>
        <Box sx={{ textAlign: 'center', mt: 6, pt: 3, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Typography variant="body2">&copy; {new Date().getFullYear()} JJ Classes. All Rights Reserved.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
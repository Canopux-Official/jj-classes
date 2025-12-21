// import { Box, Container, Typography, IconButton } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Footer = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleNavigation = (type: 'scroll' | 'route', target: string) => {
//     if (type === 'route') {
//       navigate(target);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else {
//       if (location.pathname !== '/') {
//         navigate('/');
//         setTimeout(() => {
//           const element = document.getElementById(target);
//           if (element) element.scrollIntoView({ behavior: 'smooth' });
//         }, 100);
//       } else {
//         const element = document.getElementById(target);
//         if (element) element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   };

//   const footerLinks = [
//     { label: 'About Us', target: 'about', type: 'scroll' },
//     { label: 'Courses', target: '/courses', type: 'route' },
//     { label: 'Results', target: 'results', type: 'scroll' },
//     { label: 'Contact', target: 'contact', type: 'scroll' },
//   ];

//   return (
//     <Box sx={{ bgcolor: '#0a192f', color: 'gray', py: 6, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
//       <Container maxWidth="lg">
//         {/* FLEX LAYOUT */}
//         <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'space-between' }}>
          
//           <Box sx={{ width: { xs: '100%', md: '35%' } }}>
//             <Typography variant="h5" color="white" fontWeight={700} gutterBottom>JJ Institute Of Science</Typography>
//             <Typography variant="body2" sx={{ lineHeight: 1.8 }}>Empowering students in Koraput to achieve their dreams.</Typography>
//           </Box>

//           <Box sx={{ width: { xs: '100%', md: '20%' } }}>
//             <Typography variant="subtitle1" color="white" fontWeight={600} gutterBottom>Quick Links</Typography>
//             {footerLinks.map((item) => (
//               <Typography key={item.label} variant="body2" onClick={() => handleNavigation(item.type as 'scroll' | 'route', item.target)} sx={{ mb: 1, cursor: 'pointer', transition: 'color 0.2s', '&:hover': { color: 'secondary.main', textDecoration: 'underline' } }}>
//                 {item.label}
//               </Typography>
//             ))}
//           </Box>

//           <Box sx={{ width: { xs: '100%', md: '25%' } }}>
//             <Typography variant="subtitle1" color="white" fontWeight={600} gutterBottom>Follow Us</Typography>
//             <Box>
//               <IconButton color="inherit" sx={{ '&:hover': { color: '#1877F2' } }}><FacebookIcon /></IconButton>
//               <IconButton color="inherit" sx={{ '&:hover': { color: '#E4405F' } }}><InstagramIcon /></IconButton>
//               <IconButton color="inherit" sx={{ '&:hover': { color: '#FF0000' } }}><YouTubeIcon /></IconButton>
//             </Box>
//           </Box>

//         </Box>
//         <Box sx={{ textAlign: 'center', mt: 6, pt: 3, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
//           <Typography variant="body2">&copy; {new Date().getFullYear()} JJ Institute Of Science. All Rights Reserved.</Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;



import { Box, Container, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate, useLocation } from 'react-router-dom';
import JIS from '../../../assets/logo/JIS Logo.png';

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
    <Box sx={{ 
      background: 'linear-gradient(135deg, #0c0f0f 0%, #0b0c0e 100%)', // Dark blue-gray gradient
      color: '#E8E8E8',
      py: 6
    }}>
      <Container maxWidth="lg">
        {/* FLEX LAYOUT */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'space-between' }}>
          
          <Box sx={{ width: { xs: '100%', md: '35%' } }}>
            {/* Logo and Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                component="img"
                src={JIS}
                alt="JJ Institute Logo"
                sx={{
                  height: '50px',
                  width: '50px',
                  objectFit: 'contain',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '8px',
                }}
              />
              <Typography variant="h5" color="#FFFFFF" fontWeight={700}>
                JJ Institute Of Science
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.8, color: '#C4C4C4' }}>
              Empowering students in Koraput to achieve their dreams.
            </Typography>
          </Box>

          <Box sx={{ width: { xs: '100%', md: '20%' } }}>
            <Typography variant="subtitle1" color="#FFFFFF" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            {footerLinks.map((item) => (
              <Typography 
                key={item.label} 
                variant="body2" 
                onClick={() => handleNavigation(item.type as 'scroll' | 'route', item.target)} 
                sx={{ 
                  mb: 1, 
                  cursor: 'pointer', 
                  color: '#C4C4C4',
                  transition: 'all 0.3s ease', 
                  '&:hover': { 
                    color: '#FFC857',
                    textDecoration: 'underline',
                    transform: 'translateX(5px)'
                  } 
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          <Box sx={{ width: { xs: '100%', md: '25%' } }}>
            <Typography variant="subtitle1" color="#FFFFFF" fontWeight={600} gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton 
                color="inherit" 
                sx={{ 
                  color: '#C4C4C4',
                  '&:hover': { 
                    color: '#1877F2',
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease'
                  } 
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                sx={{ 
                  color: '#C4C4C4',
                  '&:hover': { 
                    color: '#E4405F',
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease'
                  } 
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                sx={{ 
                  color: '#C4C4C4',
                  '&:hover': { 
                    color: '#FF0000',
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease'
                  } 
                }}
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Box>

        </Box>
        <Box sx={{ 
          textAlign: 'center', 
          mt: 6, 
          pt: 3, 
          borderTop: '1px solid rgba(255,255,255,0.1)' 
        }}>
          <Typography variant="body2" sx={{ color: '#C4C4C4' }}>
            &copy; {new Date().getFullYear()} JJ Institute Of Science. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
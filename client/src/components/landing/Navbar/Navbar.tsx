import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { navbarStyles } from './Navbar.styles';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoImg from '../../../assets/logo.jpeg'; 

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (type: 'scroll' | 'route', target: string) => {
    setMobileOpen(false);
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

  const navItems = [
    { label: 'About', target: 'about', type: 'scroll' },
    { label: 'Courses', target: '/courses', type: 'route' },
    { label: 'Why Us', target: 'features', type: 'scroll' },
    { label: 'Results', target: 'results', type: 'scroll' },
    { label: 'Contact', target: 'contact', type: 'scroll' },
  ];



  return (
    <>
      {/* 1. Changed position to 'fixed' */}
      <AppBar position="fixed" sx={{ ...navbarStyles.appBar, top: 0, left: 0, right: 0, zIndex: 1200 }} elevation={0}>
        <Container maxWidth="lg">
          <Toolbar sx={{ ...navbarStyles.toolbar, py: 1 }} disableGutters>
            
            <Box 
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 1.5, md: 2 }, 
                cursor: 'pointer',
                mr: 2
              }}
            >
              <img 
                src={LogoImg} 
                alt="JJ Institute" 
                style={{ height: 65, width: 'auto', display: 'block', objectFit: 'contain' }} 
              />
              <Typography 
                variant="h4" 
                sx={{ ...navbarStyles.logo, display: 'block', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' }, lineHeight: 1.2 }} 
              >
                JJ Institute Of Science
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
              {navItems.map((item) => (
                <Typography 
                  key={item.label} 
                  variant="body1" 
                  sx={{ ...navbarStyles.linkItem, cursor: 'pointer' }}
                  onClick={() => handleNavigation(item.type as 'scroll' | 'route', item.target)}
                >
                  {item.label}
                </Typography>
              ))}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/login')}
                sx={{ px: 4, borderRadius: '50px' }}
              >
                Login
              </Button>
            </Box>

            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, ml: 2, color: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>

          </Toolbar>
        </Container>
      </AppBar>

      {/* 2. Added Spacer: Prevents content from hiding behind the fixed navbar */}
      <Toolbar sx={{ py: 1 }} /> 
    </>
  );
};

export default Navbar;
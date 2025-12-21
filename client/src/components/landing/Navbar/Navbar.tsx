import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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

  const drawerContent = (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleDrawerToggle}>
           <CloseIcon />
        </IconButton>
      </Box>
      
      {/* Drawer Logo Area - Increased Size */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, my: 3 }}>
        <img src={LogoImg} alt="JJ Institute" style={{ height: 50 }} /> {/* Increased to 50px */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
           JJ Institute
        </Typography>
      </Box>
      
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton 
               sx={{ textAlign: 'center' }} 
               onClick={() => handleNavigation(item.type as 'scroll' | 'route', item.target)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2 }}>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={() => {
             setMobileOpen(false);
             navigate('/login');
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={navbarStyles.appBar} elevation={0}>
      <Container maxWidth="lg">
        {/* Added padding (py: 1) to accommodate larger logo */}
        <Toolbar sx={{ ...navbarStyles.toolbar, py: 1 }} disableGutters>
          
          {/* Logo Container */}
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
            {/* Logo Image - Increased Size */}
            <img 
              src={LogoImg} 
              alt="JJ Institute" 
              style={{ 
                height: 90, // Increased to 65px for better visibility
                width: 'auto',
                display: 'block',
                objectFit: 'contain'
              }} 
            />

            {/* Logo Text */}
            <Typography 
              variant="h4" 
              sx={{ 
                ...navbarStyles.logo, 
                display: 'block', 
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                lineHeight: 1.2
              }} 
            >
              JJ Institute Of Science
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Menu */}
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

          {/* Mobile Hamburger Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, ml: 2, color: 'primary.main' }}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 }, // Slightly wider drawer
        }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
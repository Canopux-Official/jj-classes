import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { navbarStyles } from './Navbar.styles';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile menu

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (type: 'scroll' | 'route', target: string) => {
    // Close mobile menu if open
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
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
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

  // Mobile Drawer Content
  const drawerContent = (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleDrawerToggle}>
           <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', color: 'primary.main' }}>
        JJ CLASSES
      </Typography>
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
        <Toolbar sx={navbarStyles.toolbar} disableGutters>
          
          {/* Logo */}
          <Typography 
            variant="h4" 
            sx={{ ...navbarStyles.logo, display: 'block', fontSize: { xs: '1.5rem', md: '2.125rem' } }} // Smaller logo on mobile
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            JJ CLASSES
          </Typography>

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

      {/* Mobile Drawer Implementation */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
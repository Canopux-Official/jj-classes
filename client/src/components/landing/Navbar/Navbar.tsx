import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { navbarStyles } from './Navbar.styles';
import { useNavigate, useLocation } from 'react-router-dom';
import JIS from '../../../assets/logo/JIS Logo.png';

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          my: 2
        }}
      >
        {/* Logo Image */}
        <Box
          component="img"
          src={JIS}  // Replace with your actual logo path
          alt="JJ Institute Logo"
          sx={{
            height: '60px',
            width: '60px',
            objectFit: 'contain',
          }}
        />

        {/* Logo Text */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#066466',  // Teal color to match navbar
            textAlign: 'center'
          }}
        >
          JJ Institute Of Science
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
        <Toolbar sx={navbarStyles.toolbar} disableGutters>

          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, md: 2 },
              cursor: 'pointer'
            }}
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {/* Logo Image */}
            <Box
              component="img"
              src={JIS}  // Replace with your actual logo path
              alt="JJ Institute Logo"
              sx={{
                height: { xs: '40px', md: '50px' },
                width: { xs: '40px', md: '50px' },
                objectFit: 'contain',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />

            {/* Logo Text */}
            <Typography
              variant="h4"
              sx={{
                ...navbarStyles.logo,
                display: 'block',
                fontSize: { xs: '0.9rem', md: '2.012rem' }  // Slightly smaller on mobile
              }}
            >
              JJ Institute of Science
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
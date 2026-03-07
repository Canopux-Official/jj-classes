import { useState, useEffect } from 'react'
import {
  AppBar, Toolbar, Box, Typography, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  useTheme, useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import LogoImg from '../../assets/logo.jpeg'; 
import { useNavigate } from 'react-router-dom'


const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Courses', href: '#courses' },
  { label: 'Result', href: '#results' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Contact', href: '#footer' },
]

function smoothScrollTo(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 2 : 0}
        sx={{
          bgcolor: scrolled ? 'background.paper' : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(8px)',
          borderBottom: scrolled ? '1px solid' : 'none',
          borderColor: 'divider',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={LogoImg}
                alt="JJ Institute Logo"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ color: 'primary.main', fontFamily: 'Montserrat', fontWeight: 700, display: { xs: 'none', sm: 'block' } }}
            >
              JJ Institute Of Science
            </Typography>
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {navItems.map((item) => (
                <Typography
                  key={item.href}
                  onClick={() => smoothScrollTo(item.href)}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    userSelect: 'none',
                    '&:hover': { color: '#063f26' },
                    transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                </Typography>
              ))}
              <Button variant="contained" size="medium" sx={{ px: 3, bgcolor: "#063f26" }} onClick={() => navigate('/login')}>
                Login
              </Button>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton onClick={() => setMobileOpen(true)} color="inherit" sx={{ color: 'text.primary' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }}>
          {/* Drawer Header: Logo + Close Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component="img"
                  src={LogoImg}
                  alt="JJ Institute Logo"
                  sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ color: 'primary.main', fontFamily: 'Montserrat', fontWeight: 700, fontSize: 13 }}
              >
                JJ Institute Of Science
              </Typography>
            </Box>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  onClick={() => { smoothScrollTo(item.href); setMobileOpen(false) }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontFamily: 'Roboto', fontSize: 15 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem sx={{ mt: 2, px: 2 }}>
              <Button onClick={() => navigate('/login')} variant="contained" sx={{ bgcolor: "#063f26" }} fullWidth>
                Login
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}
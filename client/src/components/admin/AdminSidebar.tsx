import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PaymentIcon from '@mui/icons-material/Payment';
import { LogoContainer, drawerPaperStyles } from './AdminSidebar.styles';
import LogoImg from '../../assets/logo.jpeg';
interface AdminSidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const DRAWER_WIDTH = 260;

const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Students', icon: <PeopleIcon />, path: '/admin/students' },
    { text: 'Subjects', icon: <LibraryBooksIcon />, path: '/admin/subjects' },
    { text: 'Session Manager', icon: <SettingsSuggestIcon />, path: '/admin/session' },
    { text: 'Fees & Payments', icon: <PaymentIcon />, path: '/admin/fees' },
  ];

  // Common content for both drawers
  const drawerContent = (
    <>
      <LogoContainer><Box display="flex" alignItems="center" gap={1}>
          <img src={LogoImg} alt="JJ Institute" style={{ height: 32, width: 'auto' }} />
          <Typography variant="subtitle1" fontWeight={800} lineHeight={1.2}>
            JJ INSTITUTE <br/>
            <span style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.8 }}>OF SCIENCE</span>
          </Typography>
        </Box></LogoContainer>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  // Close drawer on mobile when a link is clicked
                  if (mobileOpen) handleDrawerToggle(); 
                }}
                sx={{
                  minHeight: 56,
                  px: 3,
                  borderLeft: isActive ? `4px solid #FFD700` : '4px solid transparent',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 2, justifyContent: 'center', color: isActive ? '#FFD700' : '#ffffff' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive ? 600 : 400 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );

  return (
    <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
      
      {/* 1. MOBILE DRAWER (Temporary) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile
        sx={{
          display: { xs: 'block', sm: 'none' }, // Show on Mobile, Hide on Desktop
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: DRAWER_WIDTH,
            ...drawerPaperStyles // Import styles
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* 2. DESKTOP DRAWER (Permanent) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' }, // Hide on Mobile, Show on Desktop
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: DRAWER_WIDTH,
            ...drawerPaperStyles // Import styles
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default AdminSidebar;
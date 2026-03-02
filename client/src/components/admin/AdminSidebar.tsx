import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer, Box, Typography } from '@mui/material';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SchoolIcon from '@mui/icons-material/School'; // For Streams
import QuizIcon from '@mui/icons-material/Quiz';     // For Target Exams
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PushPinIcon from '@mui/icons-material/PushPin';

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
    { text: 'Students Directory', icon: <PeopleIcon />, path: '/admin/students' },
    
    // Academic Configuration Group
    { text: 'Streams Manager', icon: <SchoolIcon />, path: '/admin/streams' },
    { text: 'Target Exams Manager', icon: <QuizIcon />, path: '/admin/target-exams' },
    { text: 'Subjects Manager', icon: <LibraryBooksIcon />, path: '/admin/subjects' },
    
    // Management Group
    { text: 'Session Manager', icon: <SettingsSuggestIcon />, path: '/admin/session' },
    { text: 'Upload Material', icon: <UploadFileIcon />, path: '/admin/upload' },
    { text: 'Add Notice', icon: <PushPinIcon />, path: '/admin/notice' },

    { text: 'Attendance', icon: <EditCalendarIcon />, path: '/admin/attendance' },
  ];

  // Common content for both drawers
  const drawerContent = (
    <>
      <LogoContainer>
        <Box display="flex" alignItems="center" gap={2}>
          {/* Logo with Round White Background */}
          <Box
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '50%',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(6, 100, 102, 0.15)',
              width: '48px',
              height: '48px',
            }}
          >
            <img
              src={LogoImg}
              alt="JJ Institute"
              style={{
                height: '32px',
                width: '32px',
                objectFit: 'contain'
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="subtitle1"
            fontWeight={800}
            lineHeight={1.2}
            sx={{
              color: 'white',
            }}
          >
            JJ INSTITUTE <br />
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#b4acacff',
              letterSpacing: '0.5px'
            }}>
              OF SCIENCE
            </span>
          </Typography>
        </Box>
      </LogoContainer>
      
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
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
        ModalProps={{ keepMounted: true }} 
        sx={{
          display: { xs: 'block', sm: 'none' }, 
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            ...drawerPaperStyles 
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* 2. DESKTOP DRAWER (Permanent) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' }, 
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            ...drawerPaperStyles 
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
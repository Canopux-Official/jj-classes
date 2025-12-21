import React from 'react';
import { Typography, IconButton, Avatar, Box, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { StyledAppBar, HeaderContent, ProfileSection } from './AdminHeader.styles';

interface AdminHeaderProps {
  handleDrawerToggle: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ handleDrawerToggle }) => {
  return (
    <StyledAppBar position="sticky" elevation={0}>
      <HeaderContent>
        <Box display="flex" alignItems="center">
          {/* MOBILE TOGGLE BUTTON */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }} // Hide on Desktop (sm and up)
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Dashboard
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
          
          <ProfileSection>
            {/* Hide text on mobile to save space */}
            <Box textAlign="right" sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="subtitle2" fontWeight="700">Admin User</Typography>
              <Typography variant="caption" color="text.secondary">JJ Classes</Typography>
            </Box>
            <Avatar 
              sx={{ 
                bgcolor: 'secondary.main', 
                color: 'secondary.contrastText', 
                width: { xs: 32, sm: 40 }, 
                height: { xs: 32, sm: 40 },
                fontSize: { xs: '0.9rem', sm: '1.2rem' }
              }}
            >
              JJ
            </Avatar>
          </ProfileSection>
        </Box>
      </HeaderContent>
    </StyledAppBar>
  );
};

export default AdminHeader;
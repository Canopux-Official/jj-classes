import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { LayoutRoot, MainContent, ContentWrapper } from './AdminDashboard.styles';

// Internal Components
import AdminSidebar from '../../components/admin/AdminSidebar'; 
import AdminHeader from '../../components/admin/AdminHeader';

// Page Components
import DashboardHome from './DashboardHome';
import StudentsPage from '../../components/admin/StudentPage';
import SubjectsPage from './../../components/admin/SubjectPage';
import SessionPage from '../../components/admin/SessionPage';

const DRAWER_WIDTH = 260; 

const AdminDashboard: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <LayoutRoot>
      <CssBaseline />
      
      {/* Sidebar Wrapper */}
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <AdminSidebar 
          mobileOpen={mobileOpen} 
          handleDrawerToggle={handleDrawerToggle} 
        />
      </Box>

      {/* Main Content Area */}
      <MainContent>
        <AdminHeader handleDrawerToggle={handleDrawerToggle} />
        
        {/* FIX: Removed component="main" prop here */}
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="subjects" element={<SubjectsPage />} />
            <Route path="session" element={<SessionPage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </ContentWrapper>
      </MainContent>
    </LayoutRoot>
  );
};

export default AdminDashboard;
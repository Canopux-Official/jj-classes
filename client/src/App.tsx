import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';

// Import Pages
import LandingPage from './pages/landing/LandingPage';
import CoursesPage from './pages/courses/CoursesPage';
import LoginPage from './pages/auth/LoginPage';

// Import Dashboard Layouts
import AdminDashboard from './pages/admin/AdminDashboard';

// Placeholder for Student Dashboard (or import it if you have created the file)
// If you haven't created the file yet, keep this placeholder:
// const StudentDashboard = () => <h1>Student Dashboard</h1>;
// Assuming the file exists based on your structure:
import StudentDashboard from './pages/student/StudentDashboard'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes 
              The '/*' is crucial here because AdminDashboard has its own nested <Routes> 
          */}
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/student/*" element={<StudentDashboard />} />

          {/* 404 Handler */}
          <Route path="*" element={<h1 style={{textAlign:'center', marginTop:'50px'}}>404: Page Not Found</h1>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
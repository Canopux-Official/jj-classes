import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';

// Import Pages
import LandingPage from './pages/landing/LandingPage';
import CoursesPage from './pages/courses/CoursesPage';
import LoginPage from './pages/auth/LoginPage'; // IMPORT THE NEW PAGE

// Placeholder Components (We will build these next)
const AdminDashboard = () => <h1>Admin Dashboard</h1>;
const StudentDashboard = () => <h1>Student Dashboard</h1>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          
          {/* This now points to the real Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
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
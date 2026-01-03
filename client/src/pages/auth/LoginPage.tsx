import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  MenuItem,
  Collapse
} from '@mui/material';
import { loginStyles } from './LoginPage.styles';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Icon for timer
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import JIS from '../../assets/logo/JIS Logo.png';

// Import functions from your API file
import { getLoggedInUser, verifyOtp, resendOtp } from '../../api/apiFunctions';

const LoginPage = () => {
  const navigate = useNavigate();

  // State Management
  const [step, setStep] = useState<'FORM' | 'OTP'>('FORM');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState('');
  
  // Timer State
  const [timer, setTimer] = useState(90); // 90 seconds cooldown
  const [canResend, setCanResend] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phoneNumber: '',
    currentClass: '',
    password: ''
  });

  const [otp, setOtp] = useState('');

  // --- ADMIN LOGIC ---
  const ADMIN_PHONE = import.meta.env.VITE_ADMIN_PHONE;
  const isAdmin = formData.phoneNumber === ADMIN_PHONE;

  // --- TIMER LOGIC ---
// --- TIMER LOGIC ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (step === 'OTP' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      if(interval) clearInterval(interval);
    }
    
    // Cleanup function
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handle Input Change
  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  // Step 1: Handle Initial Login Submission
  const handleLoginSubmit = async () => {
    const { name, dob, phoneNumber, currentClass, password } = formData;
    
    if (phoneNumber.length < 10) return alert('Please enter a valid phone number');
    if (!password) return alert('Password is required');

    if (!isAdmin) {
      if (!name || !dob || !currentClass) {
        return alert('All fields are compulsory for students.');
      }
    }

    setLoading(true);

    try {
      const response = await getLoggedInUser(formData);
      if (!response.success || !response.data) {
        setLoading(false);
        return alert(response.message || 'Login failed');
      }

      const responseData = response.data as { email?: string | null, authToken?: string | null};
      const authToken = responseData.authToken;
      const email = responseData.email;

      if (email && !authToken) {
        const atIndex = email.indexOf("@");
        const visibleStart = email.substring(0, 2);
        const visibleEnd = email.substring(atIndex - 2);
        setMaskedEmail(`${visibleStart}****${visibleEnd}`);

        // Reset Timer for new OTP
        setTimer(90);
        setCanResend(false);
        
        setLoading(false);
        setStep('OTP'); 
      } 
      else if (authToken) {
        localStorage.setItem('authToken', authToken); 
        setLoading(false);
        if (isAdmin) {
          navigate('/admin/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      } 
      else {
        setLoading(false);
        alert("Unexpected login state. Please contact support.");
      }

    } catch (err) {
      setLoading(false);
      console.error(err);
      alert('An unexpected error occurred');
    }
  };

  // Step 2: Handle OTP Verification
  const handleVerifyOtp = async () => {
    if (otp.length < 6) return alert('Please enter the full 6-digit OTP');
    setLoading(true);

    try {
      const email = localStorage.getItem('authEmail') || '';
      if(!email) {
          alert("Session expired. Please login again.");
          setStep('FORM');
          return;
      }

      const response = await verifyOtp({ email, otp });

      setLoading(false);

      if (response.success) {
        if (isAdmin) {
          navigate('/admin/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      } else {
        alert(response.message || 'Invalid OTP');
      }
    } catch {
      setLoading(false);
      alert('Error verifying OTP');
    }
  };

  // Step 3: Handle Resend OTP
  const handleResendOtp = async () => {
      setLoading(true);
      try {
          const email = localStorage.getItem('authEmail');
          if (!email) {
              alert("Email not found. Please try logging in again.");
              setStep('FORM');
              return;
          }

          const response = await resendOtp({ email });
          
          if (response.success) {
              alert("OTP Resent successfully!");
              setTimer(90); // Reset timer
              setCanResend(false);
          } else {
              alert(response.message || "Failed to resend OTP");
          }
      } catch (error) {
          console.error(error);
          alert("Error resending OTP");
      } finally {
          setLoading(false);
      }
  };

  return (
    <Box sx={loginStyles.container}>
      {/* LEFT SECTION */}
      <Box sx={loginStyles.leftSection}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{
              mb: 4,
              backgroundColor: '#FFFFFF',
              borderRadius: '50%',
              padding: '30px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Box
                component="img"
                src={JIS}
                alt="JJ Institute Logo"
                sx={{
                  height: { xs: '100px', md: '140px' },
                  width: { xs: '100px', md: '140px' },
                  objectFit: 'contain',
                }}
              />
            </Box>

            <Typography variant="h1" sx={loginStyles.welcomeText}>
              JJ Institute Of Science
            </Typography>

            <Typography variant="h6" sx={loginStyles.subText}>
              The path to excellence in <br />
              <span style={{ color: '#FFD700', fontWeight: 'bold' }}>JEE, NEET & Boards.</span>
            </Typography>
          </Box>
        </motion.div>
      </Box>

      {/* RIGHT SECTION */}
      <Box sx={loginStyles.rightSection}>
        <Box sx={loginStyles.formBox}>
          <Typography variant="h4" sx={loginStyles.brandLogo} onClick={() => navigate('/')}>
            JJ Institute Of Science
          </Typography>

          {/* Dynamic Title based on Admin State */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
            {isAdmin && <AdminPanelSettingsIcon color="primary" fontSize="large" />}
            <Typography variant="h5" fontWeight={700}>
              {isAdmin ? 'Admin Access Portal' : 'Student Portal'}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {step === 'FORM'
              ? (isAdmin ? 'Please verify credentials to continue' : 'Please enter your details to login')
              : `Enter the OTP sent to registered email ${maskedEmail}`
            }
          </Typography>

          <AnimatePresence mode='wait'>
            {step === 'FORM' ? (
              <motion.div
                key="form-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* 1. PHONE FIELD */}
                <TextField
                  fullWidth
                  label="Phone Number"
                  placeholder="9876543210"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  sx={loginStyles.inputField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {isAdmin ? <AdminPanelSettingsIcon color="primary" sx={{ mr: 0.5 }} /> : <PhoneIphoneIcon color="action" sx={{ mr: 0.5 }} />}
                        <Typography variant="body1" color="text.secondary" fontWeight="bold">+91</Typography>
                      </InputAdornment>
                    )
                  }}
                />

                {/* 2. STUDENT SPECIFIC FIELDS */}
                <Collapse in={!isAdmin}>
                  <Box>
                    <TextField
                      fullWidth
                      label="Full Name"
                      placeholder="Full Name as per Records"
                      value={formData.name}
                      onChange={handleChange('name')}
                      sx={loginStyles.inputField}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      type="date"
                      label="Date of Birth"
                      value={formData.dob}
                      onChange={handleChange('dob')}
                      sx={loginStyles.inputField}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      select
                      fullWidth
                      label="Class"
                      value={formData.currentClass}
                      onChange={handleChange('currentClass')}
                      sx={{ ...loginStyles.inputField, textAlign: 'left' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SchoolIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {['Class 9', 'Class 10', 'Class 11', 'Class 12', 'JEE Mains', 'JEE Advanced'].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Collapse>

                {/* 3. PASSWORD FIELD */}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange('password')}
                  sx={loginStyles.inputField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleLoginSubmit}
                  disabled={loading}
                  sx={{
                    ...loginStyles.actionBtn,
                    backgroundColor: isAdmin ? '#000000' : undefined
                  }}
                >
                  {loading ? 'Checking...' : (isAdmin ? 'Verify & Send OTP' : 'Secure Login')}
                </Button>
              </motion.div>
            ) : (
              // OTP STEP
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <TextField
                  fullWidth
                  label="One Time Password"
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  sx={loginStyles.inputField}
                  type="password"
                  inputProps={{ style: { letterSpacing: 8, textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><VpnKeyIcon color="primary" /></InputAdornment>,
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  sx={loginStyles.actionBtn}
                >
                  {loading ? 'Verifying...' : 'Verify & Enter'}
                </Button>

                {/* TIMER & RESEND LOGIC */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2 }}>
                    {!canResend ? (
                        <>
                            <AccessTimeIcon fontSize="small" color="disabled" />
                            <Typography variant="body2" color="text.secondary">
                                Resend OTP in <b>{formatTime(timer)}</b>
                            </Typography>
                        </>
                    ) : (
                        <Typography
                            onClick={handleResendOtp}
                            sx={{
                                cursor: 'pointer',
                                color: 'primary.main',
                                fontWeight: 600,
                                textDecoration: 'underline',
                                '&:hover': { color: 'primary.dark' }
                            }}
                        >
                            Resend OTP
                        </Typography>
                    )}
                </Box>

                <Typography
                  onClick={() => setStep('FORM')}
                  sx={{
                    cursor: 'pointer',
                    color: 'text.secondary',
                    fontSize: '0.85rem',
                    textDecoration: 'underline',
                    mt: 2
                  }}
                >
                  Incorrect details? Go back
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>

          <Box onClick={() => navigate('/')} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, ...loginStyles.backLink, mt: 4 }}>
            <ArrowBackIcon fontSize="inherit" /> Back to Website
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
import { useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { loginStyles } from './LoginPage.styles';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (phone.length < 10) return alert('Please enter a valid phone number');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('OTP');
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) return alert('Please enter the OTP');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isAdmin = phone === '9999999999'; 
      if (isAdmin) navigate('/admin/dashboard');
      else navigate('/student/dashboard');
    }, 1000);
  };

  return (
    <Box sx={loginStyles.container}>
      
      {/* LEFT SIDE: JJ Classes Branding */}
      <Box sx={loginStyles.leftSection}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          
          {/* FIX: Added this Box container to enforce centering */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            <Box sx={{ mb: 4 }}>
               <SchoolIcon sx={{ fontSize: 80, color: 'secondary.main', opacity: 0.8 }} />
            </Box>
            
            <Typography variant="h1" sx={loginStyles.welcomeText}>
              JJ CLASSES
            </Typography>
            
            <Typography variant="h6" sx={loginStyles.subText}>
              The path to excellence in <br /> 
              <span style={{ color: '#FFD700', fontWeight: 'bold' }}>JEE, NEET & Boards.</span>
            </Typography>

          </Box>
          {/* End of centering Box */}

        </motion.div>
      </Box>

      {/* RIGHT SIDE: Login Form (No changes here) */}
      <Box sx={loginStyles.rightSection}>
        <Box sx={loginStyles.formBox}>
          <Typography 
             variant="h4" 
             sx={loginStyles.brandLogo}
             onClick={() => navigate('/')}
          >
            JJ CLASSES
          </Typography>

          <Typography variant="h5" fontWeight={700} gutterBottom>
            Portal Login
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
            {step === 'PHONE' 
              ? 'Login with your registered mobile number' 
              : `Enter the 4-digit OTP sent to +91 ${phone}`}
          </Typography>

          <AnimatePresence mode='wait'>
            {step === 'PHONE' ? (
              <motion.div 
                key="phone-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={loginStyles.inputField}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PhoneIphoneIcon color="primary"/></InputAdornment>,
                    startAdornment: <InputAdornment position="start" sx={{mr: 1}}>+91</InputAdornment>
                  }}
                />
                <Button 
                  fullWidth 
                  variant="contained" 
                  size="large" 
                  onClick={handleSendOtp}
                  disabled={loading}
                  sx={loginStyles.actionBtn}
                >
                  {loading ? 'Sending...' : 'Continue'}
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <TextField
                  fullWidth
                  label="One Time Password"
                  placeholder="• • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  sx={loginStyles.inputField}
                  type="password"
                  inputProps={{ style: { letterSpacing: 8, textAlign: 'center', fontWeight: 'bold' } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><VpnKeyIcon color="primary"/></InputAdornment>,
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
                  {loading ? 'Verifying...' : 'Login'}
                </Button>
                
                <Typography 
                  onClick={() => setStep('PHONE')}
                  sx={{ cursor: 'pointer', color: 'text.secondary', fontSize: '0.85rem', textDecoration: 'underline' }}
                >
                  Entered wrong number? Go back
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>

          <Box 
            onClick={() => navigate('/')} 
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, ...loginStyles.backLink, mt: 4 }}
          >
            <ArrowBackIcon fontSize="inherit" /> Back to Website
          </Box>

        </Box>
      </Box>

    </Box>
  );
};

export default LoginPage;
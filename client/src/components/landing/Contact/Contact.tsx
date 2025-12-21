import { useState } from 'react';
import { 
  Box, Container, Grid, Typography, TextField, Button, 
  MenuItem, FormGroup, FormControlLabel, Checkbox, Stack 
} from '@mui/material';
import { contactStyles } from './Contact.styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

const classes = ['9', '10', '11', '12', 'Dropper'];
const exams = ['JEE', 'NEET', 'Boards'];

const Contact = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    targetClass: '',
    message: '',
    interestedExams: [] as string[]
  });

  // Handle Text Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Checkbox Change (For JEE/NEET/Boards)
  const handleExamChange = (exam: string) => {
    setFormData(prev => {
      const current = prev.interestedExams;
      if (current.includes(exam)) {
        return { ...prev, interestedExams: current.filter(e => e !== exam) };
      } else {
        return { ...prev, interestedExams: [...current, exam] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you! We will contact you shortly.');
    // Here you will later connect the API call to /api/enquiry
  };

  return (
    <Box sx={contactStyles.section} id="contact">
      <Container maxWidth="lg" sx={contactStyles.container}>
        <Grid container alignItems="center">
          
          {/* Left Side: Contact Info */}
          <Grid item xs={12} md={6}>
            <Box sx={contactStyles.infoBox}>
              <Typography variant="overline" color="secondary.main" fontWeight={700} letterSpacing={2}>
                GET IN TOUCH
              </Typography>
              <Typography variant="h3" sx={contactStyles.title}>
                Start Your Journey <br /> With JJ Classes
              </Typography>
              <Typography variant="body1" sx={{ mb: 5, maxWidth: '90%', lineHeight: 1.8 }}>
                Visit our center in Koraput for a free counseling session. 
                We are here to answer all your queries regarding admissions, 
                batches, and scholarship tests.
              </Typography>

              <Box sx={contactStyles.contactItem}>
                <Box sx={contactStyles.iconCircle}><LocationOnIcon /></Box>
                <Typography>Koraput, Odisha - 764020</Typography>
              </Box>
              <Box sx={contactStyles.contactItem}>
                <Box sx={contactStyles.iconCircle}><PhoneIcon /></Box>
                <Typography>+91 98765 43210</Typography>
              </Box>
              <Box sx={contactStyles.contactItem}>
                <Box sx={contactStyles.iconCircle}><EmailIcon /></Box>
                <Typography>admissions@jjclasses.com</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Side: Enquiry Form */}
          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={handleSubmit} sx={contactStyles.formCard}>
              <Typography variant="h5" sx={contactStyles.formTitle}>
                Book a Free Demo Class
              </Typography>

              <Stack spacing={2}>
                <TextField 
                  label="Student Name" 
                  name="name" 
                  fullWidth 
                  required 
                  variant="outlined" 
                  value={formData.name}
                  onChange={handleChange}
                />
                
                <TextField 
                  label="Phone Number" 
                  name="phone" 
                  type="tel"
                  fullWidth 
                  required 
                  variant="outlined" 
                  value={formData.phone}
                  onChange={handleChange}
                />

                <TextField
                  select
                  label="Select Class"
                  name="targetClass"
                  fullWidth
                  required
                  value={formData.targetClass}
                  onChange={handleChange}
                >
                  {classes.map((option) => (
                    <MenuItem key={option} value={option}>Class {option}</MenuItem>
                  ))}
                </TextField>

                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Interested In (Select all that apply):
                  </Typography>
                  <FormGroup row>
                    {exams.map((exam) => (
                      <FormControlLabel 
                        key={exam}
                        control={
                          <Checkbox 
                            checked={formData.interestedExams.includes(exam)}
                            onChange={() => handleExamChange(exam)}
                            color="secondary"
                          />
                        } 
                        label={exam} 
                      />
                    ))}
                  </FormGroup>
                </Box>

                <TextField 
                  label="Any Questions?" 
                  name="message" 
                  multiline 
                  rows={3} 
                  fullWidth 
                  value={formData.message}
                  onChange={handleChange}
                />

                <Button 
                  type="submit" 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  endIcon={<SendIcon />}
                  sx={contactStyles.submitBtn}
                >
                  Submit Enquiry
                </Button>
              </Stack>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
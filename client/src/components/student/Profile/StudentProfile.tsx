/* eslint-disable react-hooks/purity */
import React, { useState } from 'react';
import { Typography, Avatar, Button, TextField, Box, Stack,  Chip, Divider } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import EditIcon from '@mui/icons-material/Edit';
import { ProfileHeader, SectionCard, LabelText, ValueText, Badge, ActionButton } from './StudentProfile.styles';

const StudentProfile: React.FC = () => {
  // Mock Data (Mirroring IStudent interface)
  const student = {
    name: "Anjali Singh",
    dob: "2006-08-15", // YYYY-MM-DD
    phoneNumber: "9876543210",
    parentPhoneNumber: "9123456789",
    email: "anjali.s@example.com",
    currentClass: "Class 12",
    stream: "Science",
    targetExams: ["NEET", "Boards"],
    enrolledSubjects: ["Physics", "Chemistry", "Biology", "English"], // Mocked names from IDs
    academicSession: "2024-2025",
    admissionDate: "2024-04-01",
    isActive: true
  };

  // Derived Calculations
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const calculateTenure = (admissionDate: string) => {
    const start = new Date(admissionDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

  return (
    <Box maxWidth="lg">
      <ProfileHeader>
        <Avatar sx={{ width: 100, height: 100, fontSize: 40, bgcolor: 'primary.main', color: '#66bb6a', border: '2px solid #66bb6a' }}>
          {student.name.charAt(0)}
        </Avatar>
        <Box flex={1}>
          <Stack direction="row" alignItems="center" gap={2}>
             <Typography variant="h4" fontWeight={700}>{student.name}</Typography>
             <Badge colorType={student.isActive ? 'active' : 'inactive'}>
                 {student.isActive ? 'Active Student' : 'Inactive'}
             </Badge>
          </Stack>
          <Typography variant="body1" color="text.secondary" mt={0.5}>
            Class {student.currentClass} • {student.stream} Stream
          </Typography>
          <Typography variant="caption" color="text.secondary">
             Student for {calculateTenure(student.admissionDate)} days
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<EditIcon />} sx={{ borderColor: '#66bb6a', color: '#2e7d32' }}>
            Request Edit
        </Button>
      </ProfileHeader>

      <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={3}>
        
        {/* Left Column: Full Details (Flex 2) */}
        <Box flex={2}>
          <SectionCard elevation={0}>
            <Typography variant="h6" fontWeight={700} mb={3} color="primary">Basic Identity</Typography>
            
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={3}>
              <Box flex={1}>
                <LabelText>Phone Number (Login ID)</LabelText>
                <ValueText>{student.phoneNumber}</ValueText>
              </Box>
              <Box flex={1}>
                <LabelText>Parent Phone</LabelText>
                <ValueText>{student.parentPhoneNumber || 'N/A'}</ValueText>
              </Box>
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={3}>
               <Box flex={1}>
                <LabelText>Email Address</LabelText>
                <ValueText>{student.email}</ValueText>
              </Box>
              <Box flex={1}>
                <LabelText>Date of Birth</LabelText>
                <ValueText>{student.dob} ({calculateAge(student.dob)} years)</ValueText>
              </Box>
            </Stack>
            
            <Box mt={4} mb={3}><Divider /></Box>
            
            <Typography variant="h6" fontWeight={700} mb={3} color="primary">Academic Standing</Typography>
            
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mb={3}>
              <Box flex={1}>
                <LabelText>Session</LabelText>
                <ValueText>{student.academicSession}</ValueText>
              </Box>
               <Box flex={1}>
                <LabelText>Admission Date</LabelText>
                <ValueText>{student.admissionDate}</ValueText>
              </Box>
            </Stack>

            <Box mb={3}>
                <LabelText>Target Exams</LabelText>
                <Stack direction="row" gap={1}>
                  {student.targetExams.map(ex => (
                    <Chip key={ex} label={ex} color="primary" variant="outlined" />
                  ))}
                </Stack>
            </Box>

            <Box>
                <LabelText>Enrolled Subjects</LabelText>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {student.enrolledSubjects.map(sub => (
                    <Chip key={sub} label={sub} sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 600, border: '1px solid #c8e6c9' }} />
                  ))}
                </Stack>
            </Box>

          </SectionCard>
        </Box>

        {/* Right Column: Settings & Actions (Flex 1) */}
        <Box flex={1}>
          <SectionCard elevation={0}>
            <Stack direction="row" alignItems="center" gap={1} mb={2}>
              <LockResetIcon color="primary" /> 
              <Typography variant="h6" fontWeight={700}>Security</Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                Change your password regularly to keep your account safe.
            </Typography>
            <Stack spacing={2}>
              <TextField 
                label="Current Password" type="password" size="small" fullWidth 
                value={passwordData.current} onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
              />
              <TextField 
                label="New Password" type="password" size="small" fullWidth 
                value={passwordData.new} onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
              />
              <ActionButton fullWidth>
                  Update Password
              </ActionButton>
            </Stack>
          </SectionCard>
        </Box>

      </Box>
    </Box>
  );
};

export default StudentProfile;
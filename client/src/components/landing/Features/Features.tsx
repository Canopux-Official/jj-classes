import { Box, Container, Typography, Paper } from '@mui/material';
import { featureStyles } from './Features.styles';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const featuresList = [
  { icon: <SchoolIcon fontSize="large" />, title: 'Expert Faculty', desc: 'Learn from the best educators with proven track records in JEE/NEET.' },
  { icon: <MenuBookIcon fontSize="large" />, title: 'Comprehensive Material', desc: 'Updated study materials designed to cover every aspect of the syllabus.' },
  { icon: <GroupsIcon fontSize="large" />, title: 'Small Batches', desc: 'Personalized attention with limited batch sizes for better interaction.' },
  { icon: <TrendingUpIcon fontSize="large" />, title: 'Performance Tracking', desc: 'Regular tests and analysis to monitor and improve your progress.' },
];

const Features = () => {
  return (
    <Box sx={featureStyles.section} id="features">
      <Container maxWidth="lg">
        <Box sx={featureStyles.header}>
          <Typography variant="overline" color="secondary.main" fontWeight={700}>WHY CHOOSE US</Typography>
          <Typography variant="h3" fontWeight={700} sx={{ mt: 1 }}>Our Key Features</Typography>
        </Box>

        {/* CSS GRID LAYOUT - NO MUI GRID NEEDED */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, // 1 col on mobile, 4 on desktop
          gap: 4 
        }}>
          {featuresList.map((item, index) => (
            <Paper key={index} sx={featureStyles.card} elevation={0}>
              <Box sx={featureStyles.iconBox}>{item.icon}</Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
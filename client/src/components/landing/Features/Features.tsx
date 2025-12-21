import { Box, Container, Typography, Grid } from '@mui/material';
import { featureStyles } from './Features.styles';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DevicesIcon from '@mui/icons-material/Devices';

const featuresList = [
  {
    title: "Personalized Coaching",
    desc: "Tailored study plans matching every student's unique learning curve.",
    icon: <SchoolIcon fontSize="medium" />,
  },
  {
    title: "Hybrid Learning",
    desc: "A perfect blend of offline rigorous teaching and online flexibility.",
    icon: <DevicesIcon fontSize="medium" />,
  },
  {
    title: "Regular Evaluations",
    desc: "Mock tests simulating real exam conditions for JEE, NEET & Boards.",
    icon: <QuizIcon fontSize="medium" />,
  },
  {
    title: "Comprehensive Syllabus",
    desc: "Deep coverage of every topic with updated study materials.",
    icon: <MenuBookIcon fontSize="medium" />,
  },
  {
    title: "Doubt Clearing",
    desc: "Daily doubt sessions to ensure no concept remains unclear.",
    icon: <SupportAgentIcon fontSize="medium" />,
  },
  {
    title: "Consistent Growth",
    desc: "Continuous feedback loops to identify and fix weak areas.",
    icon: <TrendingUpIcon fontSize="medium" />,
  },
];

const Features = () => {
  return (
    <Box sx={featureStyles.section} id="features">
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={featureStyles.header}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Why JJ Classes?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Expert guidance for your academic success.
          </Typography>
        </Box>

        {/* Matrix Grid - Centered */}
        <Grid container spacing={4} justifyContent="center"> 
          {featuresList.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} display="flex">
              {/* display="flex" on Grid item ensures the child Box stretches to fill height */}
              <Box sx={featureStyles.card}>
                <Box sx={featureStyles.iconBox}>
                  {feature.icon}
                </Box>
                <Typography sx={featureStyles.cardTitle}>
                  {feature.title}
                </Typography>
                <Typography sx={featureStyles.cardDesc}>
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
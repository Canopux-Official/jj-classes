import { Box, Container, Typography, Paper } from '@mui/material';
import { facultyStyles } from './Faculty.styles';

// You can move this to dummyData.json later
const facultyList = [
  { 
    name: "Dr. A.K. Sharma", 
    subject: "PHYSICS", 
    role: "HOD Physics",
    exp: "15+ Years Exp",
    image: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  { 
    name: "Mrs. Priya Das", 
    subject: "CHEMISTRY", 
    role: "Senior Faculty",
    exp: "12+ Years Exp",
    image: "https://randomuser.me/api/portraits/women/44.jpg" 
  },
  { 
    name: "Mr. R. Verma", 
    subject: "MATHEMATICS", 
    role: "JEE Specialist",
    exp: "10+ Years Exp",
    image: "https://randomuser.me/api/portraits/men/15.jpg" 
  },
  { 
    name: "Dr. S. Mishra", 
    subject: "BIOLOGY", 
    role: "NEET Expert",
    exp: "18+ Years Exp",
    image: "https://randomuser.me/api/portraits/women/68.jpg" 
  },
];

const Faculty = () => {
  return (
    <Box sx={facultyStyles.section} id="faculty">
      <Container maxWidth="lg">
        <Box sx={facultyStyles.header}>
          <Typography variant="overline" color="secondary.contrastText" fontWeight={800} letterSpacing={1.5} sx={{ fontSize: { xs: '1.1rem', md: '1.2rem' } }}>
            MENTORS
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ mt: 1, color: 'primary.main' }}>
            Meet Our Expert Faculty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Guided by experienced educators dedicated to your academic success and holistic growth.
          </Typography>
        </Box>

        <Box sx={facultyStyles.grid}>
          {facultyList.map((item, index) => (
            <Paper key={index} sx={facultyStyles.card} elevation={0}>
              <Box sx={facultyStyles.imageBox}>
                <Box 
                  component="img" 
                  src={item.image} 
                  alt={item.name} 
                  sx={facultyStyles.image} 
                />
              </Box>
              <Box sx={facultyStyles.info}>
                <Typography sx={facultyStyles.subjectBadge}>
                  {item.subject}
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.role} • {item.exp}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Faculty;
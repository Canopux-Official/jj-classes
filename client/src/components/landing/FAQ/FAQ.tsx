import { useState } from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faqStyles } from './FAQ.styles';

const faqList = [
  {
    q: "What is JJ Classes known for?",
    a: "We are renowned for exceptional coaching services specializing in CBSE Class 9 to 12, and NEET/JEE preparation. Our track record of producing successful students speaks for our commitment to academic excellence."
  },
  {
    q: "Why should I choose JJ Classes for competitive exams?",
    a: "JJ Classes is your gateway to success. Our experienced faculty, well-researched study material, and personalized attention set us apart. We have a proven track record of top ranks in NEET and JEE."
  },
  {
    q: "Do you provide online classes?",
    a: "Yes, we offer a Hybrid Model (Offline + Online), giving you the flexibility to choose a learning mode that suits your convenience. Our online classes are interactive and engaging."
  },
  {
    q: "How do you prepare students for NEET & JEE?",
    a: "Our programs are meticulously designed covering all essential topics with rigorous practice through mock tests. We focus on concept clarity and problem-solving skills."
  },
  {
    q: "Will I get regular updates on performance?",
    a: "Absolutely! We believe in transparent communication. You will receive regular progress reports, performance analysis, and feedback to help you track your growth."
  },
  {
    q: "Do you offer scholarships?",
    a: "Yes, we have scholarship programs and financial aid options for deserving students. We believe financial constraints should not hinder access to quality education."
  },
  {
    q: "What makes your faculty exceptional?",
    a: "Our faculty comprises experienced educators who are experts in their respective subjects. They are dedicated to providing the best guidance and mentorship to ensure student success."
  },
  {
    q: "How can I enroll?",
    a: "Enrolling is easy! You can visit our center in Koraput or fill out the enquiry form on this website. Our team will guide you through the process."
  }
];

const FAQ = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect Mobile

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={faqStyles.section} id="faq">
      <Container maxWidth="md">
        
        {/* Header */}
        <Box sx={faqStyles.header}>
          <Typography variant="overline" color="secondary.main" fontWeight={700} letterSpacing={1.5}>
            COMMON QUERIES
          </Typography>
          
          {/* Responsive Heading Size */}
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            fontWeight={700} 
            sx={{ mt: 1, mb: 2 }}
          >
            Frequently Asked Questions
          </Typography>
          
          <Typography variant="body1" color="text.secondary">
            Everything you need to know about our coaching programs, faculty, and success stories.
          </Typography>
        </Box>

        {/* Accordion List */}
        <Box>
          {faqList.map((item, index) => (
            <Accordion 
              key={index} 
              expanded={expanded === `panel${index}`} 
              onChange={handleChange(`panel${index}`)}
              sx={faqStyles.accordion}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
                <Typography sx={faqStyles.question}>{item.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={faqStyles.answer}>
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

      </Container>
    </Box>
  );
};

export default FAQ;
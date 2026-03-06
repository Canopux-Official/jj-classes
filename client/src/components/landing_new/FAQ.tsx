import { useState } from 'react'
import {
  Box, Container, Typography, Accordion, AccordionSummary,
  AccordionDetails
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const FAQ_ITEMS = [
  {
    id: "1",
    q: "What is JJ Institute Of Science known for?",
    a: "We are renowned for exceptional coaching services specializing in CBSE Class 9 to 12, and NEET/JEE preparation. Our track record of producing successful students speaks for our commitment to academic excellence."
  },
  {
    id: "2",
    q: "Why should I choose JJ Institute Of Science for competitive exams?",
    a: "JJ Institute Of Science is your gateway to success. Our experienced faculty, well-researched study material, and personalized attention set us apart. We have a proven track record of top ranks in NEET and JEE."
  },
  {
    id: "3",
    q: "Do you provide online classes?",
    a: "Yes, we offer a Hybrid Model (Offline + Online), giving you the flexibility to choose a learning mode that suits your convenience. Our online classes are interactive and engaging."
  },
  {
    id: "4",
    q: "How do you prepare students for NEET & JEE?",
    a: "Our programs are meticulously designed covering all essential topics with rigorous practice through mock tests. We focus on concept clarity and problem-solving skills."
  },
  {
    id: "5",
    q: "Will I get regular updates on performance?",
    a: "Absolutely! We believe in transparent communication. You will receive regular progress reports, performance analysis, and feedback to help you track your growth."
  },
  {
    id: "6",
    q: "Do you offer scholarships?",
    a: "Yes, we have scholarship programs and financial aid options for deserving students. We believe financial constraints should not hinder access to quality education."
  },
  {
    id: "7",
    q: "What makes your faculty exceptional?",
    a: "Our faculty comprises experienced educators who are experts in their respective subjects. They are dedicated to providing the best guidance and mentorship to ensure student success."
  },
  {
    id: "8",
    q: "How can I enroll?",
    a: "Enrolling is easy! You can visit our center in Koraput or fill out the enquiry form on this website. Our team will guide you through the process."
  }
];

export default function FAQ() {
  const [expanded, setExpanded] = useState<string | false>(false)

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: 'rgb(254 254 254 / 50%)' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ color: 'primary.main', mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
            Find answers to common questions about our courses and services
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 6 }}>
          {FAQ_ITEMS.map((item) => (
            <Accordion
              key={item.id}
              expanded={expanded === item.id}
              onChange={() => setExpanded(expanded === item.id ? false : item.id)}
              elevation={0}
              disableGutters
              sx={{
                border: '1px solid',
                borderColor: expanded === item.id ? 'rgba(196,122,58,0.4)' : 'divider',
                borderRadius: '8px !important',
                overflow: 'hidden',
                '&:before': { display: 'none' },
                transition: 'border-color 0.2s',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                sx={{
                  bgcolor: expanded === item.id ? 'rgba(245,241,237,0.6)' : 'background.paper',
                  '&:hover': { bgcolor: 'rgba(245,241,237,0.6)' },
                  px: 3, py: 0.5,
                }}
              >
                <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, color: 'text.primary', fontSize: '1rem' }}>
                  {item.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: 'rgba(245,241,237,0.3)', px: 3, pb: 3 }}>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* CTA Box */}
        {/* <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, rgba(0,26,77,0.06) 0%, rgba(196,122,58,0.08) 100%)',
            border: '1px solid rgba(0,26,77,0.15)',
            borderRadius: 3,
            p: 5,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ color: 'primary.main', fontFamily: 'Montserrat', mb: 2 }}>
            Still have questions?
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7 }}>
            Our admissions team is ready to help! Contact us for personalized guidance.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ px: 5 }}>
            Contact Us Today
          </Button>
        </Paper> */}
      </Container>
    </Box>
  )
}

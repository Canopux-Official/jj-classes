import {
  Box, Container, Typography, Button, Divider, IconButton,
} from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import LogoImg from '../../assets/logo.jpeg'; 

const FOOTER_SECTIONS = [
  {
    title: 'Courses',
    links: [
      { label: 'JEE Preparation', href: '#courses' },
      { label: 'NEET Coaching', href: '#courses' },
      { label: 'Foundation Course', href: '#courses' },
      { label: 'Board Exams', href: '#courses' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#why-us' },
      { label: 'Our Faculty', href: '#faculty' },
      { label: 'Testimonials', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '#' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
]

const socials = [
  { icon: <FacebookIcon fontSize="small" />, href: '#' },
  { icon: <InstagramIcon fontSize="small" />, href: '#' },
  { icon: <LinkedInIcon fontSize="small" />, href: '#' },
  { icon: <TwitterIcon fontSize="small" />, href: '#' },
]

export default function Footer() {
  return (
    <Box id="footer" component="footer">

      {/* CTA Section — light sage green */}
      <Box sx={{ bgcolor: '#e8f5e9', py: { xs: 8, md: 11 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{ mb: 2, fontSize: { xs: '1.8rem', md: '2.6rem' }, fontFamily: 'Montserrat', fontWeight: 800, color: '#001a4d' }}
          >
            Ready to Transform Your Future?
          </Typography>
          <Typography sx={{ color: '#4a6741', mb: 5, fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.8, maxWidth: 520, mx: 'auto' }}>
            Join thousands of successful students who have achieved their dreams with JJ Institute Of Science.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#2e7d32',
                color: '#fff',
                px: { xs: 3, md: 5 },
                py: 1.4,
                fontFamily: 'Montserrat',
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: '0 4px 14px rgba(46,125,50,0.35)',
                '&:hover': { bgcolor: '#256428' },
                fontSize: { xs: '0.9rem', md: '1rem' },
              }}
            >
              Enroll Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#2e7d32',
                color: '#2e7d32',
                px: { xs: 3, md: 5 },
                py: 1.4,
                fontFamily: 'Montserrat',
                fontWeight: 700,
                borderRadius: 2,
                fontSize: { xs: '0.9rem', md: '1rem' },
                '&:hover': { bgcolor: 'rgba(46,125,50,0.06)', borderColor: '#256428' },
              }}
            >
              Schedule a Demo
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main footer — deep forest green */}
      <Box sx={{ bgcolor: '#051911', color: '#d8ede0' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>

          {/* Brand Section */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={LogoImg}
                  alt="JJ Institute Logo"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Box>
                <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: { xs: 14, md: 16 }, color: '#fff', lineHeight: 1.6 }}>
                  JJ Institute Of Science
                </Typography>
                <Typography sx={{ fontSize: 10, color: 'rgba(216,237,224,0.6)', letterSpacing: 1.2, textTransform: 'uppercase' }}>
                  Coaching Centre
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ color: 'rgba(216,237,224,0.65)', fontSize: { xs: 12.5, md: 15 }, lineHeight: 1.8, mb: 3, maxWidth: 300 }}>
              Transforming academic aspirations into achievements through excellence and dedication.
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {socials.map((s, i) => (
                <IconButton
                  key={i}
                  component="a"
                  href={s.href}
                  size="small"
                  sx={{
                    color: 'rgba(216,237,224,0.7)',
                    border: '1px solid rgba(216,237,224,0.2)',
                    borderRadius: 1.5,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.35)' },
                    transition: 'all 0.2s',
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* Four Columns in One Row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' },
              gap: { xs: 3, sm: 2, md: 4 },
              mb: 6,
            }}
          >
            {/* Courses Section */}
            <Box>
              <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, mb: 2.5, fontSize: { xs: 11, md: 13 }, color: '#fff', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                {FOOTER_SECTIONS[0].title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {FOOTER_SECTIONS[0].links.map((link, i) => (
                  <Typography
                    key={i}
                    component="a"
                    href={link.href}
                    sx={{
                      color: 'rgba(216,237,224,0.65)',
                      textDecoration: 'none',
                      fontSize: { xs: 12, md: 14 },
                      '&:hover': { color: '#fff' },
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Company Section */}
            <Box>
              <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, mb: 2.5, fontSize: { xs: 11, md: 13 }, color: '#fff', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                {FOOTER_SECTIONS[1].title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {FOOTER_SECTIONS[1].links.map((link, i) => (
                  <Typography
                    key={i}
                    component="a"
                    href={link.href}
                    sx={{
                      color: 'rgba(216,237,224,0.65)',
                      textDecoration: 'none',
                      fontSize: { xs: 12, md: 14 },
                      '&:hover': { color: '#fff' },
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Support Section */}
            <Box>
              <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, mb: 2.5, fontSize: { xs: 11, md: 13 }, color: '#fff', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                {FOOTER_SECTIONS[2].title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {FOOTER_SECTIONS[2].links.map((link, i) => (
                  <Typography
                    key={i}
                    component="a"
                    href={link.href}
                    sx={{
                      color: 'rgba(216,237,224,0.65)',
                      textDecoration: 'none',
                      fontSize: { xs: 12, md: 14 },
                      '&:hover': { color: '#fff' },
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Contact Section */}
            <Box>
              <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, mb: 2.5, fontSize: { xs: 11, md: 13 }, color: '#fff', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                Contact
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <PhoneIcon sx={{ fontSize: 14, mt: 0.2, flexShrink: 0, color: 'rgba(216,237,224,0.6)' }} />
                  <Box>
                    <Typography sx={{ fontSize: { xs: 11, md: 14 }, color: 'rgba(216,237,224,0.75)', lineHeight: 1.6 }}>+91 9876 543 210</Typography>
                    <Typography sx={{ fontSize: { xs: 11, md: 14 }, color: 'rgba(216,237,224,0.75)', lineHeight: 1.6 }}>+91 8765 432 109</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <EmailIcon sx={{ fontSize: 14, mt: 0.2, flexShrink: 0, color: 'rgba(216,237,224,0.6)' }} />
                  <Typography sx={{ color: 'rgba(216,237,224,0.75)', fontSize: { xs: 11, md: 14 } }}>contact@elite.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <LocationOnIcon sx={{ fontSize: 14, mt: 0.2, flexShrink: 0, color: 'rgba(216,237,224,0.6)' }} />
                  <Typography sx={{ color: 'rgba(216,237,224,0.75)', fontSize: { xs: 11, md: 14 }, lineHeight: 1.5 }}>
                    123 Ave,<br />City — 110001
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(216,237,224,0.12)', mb: 4 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: { xs: 1.5, md: 2 }, flexDirection: { xs: 'column-reverse', md: 'row' } }}>
            <Typography sx={{ color: 'rgba(216,237,224,0.45)', fontSize: { xs: 11.5, md: 12.5 }, textAlign: { xs: 'center', md: 'left' } }}>
              © 2025 JJ Institute Of Science. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 3 }, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Typography
                  key={item}
                  component="a"
                  href="#"
                  sx={{
                    color: 'rgba(216,237,224,0.45)',
                    textDecoration: 'none',
                    fontSize: { xs: 11.5, md: 12.5 },
                    '&:hover': { color: '#d8ede0' },
                    transition: 'color 0.2s',
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  )
}
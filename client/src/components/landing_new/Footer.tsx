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
      { label: 'Result', href: '#results' },
      { label: 'Our Faculty', href: '#faculty' },
      { label: 'Contact Us', href: '#footer' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
]

const socials = [
  { icon: <FacebookIcon fontSize="small" />, href: '#' },
  { icon: <InstagramIcon fontSize="small" />, href: '#' },
  { icon: <LinkedInIcon fontSize="small" />, href: '#' },
  { icon: <TwitterIcon fontSize="small" />, href: '#' },
]

const handleNavClick = (e, href) => {
  if (!href || href === '#') return
  e.preventDefault()
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function Footer() {
  return (
    <Box id="footer" component="footer">

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#e8f5e9', py: { xs: 7, md: 11 }, textAlign: 'center', px: 2 }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '1.9rem', md: '2.6rem' },
              fontFamily: 'Montserrat',
              fontWeight: 800,
              color: '#001a4d',
            }}
          >
            Ready to Transform Your Future?
          </Typography>
          <Typography sx={{
            color: '#4a6741',
            mb: 4,
            fontSize: { xs: '0.88rem', md: '1rem' },
            lineHeight: 1.8,
            maxWidth: 520,
            mx: 'auto',
          }}>
            Join thousands of successful students who have achieved their dreams with JJ Institute Of Science.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={(e) => handleNavClick(e, '#courses')}
              sx={{
                bgcolor: '#2e7d32',
                color: '#fff',
                px: { xs: 3, md: 5 },
                py: { xs: 1.2, md: 1.4 },
                fontFamily: 'Montserrat',
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: '0 4px 14px rgba(46,125,50,0.35)',
                '&:hover': { bgcolor: '#256428' },
                fontSize: { xs: '0.85rem', md: '1rem' },
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
                py: { xs: 1.2, md: 1.4 },
                fontFamily: 'Montserrat',
                fontWeight: 700,
                borderRadius: 2,
                fontSize: { xs: '0.85rem', md: '1rem' },
                '&:hover': { bgcolor: 'rgba(46,125,50,0.06)', borderColor: '#256428' },
              }}
            >
              Schedule a Demo
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Footer */}
      <Box sx={{ bgcolor: '#051911', color: '#d8ede0' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 }, px: { xs: 3, md: 4 } }}>

          {/* Top: Brand + Columns */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.6fr 1fr 1fr 1.4fr' },
              gap: { xs: 5, sm: 4, md: 5 },
              mb: { xs: 5, md: 7 },
            }}
          >
            {/* Brand */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
                  <Box
                    component="img"
                    src={LogoImg}
                    alt="JJ Institute Logo"
                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Box>
                <Box>
                  <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: { xs: 13, md: 15 }, color: '#fff', lineHeight: 1.5 }}>
                    JJ Institute Of Science
                  </Typography>
                  <Typography sx={{ fontSize: 10, color: 'rgba(216,237,224,0.55)', letterSpacing: 1.2, textTransform: 'uppercase' }}>
                    Coaching Centre
                  </Typography>
                </Box>
              </Box>

              <Typography sx={{
                color: 'rgba(216,237,224,0.6)',
                fontSize: { xs: 13, md: 14 },
                lineHeight: 1.9,
                mb: 3,
                maxWidth: { xs: '100%', sm: 280 },
              }}>
                Transforming academic aspirations into achievements through excellence and dedication.
              </Typography>

              <Box sx={{ display: 'flex', gap: 0.8 }}>
                {socials.map((s, i) => (
                  <IconButton
                    key={i}
                    component="a"
                    href={s.href}
                    size="small"
                    sx={{
                      color: 'rgba(216,237,224,0.7)',
                      border: '1px solid rgba(216,237,224,0.18)',
                      borderRadius: 1.5,
                      width: 34,
                      height: 34,
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' },
                      transition: 'all 0.2s',
                    }}
                  >
                    {s.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>

            {/* Courses */}
            <Box>
              <Typography sx={{
                fontFamily: 'Montserrat', fontWeight: 700, mb: 2.5,
                fontSize: { xs: 11, md: 12 }, color: '#fff',
                textTransform: 'uppercase', letterSpacing: 1,
              }}>
                {FOOTER_SECTIONS[0].title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.6 }}>
                {FOOTER_SECTIONS[0].links.map((link, i) => (
                  <Typography
                    key={i}
                    component="a"
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    sx={{
                      color: 'rgba(216,237,224,0.6)',
                      textDecoration: 'none',
                      fontSize: { xs: 13, md: 14 },
                      cursor: 'pointer',
                      '&:hover': { color: '#fff' },
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Company */}
            <Box>
              <Typography sx={{
                fontFamily: 'Montserrat', fontWeight: 700, mb: 2.5,
                fontSize: { xs: 11, md: 12 }, color: '#fff',
                textTransform: 'uppercase', letterSpacing: 1,
              }}>
                {FOOTER_SECTIONS[1].title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.6 }}>
                {FOOTER_SECTIONS[1].links.map((link, i) => (
                  <Typography
                    key={i}
                    component="a"
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    sx={{
                      color: 'rgba(216,237,224,0.6)',
                      textDecoration: 'none',
                      fontSize: { xs: 13, md: 14 },
                      cursor: 'pointer',
                      '&:hover': { color: '#fff' },
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Contact */}
            <Box>
              <Typography sx={{
                fontFamily: 'Montserrat', fontWeight: 700, mb: 2.5,
                fontSize: { xs: 11, md: 12 }, color: '#fff',
                textTransform: 'uppercase', letterSpacing: 1,
              }}>
                Contact
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
                <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'flex-start' }}>
                  <PhoneIcon sx={{ fontSize: 15, mt: 0.3, flexShrink: 0, color: 'rgba(216,237,224,0.55)' }} />
                  <Box>
                    <Typography sx={{ fontSize: { xs: 13, md: 14 }, color: 'rgba(216,237,224,0.72)', lineHeight: 1.7 }}>+91 9876 543 210</Typography>
                    <Typography sx={{ fontSize: { xs: 13, md: 14 }, color: 'rgba(216,237,224,0.72)', lineHeight: 1.7 }}>+91 8765 432 109</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center' }}>
                  <EmailIcon sx={{ fontSize: 15, flexShrink: 0, color: 'rgba(216,237,224,0.55)' }} />
                  <Typography sx={{ color: 'rgba(216,237,224,0.72)', fontSize: { xs: 13, md: 14 } }}>contact@elite.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'flex-start' }}>
                  <LocationOnIcon sx={{ fontSize: 15, mt: 0.3, flexShrink: 0, color: 'rgba(216,237,224,0.55)' }} />
                  <Typography sx={{ color: 'rgba(216,237,224,0.72)', fontSize: { xs: 13, md: 14 }, lineHeight: 1.7 }}>
                    123 Ave,<br />City — 110001
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(216,237,224,0.1)', mb: { xs: 3.5, md: 4 } }} />

          {/* Bottom Bar */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            flexDirection: { xs: 'column-reverse', md: 'row' },
          }}>
            <Typography sx={{
              color: 'rgba(216,237,224,0.38)',
              fontSize: { xs: 11, md: 12 },
              textAlign: { xs: 'center', md: 'left' },
            }}>
              © 2025 JJ Institute Of Science. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Typography
                  key={item}
                  component="a"
                  href="#"
                  sx={{
                    color: 'rgba(216,237,224,0.38)',
                    textDecoration: 'none',
                    fontSize: { xs: 11, md: 12 },
                    '&:hover': { color: 'rgba(216,237,224,0.75)' },
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
import { Box, Container, Typography, Button, Divider } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const stats = [
  { value: '10K+', label: 'Students Trained' },
  { value: '95%', label: 'Success Rate' },
  { value: '50+', label: 'Expert Teachers' },
]

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        pt: { xs: 14, md: 18 },
        pb: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 80%, rgb(255 255 255 / 30%) 100%)',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 6, md: 6 },
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <Box>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                    color: '#063f26',
                    lineHeight: 1.15,
                    mb: 2,
                  }}
                >
                  Transform Your Academic
                  <Box component="span" sx={{ color: '#c47a3a' }}> Excellence</Box>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '0.95rem', md: '1.1rem' },
                    lineHeight: 1.7
                  }}
                >
                  Join JJ Institute Of Science and unlock your full potential. Our proven methodology has helped
                  thousands of students achieve their dreams in competitive exams.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: { xs: 3, md: 4 },
                    py: 1.5,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    bgcolor: "#063f26"
                  }}
                >
                  Start Your Journey
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{
                    px: { xs: 3, md: 4 },
                    py: 1.5,
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}
                >
                  Watch Demo
                </Button>
              </Box>

              {/* Stats */}
              <Divider sx={{ mb: 4 }} />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: { xs: 2, md: 3 },
                }}
              >
                {stats.map((stat) => (
                  <Box key={stat.label}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: 'primary.main',
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        mt: 0.5,
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right Visual */}
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                aspectRatio: '1',
                background: 'linear-gradient(135deg, rgba(0,26,77,0.06) 0%, rgba(196,122,58,0.08) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontSize: { xs: '3.5rem', md: '5rem' },
                    fontFamily: 'Montserrat',
                    fontWeight: 800,
                    color: 'rgba(0,26,77,0.12)',
                    lineHeight: 1,
                    mb: 1,
                  }}
                >
                  JJ
                </Typography>
                <Typography sx={{ color: 'text.disabled', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                  Coaching Institute
                </Typography>
              </Box>
              {/* Decorative blobs */}
              <Box
                sx={{
                  position: 'absolute', top: 32, right: 32,
                  width: 80, height: 80,
                  bgcolor: 'rgba(196,122,58,0.15)',
                  borderRadius: '50%',
                  filter: 'blur(20px)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute', bottom: 32, left: 32,
                  width: 120, height: 120,
                  bgcolor: 'rgba(0,26,77,0.08)',
                  borderRadius: '50%',
                  filter: 'blur(30px)',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
import { Box, Container, Typography, Button, Divider } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useEffect, useRef, useState } from 'react'
import img from '../../assets/results/image.png'

const stats = [
  { target: 10000, suffix: 'K+', divisor: 1000, label: 'Students Trained' },
  { target: 95, suffix: '%', divisor: 1, label: 'Success Rate' },
  { target: 50, suffix: '+', divisor: 1, label: 'Expert Teachers' },
]

// ── Counter hook ──────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, delay = 0, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return

    let startTime: number | null = null
    let raf: number

    const delayTimer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(delayTimer)
      cancelAnimationFrame(raf)
    }
  }, [active, target, duration, delay])

  return count
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  stat,
  animDelay,
  active,
  countDelay,
}: {
  stat: typeof stats[0]
  animDelay: number
  active: boolean
  countDelay: number
}) {
  const raw = useCountUp(stat.target, 1800, countDelay, active)
  const display = stat.divisor > 1 ? Math.floor(raw / stat.divisor) : raw

  return (
    <Box
      sx={{
        opacity: 0,
        animation: 'fadeSlideUp 0.65s ease forwards',
        animationDelay: `${animDelay}ms`,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: 'primary.main',
          fontFamily: 'Montserrat',
          fontWeight: 800,
          fontSize: { xs: '1.5rem', md: '2rem' },
          fontVariantNumeric: 'tabular-nums',
          minWidth: { xs: '3.5ch', md: '4ch' },
        }}
      >
        {display}{stat.suffix}
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
  )
}

// ── Keyframes injected once ───────────────────────────────────────────────────
const keyframes = {
  '@keyframes fadeSlideUp': {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  '@keyframes fadeSlideRight': {
    from: { opacity: 0, transform: 'translateX(32px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
}

const animateIn = (delay = 0) => ({
  opacity: 0,
  animation: 'fadeSlideUp 0.65s ease forwards',
  animationDelay: `${delay}ms`,
})

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  // Trigger counters when stats section scrolls into view
  useEffect(() => {
    const el = statsRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      id="hero"
      sx={{
        pt: { xs: 14, md: 18 },
        pb: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 80%, rgb(255 255 255 / 30%) 100%)',
        ...keyframes,
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
              {/* Heading */}
              <Box sx={{ mb: 4, ...animateIn(0) }}>
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
                    lineHeight: 1.7,
                  }}
                >
                  Join JJ Institute Of Science and unlock your full potential. Our proven methodology has helped
                  thousands of students achieve their dreams in competitive exams.
                </Typography>
              </Box>

              {/* Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5, ...animateIn(150) }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: { xs: 3, md: 4 },
                    py: 1.5,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    bgcolor: '#063f26',
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
                    fontSize: { xs: '0.9rem', md: '1rem' },
                  }}
                >
                  Watch Demo
                </Button>
              </Box>

              {/* Stats */}
              <Box sx={{ ...animateIn(300) }}>
                <Divider sx={{ mb: 4 }} />
                <Box
                  ref={statsRef}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: { xs: 2, md: 3 },
                  }}
                >
                  {stats.map((stat, i) => (
                    <StatCard
                      key={stat.label}
                      stat={stat}
                      animDelay={400 + i * 100}
                      active={statsVisible}
                      countDelay={i * 150}
                    />
                  ))}
                </Box>
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
                opacity: 0,
                animation: 'fadeSlideRight 0.7s ease forwards',
                animationDelay: '200ms',
              }}
            >
              <Box
                component="img"
                src={img}
                alt="JJ Institute"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

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
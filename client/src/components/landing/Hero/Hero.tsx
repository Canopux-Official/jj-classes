import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ChampionCard from './ChampionCard';
import dummyData from '../../../data/dummyData.json';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { heroStyles } from './Hero.styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box sx={heroStyles.wrapper}>
      <Box sx={heroStyles.blob} />
      <Container maxWidth="lg">
        {/* Main Flex Container - Full Width */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '80vh',
          width: '100%',
          py: { xs: 8, md: 0 },
          gap: 4
        }}>

          {/* LEFT: Text Content */}
          <Box sx={{ width: { xs: '100%', md: '50%' }, zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>

              <Box sx={{ ...heroStyles.contentContainer, textAlign: { xs: 'center', md: 'left' } }}>

                <Typography variant="overline" sx={{ color: 'secondary.dark', fontWeight: 700, letterSpacing: 2, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                  PREMIERE COACHING IN KORAPUT
                </Typography>

                <Typography variant="h1" sx={{
                  ...heroStyles.title,
                  fontSize: { xs: '2.5rem', md: '4.5rem' },
                  lineHeight: 1.1
                }}>
                  Unlock Your Potential for <br />
                  <span style={heroStyles.highlight as React.CSSProperties}>JEE, NEET & Boards</span>
                </Typography>

                <Typography variant="body1" sx={{
                  ...heroStyles.subtitle,
                  fontSize: '1.25rem'
                }}>
                  Join JJ Institute Of Science for a personalized learning experience.
                  We provide expert faculty, modern facilities, and a rigorous academic
                  environment to help you secure your future.
                </Typography>

                <Box sx={heroStyles.buttonGroup}>
                  <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={() => scrollToSection('contact')} sx={{ bgcolor: 'primary.main', px: 4, py: 1.5 }}>
                    Register Now
                  </Button>
                  <Button variant="outlined" size="large" onClick={() => navigate('/courses')} sx={{ borderColor: 'primary.main', color: 'primary.main', px: 4, py: 1.5 }}>
                    View Courses
                  </Button>
                </Box>

              </Box>
            </motion.div>
          </Box>

          {/* RIGHT: Champions Carousel */}
          <Box sx={heroStyles.carouselContainer}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box sx={heroStyles.carouselRelativeWrapper}>
                {/* Refined Highlighted Label */}
                <Typography variant="h6" sx={heroStyles.championsLabel}>
                  OUR TOP ACHIEVERS
                </Typography>

                {/* Decorative Stats/Badge */}
                <Box sx={heroStyles.experienceBadge}>
                  <Typography variant="h4" sx={{ fontWeight: 900, lineHeight: 1 }}>10+</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>YEARS OF PRIDE</Typography>
                </Box>

                <Box sx={heroStyles.carouselGlassCard}>
                  <Slider {...settings}>
                    {dummyData.champions.map((champion) => (
                      <ChampionCard key={champion.id} champion={champion} />
                    ))}
                  </Slider>
                </Box>
              </Box>
            </motion.div>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
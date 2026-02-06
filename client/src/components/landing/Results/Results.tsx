import { useState } from 'react';
import { Box, Container, Typography, Modal, IconButton } from '@mui/material';
import Slider from "react-slick";
import ReactPlayer from 'react-player';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { resultStyles } from './Results.styles';
import dummyData from '../../../data/dummyData.json';

// Import slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface StudentResult {
  id: number;
  name: string;
  rank: string;
  course: string;
  image: string;
  videoUrl: string;
  story: string;
}

const Results = () => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);

  const handleOpen = (student: StudentResult) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const settings = {
    dots: false, // Hide dots for ticker effect
    infinite: true,
    speed: 5000, // Slow smooth speed
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Continuous
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <Box sx={resultStyles.section} id="results">
      <Container maxWidth="lg">
        <Box sx={resultStyles.header}>
          <Typography variant="overline" color="secondary.dark" fontWeight={800} letterSpacing={2}>
            HALL OF FAME
          </Typography>
          <Typography variant="h3" fontWeight={700} sx={{ mt: 1 }}>
            Our Proven Track Record
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: '600px', mx: 'auto' }}>
            Consistent results in JEE, NEET, and Boards year after year.
          </Typography>
        </Box>

        <Box sx={resultStyles.carouselWrapper}>
          <Slider {...settings}>
            {dummyData.results.map((student) => (
              <Box key={student.id} sx={{ p: 1, height: '420px' }} onClick={() => handleOpen(student)}>
                <Box sx={resultStyles.studentCard}>
                  <Box component="img" src={student.image} alt={student.name} sx={resultStyles.studentImage} />
                  <Box sx={resultStyles.cardContent}>
                    <Box sx={resultStyles.rankBadge}>{student.rank}</Box>
                    <Typography variant="h6" fontWeight={700} gutterBottom>{student.name}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>{student.course}</Typography>

                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: 'primary.main' }}>
                      <PlayCircleOutlineIcon />
                      <Typography variant="button" fontWeight={700}>Watch Story</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Video Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={resultStyles.modalContent}>
            <IconButton
              onClick={handleClose}
              sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, bgcolor: 'rgba(255,255,255,0.8)' }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={resultStyles.videoContainer}>
              {selectedStudent && (
                <ReactPlayer
                  url={selectedStudent.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing={true}
                />
              )}
            </Box>

            <Box sx={resultStyles.detailsContainer}>
              {selectedStudent && (
                <>
                  <Typography variant="overline" color="secondary.dark" fontWeight={800}>
                    STUDENT SUCCESS STORY
                  </Typography>
                  <Typography variant="h3" fontWeight={700} sx={{ mt: 1, mb: 2 }}>
                    Know {selectedStudent.name.split(' ')[0]}'s Story
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                    <Box sx={{ bgcolor: 'primary.light', color: 'primary.main', px: 2, py: 1, borderRadius: 2, fontWeight: 600 }}>
                      {selectedStudent.rank}
                    </Box>
                    <Box sx={{ bgcolor: 'background.default', px: 2, py: 1, borderRadius: 2, fontWeight: 600 }}>
                      {selectedStudent.course}
                    </Box>
                  </Box>

                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
                    "{selectedStudent.story}"
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Modal>

      </Container>
    </Box>
  );
};

export default Results;
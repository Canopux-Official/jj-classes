import { useState } from 'react';
import { Box, Container, Typography, Modal, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ReactPlayer from 'react-player';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { resultStyles } from './Results.styles';
import dummyData from '../../../data/dummyData.json';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpen = (student: StudentResult) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  // We duplicate the data to create a seamless infinite loop
  // If you have very few items (less than 5), you might want to triple it: [...data, ...data, ...data]
  const marqueeItems = [...dummyData.results, ...dummyData.results];

  return (
    <Box sx={resultStyles.section} id="results">
      <Container maxWidth="xl">
        <Box sx={resultStyles.header}>
          <Typography variant="overline" color="secondary.contrastText" fontWeight={800} letterSpacing={1.5} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
            WALL OF FAME
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ mt: 1, color: 'primary.main' }}>
            Our Shining Stars
          </Typography>
        </Box>

        {/* CSS MARQUEE CONTAINER */}
        <Box sx={resultStyles.marqueeWrapper}>
          <Box sx={resultStyles.marqueeTrack}>
            {marqueeItems.map((student, index) => (
              <Box
                key={`${student.id}-${index}`}
                onClick={() => handleOpen(student)}
                sx={resultStyles.imageCard}
              >
                {/* Rank Badge */}
                <Box sx={resultStyles.rankBadge}>{student.rank}</Box>

                {/* Image */}
                <Box component="img" src={student.image} alt={student.name} className="card-image" sx={resultStyles.image} />

                {/* Hover Overlay */}
                <Box className="play-overlay" sx={resultStyles.playOverlay}>
                  <PlayCircleFilledWhiteIcon sx={{ fontSize: 60, color: 'white' }} />
                </Box>

                {/* Name Tag */}
                <Box sx={resultStyles.nameTag}>
                  <Typography variant="h6" fontWeight={700}>{student.name}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>{student.course}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={resultStyles.modalContent}>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 10, top: 10, zIndex: 10, color: isMobile ? 'white' : 'grey.500' }}>
              <CloseIcon />
            </IconButton>

            {/* 9:16 Video Section */}
            <Box sx={resultStyles.videoSection}>
              {selectedStudent && (
                <Box sx={{ width: '100%', height: '100%', maxHeight: '600px', aspectRatio: '9/16' }}>
                  <ReactPlayer
                    src={selectedStudent.videoUrl}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              )}
            </Box>

            {/* Details Section */}
            <Box sx={resultStyles.detailsSection}>
              {selectedStudent && (
                <>
                  <Typography variant="overline" color="secondary.main" fontWeight={700}>
                    SUCCESS STORY
                  </Typography>
                  <Typography variant="h4" fontWeight={800} gutterBottom>
                    {selectedStudent.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                    <Box sx={{ px: 2, py: 0.5, bgcolor: 'primary.main', color: 'white', borderRadius: 1, fontSize: '0.8rem' }}>
                      {selectedStudent.rank}
                    </Box>
                    <Box sx={{ px: 2, py: 0.5, bgcolor: 'secondary.light', color: 'white', borderRadius: 1, fontSize: '0.8rem' }}>
                      {selectedStudent.course}
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem' }}>
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
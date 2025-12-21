import { Box, Container, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { resultStyles } from './Results.styles';

import result1 from '../../../assets/results/result1.png';
import result2 from '../../../assets/results/result2.png';
import result3 from '../../../assets/results/result3.png';

const Results = () => {
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

        {/* CUSTOM GRID LAYOUT */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, // 1 column mobile, 2 columns desktop
          gap: 4,
          alignItems: 'start' 
        }}>
          
          {/* TOP LEFT: Result 2 */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Paper elevation={4} sx={{ borderRadius: 4, overflow: 'hidden' }}>
              <Box component="img" src={result2} alt="Result 2" 
                sx={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', display: 'block' }} 
              />
            </Paper>
          </motion.div>

          {/* TOP RIGHT: Result 3 */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Paper elevation={4} sx={{ borderRadius: 4, overflow: 'hidden' }}>
              <Box component="img" src={result3} alt="Result 3" 
                sx={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', display: 'block' }} 
              />
            </Paper>
          </motion.div>

          {/* BOTTOM ROW: Result 1 (Adjusted Size) */}
          <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' }, display: 'flex', justifyContent: 'center' }}> 
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ width: '100%', maxWidth: '900px' }} // Restrict width so it doesn't look stretched
            >
              <Paper elevation={6} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                <Box component="img" src={result1} alt="Main Result 1" 
                  sx={{ 
                    width: '100%', 
                    height: 'auto', 
                    maxHeight: '400px', // REDUCED HEIGHT (Was 600px)
                    objectFit: 'contain', 
                    display: 'block',
                    bgcolor: 'white' // Optional background if image has transparency
                  }} 
                />
              </Paper>
            </motion.div>
          </Box>

        </Box>

      </Container>
    </Box>
  );
};

export default Results;
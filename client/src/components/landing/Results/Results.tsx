import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { resultStyles } from './Results.styles';

// Updated imports to ALL .png
import result1 from '../../../assets/results/result3.png';
import result2 from '../../../assets/results/result2.png';
import result3 from '../../../assets/results/result1.png';

const results = [result1, result2, result3];

const Results = () => {
  return (
    <Box sx={resultStyles.section} id="results">
      <Container maxWidth="lg">
        
        {/* Section Header */}
        <Box sx={resultStyles.header}>
          <Typography variant="overline" color="secondary.dark" fontWeight={800} letterSpacing={2}>
            HALL OF FAME
          </Typography>
          <Typography variant="h3" fontWeight={700} sx={{ mt: 1 }}>
            Our Proven Track Record
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: '600px', mx: 'auto' }}>
            Consistent results in JEE, NEET, and Boards year after year. 
            Here are our recent achievers who made us proud.
          </Typography>
        </Box>

        {/* Results Grid */}
        <Grid container spacing={4} justifyContent="center">
          {results.map((img, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Box sx={resultStyles.imageCard}>
                  <img 
                    src={img} 
                    alt={`JJ Classes Result ${index + 1}`} 
                    style={resultStyles.image as any} 
                  />
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default Results;
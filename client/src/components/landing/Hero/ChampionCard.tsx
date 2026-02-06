import { Box, Typography } from '@mui/material';
import { heroStyles } from './Hero.styles';

interface Champion {
    id: number;
    name: string;
    rank: string;
    exam: string;
    image: string;
}

interface ChampionCardProps {
    champion: Champion;
}

const ChampionCard = ({ champion }: ChampionCardProps) => {
    return (
        <Box sx={{ p: 2 }}> {/* Padding for shadow/hover effect space */}
            <Box sx={heroStyles.championCard}>
                <Box
                    component="img"
                    src={champion.image}
                    alt={champion.name}
                    sx={heroStyles.championImage}
                />
                <Box sx={heroStyles.championTag}>
                    {champion.rank}
                </Box>
                <Box sx={heroStyles.championOverlay}>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        {champion.name}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {champion.exam} Topper
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ChampionCard;

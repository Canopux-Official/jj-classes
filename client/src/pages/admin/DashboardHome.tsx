import React from 'react';
import { Typography, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { 
  DashboardContainer, 
  StatsFlexContainer, 
  StatCardWrapper, 
  CardHeader, 
  TrendBadge 
} from './DashboardHome.styles';

const DashboardHome: React.FC = () => {
  const stats = [
    { title: 'Total Students', value: '1,250', trend: '+12%', isPositive: true, icon: <PeopleIcon color="primary" /> },
    { title: 'Total Revenue', value: '₹4.5L', trend: '+8%', isPositive: true, icon: <AttachMoneyIcon color="success" /> },
    { title: 'Active Courses', value: '12', trend: '0%', isPositive: true, icon: <SchoolIcon color="warning" /> },
    { title: 'Dropouts', value: '3', trend: '-2%', isPositive: false, icon: <TrendingDownIcon color="error" /> },
  ];

  return (
    <DashboardContainer>
      <Box mb={1}>
        <Typography variant="h5" fontWeight="700" color="text.primary">
          Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back to the JJ Classes Admin Panel.
        </Typography>
      </Box>

      <StatsFlexContainer>
        {stats.map((stat, index) => (
          <StatCardWrapper key={index}>
            <CardHeader>
              <Typography variant="subtitle2" color="text.secondary" fontWeight="700" textTransform="uppercase" fontSize="0.75rem">
                {stat.title}
              </Typography>
              {stat.icon}
            </CardHeader>
            
            <Box>
              <Typography variant="h4" fontWeight="700" color="text.primary" sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
                {stat.value}
              </Typography>
              <Box mt={2}>
                <TrendBadge isPositive={stat.isPositive}>
                  {stat.trend} {stat.isPositive ? 'Increase' : 'Decrease'}
                </TrendBadge>
              </Box>
            </Box>
          </StatCardWrapper>
        ))}
      </StatsFlexContainer>
    </DashboardContainer>
  );
};

export default DashboardHome;
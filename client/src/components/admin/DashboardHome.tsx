import React from 'react';
import { Typography, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FlagIcon from '@mui/icons-material/Flag';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import {
  DashboardContainer,
  StatsFlexContainer,
  StatCardWrapper,
  CardHeader,
} from './DashboardHome.styles';

const DashboardHome: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,250',
      isPositive: true,
      icon: <PeopleIcon color="primary" />,
    },
    {
      title: 'Active Subjects',
      value: '12',
      isPositive: true,
      icon: <MenuBookIcon color="success" />,
    },
    {
      title: 'Active Streams',
      value: '12',
      isPositive: true,
      icon: <AccountTreeIcon color="info" />,
    },
    {
      title: 'Active Target Exams',
      value: '12',
      isPositive: true,
      icon: <FlagIcon color="warning" />,
    },
    {
      title: 'Current Session',
      value: '2025–26',
      isPositive: true,
      icon: <EventAvailableIcon color="secondary" />,
    },
  ];


  return (
    <DashboardContainer>
      <Box mb={1}>
        <Typography variant="h5" fontWeight="700" color="text.primary">
          Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back to the JJ Institue Of Science Admin Panel.
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

              </Box>
            </Box>
          </StatCardWrapper>
        ))}
      </StatsFlexContainer>
    </DashboardContainer>
  );
};

export default DashboardHome;
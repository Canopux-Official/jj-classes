// LandingPage.tsx
import { ThemeProvider, CssBaseline } from '@mui/material'
import Header from '../../components/landing_new/Header';
import Hero from '../../components/landing_new/Hero';
import Results from '../../components/landing_new/Results';
import Courses from '../../components/landing_new/Courses';
import Faculty from '../../components/landing_new/Faculty';
import FAQ from '../../components/landing_new/FAQ';
import Footer from '../../components/landing_new/Footer';
import theme from '../../components/landing_new/theme/theme';

const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Hero />
      <Results />
      <Courses />
      <Faculty />
      <FAQ />
      <Footer />
    </ThemeProvider>
  );
};

export default LandingPage;
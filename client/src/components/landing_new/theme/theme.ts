import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#001a4d',       // Navy blue
      contrastText: '#f5f1ed',
    },
    secondary: {
      main: '#f5f1ed',       // Cream
      contrastText: '#001a4d',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#5a5a5a',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: { fontFamily: '"Montserrat", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    button: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
        },
      },
    },
  },
})

export default theme
import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material';

const colors = {
  primary: '#08567a',
  secondary: '#eb6041',
  font: '#23272f',
  background: '#eaecec'
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    },
    text: {
      primary: colors.font
    },
    background: {
      default: colors.background
    }
  },

  typography: {
    h2: {
      fontWeight: 600,
      fontSize: '3rem',
      letterSpacing: '0.016em'
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.6rem',
      letterSpacing: '0.016em'
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '1.2rem',
      lineHeight: 1.3
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '1.05rem'
    }
  },

  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 3
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: '#707171'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          letterSpacing: '0.06em'
        }
      }
    }
  }
});

export const appTheme = responsiveFontSizes(theme);

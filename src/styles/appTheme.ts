import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material';

const colors = {
  primary: '#28b4a0',
  secondary: '#e96e50',
  font: '#3c3c3d',
  background: 'rgba(154,217,208,0.14)',
  divider: '#a6d9d1'
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
    },
    divider: colors.divider
  },

  typography: {
    h3: {
      fontWeight: 500,
      fontSize: '2.125rem',
      letterSpacing: '0.016em'
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.3rem'
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '1.1rem'
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
    }
  }
});

export const appTheme = responsiveFontSizes(theme);

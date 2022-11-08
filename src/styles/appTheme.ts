import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material';
import { customColors } from './customColors';
import { globalStyles } from './globalStyles';

const basicTheme = createTheme({
  palette: {
    primary: {
      main: customColors.primary
    },
    secondary: {
      main: customColors.secondary
    },
    text: {
      primary: customColors.font
    },
    background: {
      default: customColors.background
    }
  },

  typography: {
    h1: {
      fontSize: '3.4rem',
      letterSpacing: '0.016em'
    },
    h2: {
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
    MuiCssBaseline: {
      styleOverrides: globalStyles
    },
    MuiPaper: {
      defaultProps: {
        elevation: 3
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: customColors.backdropBackground,
          color: theme.palette.grey['700']
        })
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

export const appTheme = responsiveFontSizes(basicTheme);

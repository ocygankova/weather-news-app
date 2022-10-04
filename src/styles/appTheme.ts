import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material';

const colors = {
  primary: '#2cc9b2',
  secondary: '#e96e50',
  font: '#3c3c3d',
  background: '#9AD9D019',
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
    }
  }
});

export const appTheme = responsiveFontSizes(theme);

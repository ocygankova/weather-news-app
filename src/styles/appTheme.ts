import { createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#f4f4f4'
    }
  },
  typography: {
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.3rem'
    }
  }
});

export const appTheme = responsiveFontSizes(theme);

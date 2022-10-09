import { ReactNode } from 'react';
import { Paper, useMediaQuery, useTheme } from '@mui/material';

interface MainContextPaperProps {
  children?: ReactNode;
}

function MainContextPaper(props: MainContextPaperProps) {
  const theme = useTheme();
  const isWidthXs = useMediaQuery(theme.breakpoints.down('sm'));
  const { children } = props;

  return (
    <Paper elevation={isWidthXs ? 0 : 3} square={isWidthXs} sx={{ overflow: 'hidden' }}>
      {children}
    </Paper>
  );
}

export default MainContextPaper;

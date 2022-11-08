import { ReactNode } from 'react';
import { Paper, useMediaQuery, useTheme } from '@mui/material';

interface MainContextPaperProps {
  children?: ReactNode;
  overflow?: string;
}

function MainContextPaper({ children, overflow }: MainContextPaperProps) {
  const theme = useTheme();
  const isWidthXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper elevation={isWidthXs ? 0 : 3} square={isWidthXs} sx={{ overflow: overflow ?? 'hidden' }}>
      {children}
    </Paper>
  );
}

export default MainContextPaper;

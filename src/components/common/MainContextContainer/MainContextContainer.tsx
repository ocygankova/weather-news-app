import { ElementType, ReactNode } from 'react';
import { Breakpoint, Container, useMediaQuery, useTheme } from '@mui/material';

interface MainContextContainerProps {
  children?: ReactNode;
  maxWidth?: false | Breakpoint;
  component: ElementType<any>;
  marginTop?: string | number;
}

function MainContextContainer({
  children,
  maxWidth,
  component,
  marginTop
}: MainContextContainerProps) {
  const theme = useTheme();
  const isWidthXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      maxWidth={maxWidth}
      component={component}
      sx={{ mb: 7, mt: marginTop ?? 7 }}
      disableGutters={isWidthXs}>
      {children}
    </Container>
  );
}

export default MainContextContainer;

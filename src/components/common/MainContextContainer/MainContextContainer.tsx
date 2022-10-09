import { ElementType, ReactNode } from 'react';
import { Breakpoint, Container, useMediaQuery, useTheme } from '@mui/material';

interface MainContextContainerProps {
  children?: ReactNode;
  maxWidth?: false | Breakpoint | undefined;
  component: ElementType<any>;
}

function MainContextContainer(props: MainContextContainerProps) {
  const theme = useTheme();
  const isWidthXs = useMediaQuery(theme.breakpoints.down('sm'));
  const { children, maxWidth, component } = props;

  return (
    <Container maxWidth={maxWidth} component={component} sx={{ my: 7 }} disableGutters={isWidthXs}>
      {children}
    </Container>
  );
}

export default MainContextContainer;

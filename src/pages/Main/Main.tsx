import { Outlet } from 'react-router-dom';
import { Container, useMediaQuery, useTheme } from '@mui/material';
import { News } from 'components';

function Main() {
  const theme = useTheme();
  const isWidthXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl" component="main" sx={{ my: 7 }} disableGutters={isWidthXs}>
      <Outlet />
      <News />
    </Container>
  );
}

export default Main;

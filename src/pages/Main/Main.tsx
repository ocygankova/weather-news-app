import { Container, useMediaQuery, useTheme } from '@mui/material';
import { Hero, News } from 'components';

function Main() {
  const theme = useTheme();
  const isWidthXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="md" component="main" sx={{ my: 7 }} disableGutters={isWidthXs}>
      <Hero />
      <News />
    </Container>
  );
}

export default Main;

import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

function Main() {
  return (
    <Container maxWidth="xl" component="main" sx={{ my: 8 }}>
      <Outlet />
    </Container>
  );
}

export default Main;

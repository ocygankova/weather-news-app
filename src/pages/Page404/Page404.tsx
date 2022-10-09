import { Link as RouterLink } from 'react-router-dom';
import { Container, Link, Typography } from '@mui/material';

function Page404() {
  return (
    <Container maxWidth="md" component="main" sx={{ my: 12 }}>
      <Typography variant="h4">
        Page doesn`t exist. Go to{' '}
        <Link component={RouterLink} to="/">
          Main Page
        </Link>{' '}
      </Typography>
    </Container>
  );
}

export default Page404;

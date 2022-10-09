import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { SearchBar } from 'components';
import logo from 'assets/images/logo.svg';

function Navbar() {
  return (
    <AppBar position="fixed">
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box mr={4}>
            <RouterLink to="/">
              <img src={logo} alt="Homepage" />
            </RouterLink>
          </Box>
          <SearchBar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

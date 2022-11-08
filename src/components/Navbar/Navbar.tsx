import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { SearchBar } from 'components';
import logo from 'assets/images/logo.svg';

function Navbar() {
  return (
    <AppBar position="fixed">
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box mr={4}>
            <RouterLink to="/">
              <Box display="flex" alignItems="center">
                <img src={logo} alt="Homepage" />
              </Box>
            </RouterLink>
          </Box>

          <SearchBar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

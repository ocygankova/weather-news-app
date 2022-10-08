import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { SearchBar } from 'components/SearchBar';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="fixed">
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box mr={4}>
            <RouterLink to="/">
              <Box sx={{ width: '42px', height: '42px', backgroundColor: '#fff', color: '#000' }}>
                <WbTwilightIcon />
                <Typography lineHeight={0}>N&W</Typography>
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

import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { SearchBar } from 'components';
import logo from 'assets/images/logo.svg';
import { clearLocationList, clearStatusMessage } from 'redux/actions/location';
import { useAppDispatch } from 'redux/hooks';

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogoClick = () => {
    dispatch(clearLocationList());
    dispatch(clearStatusMessage());
    navigate('/');
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box
            mr={2}
            display="flex"
            alignItems="center"
            sx={{ cursor: 'pointer' }}
            onClick={onLogoClick}>
            <img src={logo} alt="Homepage" />
          </Box>

          <SearchBar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

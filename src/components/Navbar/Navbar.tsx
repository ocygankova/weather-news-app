import { AppBar, Box, Container, Slide, Toolbar, useScrollTrigger } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { SearchBar } from 'components';
import logo from 'assets/images/logo.svg';
import { clearLocationList, clearStatusMessage } from 'redux/actions/location';
import { useAppDispatch } from 'redux/hooks';

interface Props {
  hideOnPageLoad?: boolean;
}

function Navbar({ hideOnPageLoad }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const trigger = useScrollTrigger({
    threshold: 570,
    disableHysteresis: true
  });

  const onLogoClick = () => {
    dispatch(clearLocationList());
    dispatch(clearStatusMessage());
    navigate('/');
  };

  return (
    <Slide appear={false} direction="down" in={!hideOnPageLoad || trigger}>
      <AppBar>
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
    </Slide>
  );
}

export default Navbar;

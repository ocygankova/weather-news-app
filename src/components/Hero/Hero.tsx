import { Box, Button, Typography } from '@mui/material';

import { MainContextPaper } from 'components';
import { useAppDispatch } from 'redux/hooks';
import { showPresetList } from 'redux/actions/location';
import background from 'assets/images/bg-grass.jpg';

function Hero() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(showPresetList('Popular places:'));
  };

  return (
    <Box pt={{ sm: 6 }} component="section">
      <MainContextPaper>
        <Box
          px={2}
          pt={16}
          pb={24}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover'
          }}>
          <Typography variant="h2" color="common.white" component="h1" textAlign="center" mb={3}>
            Find your weather
          </Typography>
          <Typography variant="h6" color="common.white" textAlign="center" mb={2}>
            Search for your city to get weather forecast
          </Typography>
          <Button variant="contained" color="secondary" disableRipple onClick={handleClick}>
            Search now
          </Button>
        </Box>
      </MainContextPaper>
    </Box>
  );
}

export default Hero;

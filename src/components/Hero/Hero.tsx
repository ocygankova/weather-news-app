import { Box, Typography } from '@mui/material';

import { MainContextPaper, SearchBar } from 'components';
import background from 'assets/images/bg-grass.jpg';

function Hero() {
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

          <SearchBar />
        </Box>
      </MainContextPaper>
    </Box>
  );
}

export default Hero;

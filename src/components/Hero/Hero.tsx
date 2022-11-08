import { Box, Chip, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { MainContextPaper, SearchBar } from 'components';
import { useAppDispatch } from 'redux/hooks';
import { clearLocationList, clearStatusMessage, getSelectedLocation } from 'redux/actions/location';
import { ILocation } from 'models';
import { flagIconUrl } from 'utils/url';
import background from 'assets/images/autumn_banner.jpg';
import { popularLocations } from './popularLocations';

function Hero() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const regionName = new Intl.DisplayNames(['en'], { type: 'region' });

  const handleSelectedLocation = (location: ILocation) => () => {
    dispatch(getSelectedLocation(location));
    dispatch(clearLocationList());
    dispatch(clearStatusMessage());
    navigate('/weather');
  };

  return (
    <Box component="section" mt={{ sm: 7 }}>
      <MainContextPaper overflow="visible">
        <Box
          px={2}
          pt={{ xs: 2, sm: 8 }}
          pb={{ xs: 14, sm: 8 }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: '100% 100%',
            backgroundRepeat: 'no-repeat'
          }}>
          <Typography
            variant="h1"
            color="common.white"
            textAlign="center"
            mb={4}
            sx={{ fontStyle: 'italic', fontWeight: 700 }}>
            Find your weather
          </Typography>
          <SearchBar />

          <Typography variant="h5" color="common.white" textAlign="center" mt={{ xs: 6, sm: 3 }}>
            Search for your city to get weather forecast
          </Typography>
        </Box>

        <Box pt={2} pb={6}>
          <Typography variant="h5" textAlign="center" m={2}>
            Popular places:
          </Typography>
          <Stack direction="row" flexWrap="wrap" justifyContent="center">
            {popularLocations.map((location) => (
              <Chip
                variant="outlined"
                onClick={handleSelectedLocation(location)}
                key={uuidv4()}
                sx={{
                  backgroundColor: 'common.white',
                  '&:hover': {
                    backgroundColor: 'common.white'
                  },
                  m: 1
                }}
                avatar={
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <img src={`${flagIconUrl}${location.country.toLowerCase()}.png`} alt="" />
                  </Box>
                }
                label={`${location.name}, ${regionName.of(location.country)}`}
              />
            ))}
          </Stack>
        </Box>
      </MainContextPaper>
    </Box>
  );
}

export default Hero;

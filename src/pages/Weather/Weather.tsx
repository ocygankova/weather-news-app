import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';

import { getWeather } from 'redux/actions/weather';
import { CurrentWeather } from 'components';

function Weather() {
  const dispatch = useAppDispatch();
  const { currentLocation } = useAppSelector((state) => state.locationReducer);

  useEffect(() => {
    if (currentLocation) dispatch(getWeather(currentLocation.lat, currentLocation.lon));
  }, [dispatch, currentLocation]);

  return (
    <Box pt={10}>
      <Container maxWidth="lg">
        {currentLocation ? (
          <>
            <Typography variant="h4">
              Showing weather for {currentLocation.name}, {currentLocation.country}
            </Typography>

            <CurrentWeather />
          </>
        ) : (
          <Typography variant="h5">Please provide the location to view weather details.</Typography>
        )}
      </Container>
    </Box>
  );
}

export default Weather;

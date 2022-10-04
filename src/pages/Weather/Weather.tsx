import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Box, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';

import { getWeather } from 'redux/actions/weather';
import { CurrentWeather, DailyWeather } from 'components';

function Weather() {
  const dispatch = useAppDispatch();
  const { selectedLocation } = useAppSelector((state) => state.locationReducer);

  useEffect(() => {
    if (selectedLocation) dispatch(getWeather(selectedLocation.lat, selectedLocation.lon));
  }, [dispatch, selectedLocation]);

  const regionName = new Intl.DisplayNames(['en'], { type: 'region' });

  return (
    <Box pt={6}>
      {selectedLocation ? (
        <>
          <Box maxWidth="md" component="section" mx="auto" mb={4}>
            <Paper sx={{ overflow: 'hidden' }}>
              <Box sx={{ backgroundColor: 'primary.main', p: 2 }}>
                <Typography variant="h3" maxWidth="md" mx={{ md: 'auto' }} color="common.white">
                  Currently in {selectedLocation.name}, {regionName.of(selectedLocation.country)}
                </Typography>
              </Box>

              <CurrentWeather />
            </Paper>
          </Box>

          <DailyWeather />
        </>
      ) : (
        <Typography variant="h5">Please provide the location to view weather details.</Typography>
      )}
    </Box>
  );
}

export default Weather;

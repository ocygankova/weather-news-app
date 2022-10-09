import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';

import { getWeather } from 'redux/actions/weather';
import { CurrentWeather, DailyWeather, MainContextContainer, MainContextPaper } from 'components';

function Weather() {
  const dispatch = useAppDispatch();
  const { selectedLocation } = useAppSelector((state) => state.location);
  const { errorMessage, isLoading } = useAppSelector((state) => state.weather);

  const regionName = new Intl.DisplayNames(['en'], { type: 'region' });

  useEffect(() => {
    if (selectedLocation) dispatch(getWeather(selectedLocation.lat, selectedLocation.lon));
  }, [dispatch, selectedLocation]);

  const renderErrorMessage = () => {
    return <Typography>{errorMessage}</Typography>;
  };

  const renderWeather = () => {
    return selectedLocation ? (
      <>
        <Box component="section" mb={4}>
          <MainContextPaper>
            <Box sx={{ backgroundColor: 'primary.main', p: 2, pt: 5 }}>
              <Typography variant="h3" mx={{ md: 'auto' }} color="common.white">
                Currently in {selectedLocation.name}, {regionName.of(selectedLocation.country)}
              </Typography>
            </Box>

            <CurrentWeather />
          </MainContextPaper>
        </Box>

        <DailyWeather />
      </>
    ) : (
      <Typography variant="h5">Please provide the location to view weather details.</Typography>
    );
  };

  const renderContent = () => {
    return errorMessage ? renderErrorMessage() : renderWeather();
  };

  return (
    <MainContextContainer maxWidth="md" component="main">
      <Box pt={{ sm: 6 }}>
        {isLoading ? (
          <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          renderContent()
        )}
      </Box>
    </MainContextContainer>
  );
}

export default Weather;

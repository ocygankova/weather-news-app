import { Box, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { SyntheticEvent, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import GrainIcon from '@mui/icons-material/Grain';
import SouthIcon from '@mui/icons-material/South';
import CompressIcon from '@mui/icons-material/Compress';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import { MainContextPaper } from 'components';
import { weatherIconUrl } from 'utils/url';
import TabPanel from './TabPanel';

function DailyWeather() {
  const { timezone, daily } = useAppSelector((state) => state.weather.weather);
  const [weekdays, setWeekdays] = useState<string[]>([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    setWeekdays(['Tomorrow']);
    daily
      .slice(2)
      .map((item) =>
        setWeekdays((prevState) => [
          ...prevState,
          DateTime.fromSeconds(item.dt).setZone(timezone).toFormat('cccc')
        ])
      );
  }, [daily, timezone]);

  useEffect(() => {
    setTabValue(0);
  }, [daily]);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box component="section" mb={4}>
      <MainContextPaper>
        <Box
          sx={{
            backgroundColor: 'primary.main'
          }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            sx={{
              '& .MuiButtonBase-root': {
                typography: 'subtitle2',
                textTransform: 'capitalize',
                color: 'common.white'
              },
              '& .MuiButtonBase-root.Mui-selected': {
                color: 'text.primary',
                backgroundColor: 'common.white'
              },
              '& .MuiTabs-indicator': {
                transition: 'none',
                backgroundColor: 'common.white'
              },
              '& .MuiSvgIcon-root': {
                fontSize: '2.4rem'
              }
            }}>
            {weekdays.map((item) => (
              <Tab key={uuidv4()} label={item} />
            ))}
          </Tabs>
        </Box>

        {daily
          .slice(1)
          .map(
            (
              {
                weather,
                temp,
                sunrise,
                sunset,
                uvi,
                pop,
                dt,
                humidity,
                pressure,
                wind_deg,
                wind_speed
              },
              index
            ) => (
              <TabPanel key={uuidv4()} value={tabValue} index={index}>
                <Typography mr={2} variant="subtitle1">
                  {DateTime.fromSeconds(dt).setZone(timezone).toFormat('cccc, d LLLL')}
                </Typography>

                <Stack
                  spacing={{ xs: 2, md: 6 }}
                  direction={{ xs: 'column', sm: 'row' }}
                  sx={{
                    pt: 1,
                    pl: { sm: 2, md: 4 },
                    alignItems: 'center'
                  }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-around"
                    flexWrap="wrap">
                    <Stack spacing={1}>
                      <Typography variant="h5" component="span">
                        {temp.min.toFixed()}&deg;C
                      </Typography>
                      <Typography variant="h5" component="span">
                        {temp.max.toFixed()}&deg;C
                      </Typography>
                    </Stack>
                    <img src={`${weatherIconUrl}${weather[0].icon}@2x.png`} alt={weather[0].main} />
                    <Box sx={{ pl: 1, py: 0.2, borderLeft: 2, borderColor: 'primary.light' }}>
                      <Typography variant="subtitle2" component="span">
                        {weather[0].description.charAt(0).toUpperCase() +
                          weather[0].description.slice(1)}
                      </Typography>
                    </Box>
                  </Stack>

                  <Paper
                    variant="outlined"
                    sx={{
                      px: { xs: 1, md: 2 },
                      py: 2
                    }}>
                    <Stack spacing={1}>
                      <Stack direction="row" flexWrap="wrap">
                        <Stack direction="row" spacing={0.5} pb={2} mr={3}>
                          <GrainIcon />
                          <Typography variant="subtitle2" component="span">
                            {(pop * 100).toFixed()}%
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} pb={2} mr={3}>
                          <SouthIcon sx={{ transform: `rotate(${wind_deg}deg)` }} />
                          <Typography variant="subtitle2" component="span">
                            {wind_speed.toFixed()}m/s
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} pb={2} mr={3}>
                          <OpacityIcon />
                          <Typography variant="subtitle2" component="span">
                            {humidity}%
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} pb={2}>
                          <CompressIcon />
                          <Typography variant="subtitle2" component="span">
                            {pressure}hPa
                          </Typography>
                        </Stack>
                      </Stack>

                      <Stack direction="row" spacing={0.5}>
                        <WbSunnyOutlinedIcon color="secondary" />
                        <Typography>
                          Sunrise at{' '}
                          {DateTime.fromSeconds(sunrise).setZone(timezone).toFormat('HH:mm')},
                          sunset at{' '}
                          {DateTime.fromSeconds(sunset).setZone(timezone).toFormat('HH:mm. ')}
                          <Typography noWrap component="span">
                            UV index: {uvi.toFixed()}
                          </Typography>
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                </Stack>
              </TabPanel>
            )
          )}
      </MainContextPaper>
    </Box>
  );
}

export default DailyWeather;

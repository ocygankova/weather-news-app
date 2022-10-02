import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { SyntheticEvent, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import GrainIcon from '@mui/icons-material/Grain';
import SouthIcon from '@mui/icons-material/South';
import CompressIcon from '@mui/icons-material/Compress';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import TabPanel from 'components/DailyWeather/TabPanel';
import { weatherIconUrl } from 'utils/url';

function DailyWeather() {
  const { timezone, daily } = useAppSelector((state) => state.weatherReducer.weather);
  const [weekdays, setWeekdays] = useState<string[]>([]);
  const [tabValue, setTabValue] = useState(0);

  console.log(daily);

  useEffect(() => {
    setWeekdays(['Today', 'Tomorrow']);
    daily
      .slice(2)
      .map((item) =>
        setWeekdays((prevState) => [
          ...prevState,
          DateTime.fromSeconds(item.dt).setZone(timezone).toFormat('cccc')
        ])
      );
  }, [daily, timezone]);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box maxWidth="md" component="section" py={12}>
      <Box sx={{ width: '100%' }}>
        <Box>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            allowScrollButtonsMobile>
            {weekdays.map((item) => (
              <Tab key={uuidv4()} label={item} />
            ))}
          </Tabs>
        </Box>

        {daily.map(
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
              <Stack direction="row" flexWrap="wrap">
                <Typography mr={2}>
                  {DateTime.fromSeconds(dt).setZone(timezone).toFormat('cccc, d LLLL.')}
                </Typography>
                <Typography>
                  {weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}
                </Typography>
              </Stack>

              <Stack
                spacing={{ xs: 2, sm: 6, md: 12 }}
                direction={{ xs: 'column', sm: 'row' }}
                sx={{
                  pb: 3,
                  pt: { xs: 1, sm: 3 },
                  pl: { sm: 2, md: 4 },
                  alignItems: 'center'
                }}>
                <Stack direction="row" spacing={{ xs: 6, sm: 2 }} alignItems="center">
                  <Stack spacing={{ xs: 1, sm: 2 }}>
                    <Typography variant="h5">{temp.min.toFixed()}&deg;C</Typography>
                    <Typography variant="h5">{temp.max.toFixed()}&deg;C</Typography>
                  </Stack>
                  <img src={`${weatherIconUrl}${weather[0].icon}@2x.png`} alt={weather[0].main} />
                </Stack>

                <Stack spacing={1}>
                  <Stack direction="row" flexWrap="wrap">
                    <Stack direction="row" spacing={0.5} pb={2} mr={3}>
                      <GrainIcon />
                      <Typography>{(pop * 100).toFixed()}%</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} pb={2} mr={3}>
                      <SouthIcon sx={{ transform: `rotate(${wind_deg}deg)` }} />
                      <Typography>{wind_speed.toFixed()}m/s</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} pb={2} mr={3}>
                      <CompressIcon />
                      <Typography>{pressure}hPa</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} pb={2} mr={3}>
                      <OpacityIcon />
                      <Typography>{humidity}%</Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={0.5}>
                    <WbSunnyOutlinedIcon />
                    <Typography>
                      Sunrise at {DateTime.fromSeconds(sunrise).setZone(timezone).toFormat('HH:mm')}
                      , sunset at{' '}
                      {DateTime.fromSeconds(sunset).setZone(timezone).toFormat('HH:mm. ')}
                      <Typography noWrap component="span">
                        UV index: {uvi.toFixed()}
                      </Typography>
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </TabPanel>
          )
        )}
      </Box>
    </Box>
  );
}

export default DailyWeather;

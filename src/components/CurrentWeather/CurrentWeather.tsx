import { Box, Divider, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { DateTime } from 'luxon';
import CompressIcon from '@mui/icons-material/Compress';
import GrainIcon from '@mui/icons-material/Grain';
import AirIcon from '@mui/icons-material/Air';
import FlareIcon from '@mui/icons-material/Flare';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { weatherIconUrl } from 'utils/url';

function CurrentWeather() {
  const { current, timezone, daily } = useAppSelector((state) => state.weatherReducer.weather);

  const theme = useTheme();
  const isWidthXs = useMediaQuery(theme.breakpoints.down('sm'));

  const descriptionItems = [
    {
      id: 1,
      title: 'Precipitation',
      data: daily[0]?.pop ? (daily[0].pop * 100).toFixed() : 0,
      unit: '%',
      icon: <GrainIcon />
    },
    { id: 2, title: 'Wind', data: current?.wind_speed.toFixed(), unit: 'm/s', icon: <AirIcon /> },
    { id: 3, title: 'Pressure', data: current?.pressure, unit: 'hPa', icon: <CompressIcon /> },
    { id: 4, title: 'UV Index', data: current?.uvi.toFixed(), unit: '', icon: <FlareIcon /> },
    { id: 5, title: 'Humidity', data: current?.humidity, unit: '%', icon: <OpacityIcon /> }
  ];

  const timesOfDay = [
    { id: 1, title: 'Night', data: daily[0]?.temp.morn.toFixed() },
    { id: 2, title: 'Morning', data: daily[0]?.temp.night.toFixed() },
    { id: 3, title: 'Day', data: daily[0]?.temp.day.toFixed() },
    { id: 4, title: 'Evening', data: daily[0]?.temp.eve.toFixed() }
  ];

  return (
    <Box sx={{ p: 2 }}>
      {current && (
        <Typography mb={1} variant="subtitle1">
          {DateTime.fromSeconds(current.dt)
            .setZone(timezone)
            .toFormat("cccc, d LLL yyyy' | Local time: 'HH:mm")}
        </Typography>
      )}

      {daily[0] && (
        <Stack direction="row" spacing={1}>
          <WbSunnyOutlinedIcon color="secondary" />
          <Typography>
            Sunrise at {DateTime.fromSeconds(daily[0].sunrise).setZone(timezone).toFormat('HH:mm')},
            sunset at {DateTime.fromSeconds(daily[0].sunset).setZone(timezone).toFormat('HH:mm')}
          </Typography>
        </Stack>
      )}

      <Stack
        spacing={{ xs: 4, md: 6 }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ pb: 3, pt: { xs: 1, sm: 3 }, justifyContent: 'center', alignItems: 'center' }}>
        {current && (
          <Stack>
            <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }} alignItems="center">
              <Typography variant={isWidthXs ? 'h1' : 'h2'} component="span">
                {current.temp.toFixed()} &deg;
              </Typography>
              <img
                src={`${weatherIconUrl}${current.weather[0].icon}@2x.png`}
                alt={current.weather[0].main}
              />
            </Stack>
            <Typography>
              Feels like {current.feels_like.toFixed()}&deg;C, {current.weather[0].description}
            </Typography>
          </Stack>
        )}

        <Stack spacing={{ xs: 3, md: 4 }} direction="row" justifyContent="center">
          {timesOfDay.map(({ data, title, id }) => (
            <Stack key={id} spacing={{ sm: 1 }} justifyContent="center" alignItems="center">
              <Typography variant="subtitle2" component="span">
                {title}
              </Typography>
              <Typography component="span">{data}&deg;C</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack
          spacing={{ xs: 1 }}
          direction={{ xs: 'column', sm: 'row' }}
          divider={isWidthXs ? <Divider /> : <Divider orientation="vertical" flexItem />}
          justifyContent="space-around">
          {descriptionItems.map(({ id, title, unit, data, icon }) => (
            <Stack
              key={id}
              spacing={{ xs: 4, sm: 0 }}
              direction={{ xs: 'row-reverse', sm: 'column' }}
              justifyContent="space-between">
              <Typography component="span" variant={isWidthXs ? 'body1' : 'body2'} noWrap>
                {title}
              </Typography>
              <Stack direction="row" spacing={{ xs: 1, sm: 0.5, md: 1 }} alignItems="center">
                {icon}
                <Typography component="span" variant="subtitle1">
                  {data}
                </Typography>
                <Typography component="span" variant="body2">
                  {unit}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

export default CurrentWeather;

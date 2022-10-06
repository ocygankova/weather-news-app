import axios from 'axios';
import { newsApiKey, weatherAppId } from 'utils/apiKeys';

export const locationRequest = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0',
  params: {
    limit: '5',
    appid: weatherAppId
  }
});

export const forecastRequest = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    units: 'metric',
    appid: weatherAppId
  }
});

export const newsRequest = axios.create({
  baseURL: 'https://api.nytimes.com/svc',
  params: {
    'api-key': newsApiKey,
    sort: 'newest'
  }
});

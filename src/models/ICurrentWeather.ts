import { IWeatherDescription } from 'models/IWeatherDescription';

export interface ICurrentWeather {
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  uvi: number;
  wind_deg: number;
  wind_speed: number;
  sunrise: number;
  sunset: number;
  weather: IWeatherDescription[];
}

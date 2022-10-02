import { IWeatherDescription } from 'models/IWeatherDescription';

interface ITemperature {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

interface IFeelsLike {
  day: number;
  eve: number;
  morn: number;
  night: number;
}

export interface IDailyWeather {
  dt: number;
  humidity: number;
  pop: number;
  pressure: number;
  wind_deg: number;
  wind_speed: number;
  uvi: number;
  sunrise: number;
  sunset: number;
  temp: ITemperature;
  feels_like: IFeelsLike;
  weather: IWeatherDescription[];
}

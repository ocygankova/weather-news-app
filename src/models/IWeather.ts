import { ICurrentWeather } from 'models/ICurrentWeather';
import { IDailyWeather } from 'models/IDailyWeather';

export interface IWeather {
  current: ICurrentWeather | null;
  daily: IDailyWeather[];
  timezone: string;
}

import { AppDispatch } from 'redux/store';
import {
  hideLoader,
  receiveCurrentWeather,
  receiveDailyWeather,
  removeErrorMessage,
  showErrorMessage,
  showLoader
} from 'redux/reducers/weatherSlice';
import { IWeather } from 'models';
import { forecastRequest } from 'utils/axios';

export const getWeather = (lat: number, lon: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(removeErrorMessage());
    dispatch(showLoader());
    const res = await forecastRequest.get<IWeather>(`/onecall`, {
      params: { lat, lon, exclude: 'minutely,hourly' }
    });
    dispatch(receiveCurrentWeather(res.data.current));
    dispatch(receiveDailyWeather(res.data.daily));
  } catch (err) {
    console.log(err);
    dispatch(showErrorMessage());
  } finally {
    dispatch(hideLoader());
  }
};

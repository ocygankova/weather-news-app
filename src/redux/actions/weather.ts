import { AppDispatch } from 'redux/store';
import {
  hideLoader,
  receiveWeather,
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
    dispatch(receiveWeather(res.data));
  } catch (err) {
    console.log(err);
    dispatch(showErrorMessage());
  } finally {
    dispatch(hideLoader());
  }
};

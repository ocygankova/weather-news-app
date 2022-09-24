import axios from 'axios';

import { AppDispatch } from '../store';
import {
  hideLoader,
  receiveLocation,
  removeErrorMessage,
  showErrorMessage,
  showLoader
} from '../reducers/locationSlice';
import { ILocation } from '../../models/ILocation';

export const getLocationList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(removeErrorMessage());
    dispatch(showLoader());
    const res = await axios.get<ILocation[]>(
      `http://api.openweathermap.org/geo/1.0/direct?q=lviv&limit=10&appid=634d79ed963436fe7e03ea826c230116`
    );
    dispatch(receiveLocation(res.data));
  } catch (err) {
    console.log(err);
    dispatch(showErrorMessage());
  } finally {
    dispatch(hideLoader());
  }
};

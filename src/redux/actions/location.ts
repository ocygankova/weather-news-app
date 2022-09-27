import { ILocation } from 'models';
import { locationRequest } from 'utils/axios';
import { AppDispatch } from '../store';
import {
  hideLoader,
  receiveLocationList,
  removeErrorMessage,
  showErrorMessage,
  showLoader
} from '../reducers/locationSlice';

export const getLocationList = (cityName: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(removeErrorMessage());
    dispatch(showLoader());
    const res = await locationRequest.get<ILocation[]>(`/direct`, {
      params: { q: cityName }
    });
    dispatch(receiveLocationList(res.data));
  } catch (err) {
    console.log(err);
    dispatch(showErrorMessage());
  } finally {
    dispatch(hideLoader());
  }
};

export const clearLocationList = () => (dispatch: AppDispatch) => {
  dispatch(receiveLocationList([]));
};

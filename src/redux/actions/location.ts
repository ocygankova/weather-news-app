import { AppDispatch } from 'redux/store';
import {
  hideLoader,
  receiveCurrentLocation,
  receiveLocationList,
  removeErrorMessage,
  showErrorMessage,
  showLoader
} from 'redux/reducers/locationSlice';
import { ILocation } from 'models';
import { locationRequest } from 'utils/axios';

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

export const getCurrentLocation = (location: ILocation) => (dispatch: AppDispatch) => {
  dispatch(receiveCurrentLocation(location));
};

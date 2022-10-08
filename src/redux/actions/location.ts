import { AppDispatch } from 'redux/store';
import {
  hideLoader,
  receiveLocationList,
  receiveSelectedLocation,
  removeListTitle,
  removeStatusMessage,
  setListTitle,
  showLoader,
  showStatusMessage
} from 'redux/reducers/locationSlice';
import { ILocation } from 'models';
import { locationRequest } from 'utils/axios';

export const getLocationList = (cityName: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(removeListTitle());
    dispatch(removeStatusMessage());
    dispatch(showLoader());

    const res = await locationRequest.get<ILocation[]>(`/direct`, {
      params: { q: cityName }
    });

    if (!res.data.length) dispatch(showStatusMessage('Location not found...'));
    dispatch(receiveLocationList(res.data));
  } catch (err) {
    console.log(err);
    dispatch(showStatusMessage('Error while loading data...'));
  } finally {
    dispatch(hideLoader());
  }
};

export const clearLocationList = () => (dispatch: AppDispatch) => {
  dispatch(receiveLocationList([]));
};

export const getSelectedLocation = (location: ILocation) => (dispatch: AppDispatch) => {
  dispatch(receiveSelectedLocation(location));
};

export const showPresetList = (title: string) => (dispatch: AppDispatch) => {
  dispatch(setListTitle(title));
};

export const hidePresetList = () => (dispatch: AppDispatch) => {
  dispatch(removeListTitle());
};

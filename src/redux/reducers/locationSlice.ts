import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILocation } from 'models';

interface LocationState {
  locationList: ILocation[];
  currentLocation: ILocation | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  locationList: [],
  currentLocation: sessionStorage.getItem('currentLocation')
    ? JSON.parse(sessionStorage.getItem('currentLocation') || '')
    : null,
  isLoading: false,
  error: null
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    showLoader(state) {
      state.isLoading = true;
    },
    hideLoader(state) {
      state.isLoading = false;
    },
    showErrorMessage(state) {
      state.error = 'Error while loading data';
    },
    removeErrorMessage(state) {
      state.error = null;
    },
    receiveLocationList(state, action: PayloadAction<ILocation[]>) {
      state.locationList = action.payload;
    },
    receiveCurrentLocation(state, action: PayloadAction<ILocation>) {
      state.currentLocation = action.payload;
      sessionStorage.setItem('currentLocation', JSON.stringify(state.currentLocation));
    }
  }
});

export const {
  showErrorMessage,
  removeErrorMessage,
  showLoader,
  hideLoader,
  receiveLocationList,
  receiveCurrentLocation
} = locationSlice.actions;

export default locationSlice.reducer;

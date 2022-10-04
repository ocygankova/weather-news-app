import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILocation } from 'models';

interface LocationState {
  locationList: ILocation[];
  selectedLocation: ILocation | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: LocationState = {
  locationList: [],
  selectedLocation: sessionStorage.getItem('selectedLocation')
    ? JSON.parse(sessionStorage.getItem('selectedLocation') || '')
    : null,
  isLoading: false,
  errorMessage: null
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
    showErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    removeErrorMessage(state) {
      state.errorMessage = null;
    },
    receiveLocationList(state, action: PayloadAction<ILocation[]>) {
      state.locationList = action.payload;
    },
    receiveSelectedLocation(state, action: PayloadAction<ILocation>) {
      state.selectedLocation = action.payload;
      sessionStorage.setItem('selectedLocation', JSON.stringify(state.selectedLocation));
    }
  }
});

export const {
  showErrorMessage,
  removeErrorMessage,
  showLoader,
  hideLoader,
  receiveLocationList,
  receiveSelectedLocation
} = locationSlice.actions;

export default locationSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILocation } from 'models';

interface LocationState {
  locationList: ILocation[];
  selectedLocation: ILocation | null;
  isLoading: boolean;
  statusMessage: string | null;
}

const initialState: LocationState = {
  locationList: [],
  selectedLocation: localStorage.getItem('selectedLocation')
    ? JSON.parse(localStorage.getItem('selectedLocation') || '')
    : null,
  isLoading: false,
  statusMessage: null
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
    showStatusMessage(state, action: PayloadAction<string>) {
      state.statusMessage = action.payload;
    },
    removeStatusMessage(state) {
      state.statusMessage = null;
    },
    receiveLocationList(state, action: PayloadAction<ILocation[]>) {
      state.locationList = action.payload;
    },
    receiveSelectedLocation(state, action: PayloadAction<ILocation>) {
      state.selectedLocation = action.payload;
      localStorage.setItem('selectedLocation', JSON.stringify(state.selectedLocation));
    }
  }
});

export const {
  showStatusMessage,
  removeStatusMessage,
  showLoader,
  hideLoader,
  receiveLocationList,
  receiveSelectedLocation
} = locationSlice.actions;

export default locationSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocation } from 'models';

interface LocationState {
  locationList: ILocation[];
  isLoading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  locationList: [],
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
    }
  }
});

export const { showErrorMessage, removeErrorMessage, showLoader, hideLoader, receiveLocationList } =
  locationSlice.actions;

export default locationSlice.reducer;

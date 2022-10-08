import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILocation } from 'models';

interface LocationState {
  locationList: ILocation[];
  selectedLocation: ILocation | null;
  isLoading: boolean;
  statusMessage: string | null;
  listTitle: string | null;
}

const initialState: LocationState = {
  locationList: [],
  selectedLocation: sessionStorage.getItem('selectedLocation')
    ? JSON.parse(sessionStorage.getItem('selectedLocation') || '')
    : null,
  isLoading: false,
  statusMessage: null,
  listTitle: null
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
      sessionStorage.setItem('selectedLocation', JSON.stringify(state.selectedLocation));
    },
    setListTitle(state, action: PayloadAction<string>) {
      state.listTitle = action.payload;
    },
    removeListTitle(state) {
      state.listTitle = null;
    }
  }
});

export const {
  showStatusMessage,
  removeStatusMessage,
  showLoader,
  hideLoader,
  receiveLocationList,
  receiveSelectedLocation,
  setListTitle,
  removeListTitle
} = locationSlice.actions;

export default locationSlice.reducer;

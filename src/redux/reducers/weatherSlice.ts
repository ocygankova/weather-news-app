import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWeather } from 'models';

interface WeatherState {
  weather: IWeather;
  isLoading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weather: {
    current: null,
    daily: [],
    timezone: ''
  },
  isLoading: false,
  error: null
};

const weatherSlice = createSlice({
  name: 'weather',
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
    receiveWeather(state, action: PayloadAction<IWeather>) {
      state.weather = action.payload;
    }
  }
});

export const { showLoader, hideLoader, showErrorMessage, removeErrorMessage, receiveWeather } =
  weatherSlice.actions;

export default weatherSlice.reducer;

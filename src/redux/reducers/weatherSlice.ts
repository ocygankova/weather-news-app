import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentWeather, IDailyWeather } from 'models';

interface WeatherState {
  currentWeather: ICurrentWeather | null;
  dailyWeather: IDailyWeather[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  dailyWeather: [],
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
    receiveCurrentWeather(state, action: PayloadAction<ICurrentWeather>) {
      state.currentWeather = action.payload;
    },
    receiveDailyWeather(state, action: PayloadAction<IDailyWeather[]>) {
      state.dailyWeather = action.payload;
    }
  }
});

export const {
  showLoader,
  hideLoader,
  showErrorMessage,
  removeErrorMessage,
  receiveDailyWeather,
  receiveCurrentWeather
} = weatherSlice.actions;

export default weatherSlice.reducer;

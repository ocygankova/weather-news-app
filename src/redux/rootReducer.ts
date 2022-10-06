import { combineReducers } from 'redux';

import locationReducer from './reducers/locationSlice';
import weatherReducer from './reducers/weatherSlice';
import newsReducer from './reducers/newsSlice';

export const rootReducer = combineReducers({
  location: locationReducer,
  weather: weatherReducer,
  news: newsReducer
});

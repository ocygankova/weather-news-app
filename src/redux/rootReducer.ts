import { combineReducers } from 'redux';

import locationReducer from './reducers/locationSlice';
import weatherReducer from './reducers/weatherSlice';

export const rootReducer = combineReducers({
  locationReducer,
  weatherReducer
});

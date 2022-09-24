import { combineReducers } from 'redux';

import locationReducer from './reducers/locationSlice';

export const rootReducer = combineReducers({
  locationReducer
});

import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer
});

// export const setupStore = () => {
//   return configureStore({
//     reducer: rootReducer
//   });
// };

// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';

import App from 'App';
import reportWebVitals from 'reportWebVitals';
import { store } from 'redux/store';
import { appTheme } from 'styles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

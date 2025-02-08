import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Router from './routes/Router';
import store from './store';
import { baselightTheme } from "./theme/DefaultColors";

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {routing}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
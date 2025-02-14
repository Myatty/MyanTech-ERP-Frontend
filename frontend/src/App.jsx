import React, { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import Router from "./routes/Router";
import store from "./store";
import { baselightTheme } from "./theme/DefaultColors";

function AppContent() {
  const routing = useRoutes(Router);
  const mode = useSelector((state) => state.themes.mode);
  const theme = baselightTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;

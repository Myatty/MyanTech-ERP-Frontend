import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import RouterConfig from "./routes/Router";
import store from "./store";
import { baselightTheme } from "./theme/DefaultColors";

function App() {
  const routing = useRoutes(RouterConfig); // Now correctly uses routes
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing} {/* Routes will be rendered here */}
    </ThemeProvider>
  );
}

export default App;

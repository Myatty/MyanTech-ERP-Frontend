import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import { shadows } from "./Shadows";

const baselightTheme = (mode) => {
  return createTheme({
    direction: "ltr",
    palette: {
      mode: mode,
      primary: {
        main: "#5D87FF",
        light: "#ECF2FF",
        dark: "#4570EA",
      },
      secondary: {
        main: "#49BEFF",
        light: "#E8F7FF",
        dark: "#23afdb",
      },
      success: {
        main: "#13DEB9",
        light: "#E6FFFA",
        dark: "#02b3a9",
        contrastText: "#ffffff",
      },
      info: {
        main: "#539BFF",
        light: "#EBF3FE",
        dark: "#1682d4",
        contrastText: "#ffffff",
      },
      error: {
        main: "#FA896B",
        light: "#FDEDE8",
        dark: "#f3704d",
        contrastText: "#ffffff",
      },
      warning: {
        main: "#FFAE1F",
        light: "#FEF5E5",
        dark: "#ae8e59",
        contrastText: "#ffffff",
      },
      purple: {
        A50: "#EBF3FE",
        A100: "#6610f2",
        A200: "#557fb9",
      },
      grey: {
        100: "#F2F6FA",
        200: "#EAEFF4",
        300: "#DFE5EF",
        400: "#7C8FAC",
        500: "#5A6A85",
        600: "#2A3547",
      },
      text: {
        primary: mode === "light" ? "#2A3547" : "#fff",
        secondary: mode === "light" ? "#5A6A85" : "#babdc2",
      },
      action: {
        disabledBackground: "rgba(73,82,88,0.12)",
        hoverOpacity: 0.02,
        hover: "#f6f9fc",
      },
      divider: "#e5eaef",
    },
    components: {
      MuiGrid: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#1E1E1E" : "#ffffff",
            color: mode === "dark" ? "#ffffff" : "#000000",
            borderColor: mode === "dark" ? "#333" : "#ddd",
          },
          columnHeaders: {
            backgroundColor: mode === "dark" ? "#2D2D2D" : "#F5F5F5",
            color: mode === "dark" ? "#ffffff" : "#000000",
          },
          row: {
            "&:nth-of-type(even)": {
              backgroundColor: mode === "dark" ? "#242424" : "#F9F9F9",
            },
            "&:hover": {
              backgroundColor: mode === "dark" ? "#333" : "#EAEAEA",
            },
          },
        },
      },
    },
    typography,
    shadows,
  });
};

export { baselightTheme };

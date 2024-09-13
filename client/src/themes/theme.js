import { createTheme } from "@mui/material/styles";
import "../index.css";

const theme = createTheme({
  palette: {
    primary: { main: "#006fff" },
    secondary: { main: "rgb(51, 187, 207, 0.4)" },
  },
  typography: {
    fontFamily: [
      "IBM Plex Sans",
      "Poppins",
      "-apple-system",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const tableTheme = createTheme({
  palette: {
    primary: { main: "#006fff" },
    secondary: { main: "rgb(51, 187, 207, 0.4)" },
  },
  typography: {
    fontFamily: [
      "IBM Plex Sans",
      "Poppins",
      "-apple-system",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "0.75rem",
          border: "1px solid #e0e0e4",
        },
      },
    },
  },
});

const schoolTableTheme = createTheme({
  palette: {
    primary: { main: "#006fff" },
    secondary: { main: "rgb(51, 187, 207, 0.4)" },
  },
  typography: {
    fontFamily: [
      "IBM Plex Sans",
      "Poppins",
      "-apple-system",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "0.75rem",
          boxShadow: "none",
          border: "1px solid #e0e0e4",
        },
      },
    },
  },
});

export { theme, tableTheme, schoolTableTheme };

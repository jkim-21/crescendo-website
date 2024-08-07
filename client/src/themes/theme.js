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
          border: 1,
        },
      },
    },
  },
});

export { theme, tableTheme };

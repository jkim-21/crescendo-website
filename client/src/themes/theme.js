import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: { main: '#bc232a', },
      secondary: { main: '#c9dde9' },
    },
    typography:{
        fontFamily: [
            'Poppins',
            '-apple-system',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
    }
  });

  export default theme;
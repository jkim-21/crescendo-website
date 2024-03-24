import { createTheme } from '@mui/material/styles';
import '../index.css'

const theme = createTheme({
    palette: {
      primary: { main: "rgb(51, 187, 207)"},
      secondary: { main: 'rgb(51, 187, 207, 0.4)' },
    },
    typography:{
        fontFamily: [
            'IBM Plex Sans',
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
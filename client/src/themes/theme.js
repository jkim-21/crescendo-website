import { createTheme } from '@mui/material/styles';
import '../index.css'

const theme = createTheme({
    palette: {
      primary: { main: '#33bbcf'},
      secondary: { main: 'rgb(51, 187, 207, 0.4)' },
      secondary: { main: '#FFF' },
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
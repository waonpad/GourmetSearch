import { grey, orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    //   xs: false;
    //   sm: false;
    smd: true;
    //   md: false;
    lmd: true;
    //   lg: false;
    //   xl: false;
  }
}

export const appTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      smd: 769,
      md: 900,
      lmd: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: orange[300],
      contrastText: grey[900],
    },
    background: {
      default: '#f8f8f8',
    },
    text: { primary: grey[700] },
  },
  typography: {
    fontFamily: ['Roboto', 'Noto Sans JP'].join(','),
    // fontSize: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflowY: 'scroll',
        },
        img: { verticalAlign: 'bottom' },
      },
    },
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
      },
    },
    MuiGrid: {
      defaultProps: {
        height: 'fit-content',
      },
    },
  },

  // sx={{ '&:focus': { outline: 'none' } }} を使うとクリックした後のフォーカスを消せる
});

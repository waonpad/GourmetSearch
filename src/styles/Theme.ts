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
    // primary: {
    //   main: '#f00',
    //   contrastText: '#e1e1e1',
    // },
    background: {
      default: '#f8f8f8',
    },
    // text: { primary: '#e1e1e1' },
  },
  typography: {
    fontFamily: ['Roboto', 'Noto Sans'].join(','),
    // fontSize: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        img: { verticalAlign: 'bottom' },
      },
    },
    MuiContainer: {
      defaultProps: {
        sx: { px: 0, '@media (min-width: 600px)': { px: 0 } },
      },
    },
    MuiGrid: {
      defaultProps: {
        height: 'fit-content',
      },
    },
    // MuiDrawer: {
    //   styleOverrides: {
    //     paper: {
    //       background: '#353535',
    //     },
    //   },
    // },
  },

  // sx={{ '&:focus': { outline: 'none' } }} を使うとクリックした後のフォーカスを消せる
});

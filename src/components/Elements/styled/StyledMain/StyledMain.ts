import { styled } from '@mui/material/styles';

import { DRAWER_WIDTH, SHIFT_MAIN_CONTENT_BREAKPOINT } from '@/config';

export const StyledMain = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0),
  },
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    [theme.breakpoints.up(SHIFT_MAIN_CONTENT_BREAKPOINT)]: {
      // mdにすると妙なズレ方をするのでlmdにしている
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
}));

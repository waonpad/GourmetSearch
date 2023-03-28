import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import type { Theme } from '@mui/material/styles';

interface StyledAppBarProps extends MuiAppBarProps {
  theme: Theme;
  open?: boolean;
  drawerWidth: number;
}

export const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<StyledAppBarProps>(({ theme, open, drawerWidth }: StyledAppBarProps) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

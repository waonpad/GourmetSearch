import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';

import { DRAWER_WIDTH } from '@/config';

import { Link } from '../Link';
import { StyledDrawerHeader } from '../styled';

type DrawerProps = {
  open: boolean;
  handleDrawerClose: () => void;
};

type NavigationItem = {
  name: string;
  to: string;
  icon: JSX.Element;
};

const navigation: NavigationItem[] = [
  {
    name: 'Inbox',
    to: '/inbox',
    icon: <InboxIcon />,
  },
];

export const Drawer = ({ open, handleDrawerClose }: DrawerProps) => {
  const theme = useTheme();

  return (
    <MuiDrawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <StyledDrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </StyledDrawerHeader>
      <Divider />
      <List>
        {navigation.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component={Link} to={item.to}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </MuiDrawer>
  );
};

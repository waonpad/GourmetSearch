import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
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
import { useAuthContext } from '@/lib/auth';

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

export const Drawer = ({ open, handleDrawerClose }: DrawerProps) => {
  const theme = useTheme();
  const auth = useAuthContext();

  const navigation: NavigationItem[] = [
    {
      name: 'Gourmet Search',
      to: '/app/gourmet-search',
      icon: <RestaurantIcon />,
    },
    {
      name: 'Bookmarka',
      to: `/app/gourmet-search/bookmarks/${auth?.user?.uid}/start=1&count=10`,
      icon: <BookmarkIcon />,
    },
  ];

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
      <List disablePadding>
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

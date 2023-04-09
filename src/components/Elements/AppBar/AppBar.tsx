import * as React from 'react';
import { Link } from 'react-router-dom';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

import { APP_NAME, SHIFT_MAIN_CONTENT_BREAKPOINT } from '@/config';
import { useAuthContext } from '@/lib/auth';
import { appTheme } from '@/styles/Theme';

import { Drawer } from '../Drawer';
import { StyledAppBar, StyledDrawerHeader, StyledMain } from '../styled';

export const AppBar = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthContext();

  // SHIFT_MAIN_CONTENT_BREAKPOINTより大きい場合true
  const [open, setOpen] = React.useState<boolean>(
    window.innerWidth > appTheme.breakpoints.values[SHIFT_MAIN_CONTENT_BREAKPOINT]
  );

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClickLogout = () => {
    auth?.signOut();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      {auth?.user ? (
        <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
      ) : (
        <MenuItem component={Link} to="/auth/login">
          Login
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {auth?.user?.displayName ?? 'Guest'}
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            // sx={{ mr: 2, ...(open && { display: 'none' }) }}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            // sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {APP_NAME}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {auth?.user ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <Button color="inherit" size="large" component={Link} to="/auth/login">
                Login
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Drawer open={open} handleDrawerClose={handleDrawerClose} />
      {renderMobileMenu}
      {renderMenu}
      <StyledMain open={open}>
        <StyledDrawerHeader />
        {/* テスト用下padding */}
        <Box pb={10}>{children}</Box>
      </StyledMain>
    </Box>
  );
};

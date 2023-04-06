import { Box, Card, CardContent, CardHeader, Collapse, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { CONSTANTS } from './Shop.constants';

export const StyledShopCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    borderRadius: 0,
  },
}));

export const StyledShopCardHeader = styled(CardHeader)(({ theme }) => ({
  [theme.breakpoints.down(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    padding: theme.spacing(1),
  },
}));

StyledShopCardHeader.defaultProps = {
  titleTypographyProps: {
    variant: 'h6',
    fontWeight: 'bold',
  },
};

export const StyledShopCardMediaWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  [theme.breakpoints.up(CONSTANTS.SHOP_CARD_MEDIA_VISIBLE_CHANGE_TARGET_BREAKPOINT)]: {
    display: 'none',
  },
}));

export const StyledShopCardMediaCollapse = styled(Collapse)(() => ({}));

StyledShopCardMediaCollapse.defaultProps = {
  collapsedSize: CONSTANTS.SHOP_CARD_MEDIA_COLLAPSED_SIZE,
};

export const StyledShopCardMedia = styled('img', {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded?: boolean }>(({ theme, isExpanded }) => ({
  width: '100%',
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  transform: 'translateY(-50%)',
  ...(isExpanded && {
    transform: 'translateY(0)',
  }),
}));

export const StyledShopCardMediaExpandButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: grey[200],
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}));

StyledShopCardMediaExpandButton.defaultProps = {
  size: 'small',
};

export const StyledShopCardContent = styled(CardContent)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.down(CONSTANTS.SHOP_CARD_MEDIA_VISIBLE_CHANGE_TARGET_BREAKPOINT)]: {
    paddingTop: theme.spacing(2),
  },
  [theme.breakpoints.down(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export const StyledShopCardContentLeft = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  [theme.breakpoints.down(CONSTANTS.SHOP_CARD_MEDIA_VISIBLE_CHANGE_TARGET_BREAKPOINT)]: {
    display: 'none',
  },
}));

export const StyledShopCardContentRight = styled(Box)(() => ({}));

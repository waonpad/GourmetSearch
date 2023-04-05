import { Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

import { CONSTANTS } from './ShopList.constants';

export const StyledShopListHeader = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  [theme.breakpoints.up(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
}));

export const StyledShopListDivider = styled(Divider)(({ theme }) => ({
  borderColor: 'inherit',
  [theme.breakpoints.down(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    display: 'block',
  },
  [theme.breakpoints.up(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    display: 'none',
  },
}));

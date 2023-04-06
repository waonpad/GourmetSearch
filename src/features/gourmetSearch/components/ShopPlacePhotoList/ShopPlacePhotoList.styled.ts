import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { CONSTANTS } from './ShopPlacePhotoList.constants';

export const StyledPhotoListHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.up(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    padding: theme.spacing(0),
  },
}));

export const StyledPhotoListItemImage = styled('img', {
  shouldForwardProp: (prop) => prop !== 'isRadius',
})<{ isRadius?: boolean }>(({ theme, isRadius }) => ({
  aspectRatio: '1/1',
  ...(isRadius && {
    borderRadius: theme.shape.borderRadius,
  }),
}));

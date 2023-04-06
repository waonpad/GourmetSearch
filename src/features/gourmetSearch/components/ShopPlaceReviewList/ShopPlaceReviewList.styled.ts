import { Box, Card, CardContent, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

import { CONSTANTS } from './ShopPlaceReviewList.constants';

export const StyledReviewListHeader = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(0),
  paddingRight: theme.spacing(0),
  [theme.breakpoints.down(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export const StyledReviewListCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    borderRadius: 0,
  },
}));

export const StyledReviewListCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(0),
  '&:last-child': {
    paddingBottom: theme.spacing(0),
  },
}));

export const StyledReviewListDivider = styled(Divider, {
  shouldForwardProp: (prop) => prop !== 'isFirst',
})<{ isFirst?: boolean }>(({ theme, isFirst }) => ({
  [theme.breakpoints.up(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    ...(isFirst && {
      display: 'none',
    }),
  },
}));

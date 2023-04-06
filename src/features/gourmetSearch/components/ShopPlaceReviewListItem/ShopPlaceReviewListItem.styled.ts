import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';

import { CONSTANTS } from '../ShopListItem/ShopListItem.constants';

export const StyledReviewListItemCard = styled(Card)({
  width: '100%',
});

StyledReviewListItemCard.defaultProps = {
  square: true,
};

export const StyledReviewListItemCardHeader = styled(CardHeader)(({ theme }) => ({
  [theme.breakpoints.down(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    padding: theme.spacing(1),
  },
}));

StyledReviewListItemCardHeader.defaultProps = {
  titleTypographyProps: {
    variant: 'subtitle1',
    fontWeight: 'bold',
  },
};

export const StyledReviewListItemCardSubheader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const StyledReviewListItemCardContent = styled(CardContent)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
  [theme.breakpoints.down(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { GoogleMapProps } from '@/components/GoogleMap';

import { CONSTANTS } from './constants';

export const googleMapStyle: GoogleMapProps['sx'] = {
  width: '100%',
  height: 0,
  paddingBottom: { xs: '100%', sm: '50%', md: '33.3%' },
};

export const StyledFormCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    borderRadius: 0,
  },
}));

export const StyledFormCardActions = styled(CardActions)(() => ({
  justifyContent: 'space-between',
}));

export const StyledFormCardContent = styled(CardContent)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  [theme.breakpoints.down(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export const StyledFormCardHeader = styled(CardHeader)(({ theme }) => ({
  [theme.breakpoints.down(CONSTANTS.STYLE_CHANGE_TARGET_BREAKPOINT)]: {
    padding: theme.spacing(1),
  },
}));

StyledFormCardHeader.defaultProps = {
  titleTypographyProps: { variant: 'h6' },
};

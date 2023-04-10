import { Stack, Typography, SvgIcon } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { StackProps, SvgIconProps, TypographyProps } from '@mui/material';

type ShopDetailTempleteStackProps = {
  icon: typeof SvgIcon;
  typography: string;
  overrideProps?: {
    stack?: StackProps;
    icon?: SvgIconProps;
    typography?: TypographyProps;
  };
};

export const StyledStack = styled(Stack)({});

StyledStack.defaultProps = {
  direction: 'row',
  gap: 1,
  alignItems: 'center',
};

export const StyledTypography = styled(Typography)({});

StyledTypography.defaultProps = {
  variant: 'body2',
  color: 'text.secondary',
};

export const ShopDetailTempleteStack = ({
  icon,
  typography,
  overrideProps,
}: ShopDetailTempleteStackProps) => {
  return (
    <StyledStack {...overrideProps?.stack}>
      <SvgIcon component={icon} {...overrideProps?.icon} />
      <StyledTypography {...overrideProps?.typography}>{typography}</StyledTypography>
    </StyledStack>
  );
};

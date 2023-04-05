import { Stack, Typography, SvgIcon } from '@mui/material';

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

export const ShopDetailTempleteStackDefaultProps: ShopDetailTempleteStackProps['overrideProps'] = {
  stack: {
    direction: 'row',
    gap: 1,
    alignItems: 'center',
  },
  icon: {},
  typography: {
    variant: 'body2',
    color: 'text.secondary',
  },
};

export const ShopDetailTempleteStack = ({
  icon,
  typography,
  overrideProps = ShopDetailTempleteStackDefaultProps,
}: ShopDetailTempleteStackProps) => {
  return (
    <Stack {...overrideProps.stack}>
      <SvgIcon component={icon} {...overrideProps.icon} />
      <Typography {...overrideProps.typography}>{typography}</Typography>
    </Stack>
  );
};

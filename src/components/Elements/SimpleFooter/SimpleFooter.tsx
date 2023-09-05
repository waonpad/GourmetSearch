import { Box, Typography } from '@mui/material';
import _ from 'lodash';

import { APP_NAME } from '@/config';
import { compositeStyle } from '@/styles/compositeStyle';

import type { BoxProps, TypographyProps } from '@mui/material';

type SimpleFooterProps = {
  wrap?: boolean;
  overrideProps?: {
    box?: BoxProps;
    text?: TypographyProps;
  };
};

const year = new Date().getFullYear();

const simpleFooterDefaultProps: SimpleFooterProps['overrideProps'] = {
  box: {
    sx: {
      ...compositeStyle.centerBoth,
    },
  },
  text: {
    sx: {
      whiteSpace: 'pre-line',
      textAlign: 'center',
    },
  },
};

export const SimpleFooter = ({ wrap = false, overrideProps }: SimpleFooterProps) => {
  const assetProps = _.merge({}, simpleFooterDefaultProps, overrideProps);

  return (
    <Box {...assetProps.box}>
      <Typography {...assetProps.text}>
        Copyright &copy; {year} {wrap && '\n'} {APP_NAME}.
      </Typography>
    </Box>
  );
};

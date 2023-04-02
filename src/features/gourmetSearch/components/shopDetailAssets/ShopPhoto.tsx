import type { ImgHTMLAttributes } from 'react';

import { Box } from '@mui/material';
import _ from 'lodash';

import { hotpepperGourmetShopPhotoSize } from '../../types';

import type { Shop } from '../../types';
import type { BoxProps } from '@mui/material';

type ShopPhotoProps = {
  shop: Shop;
  overrideProps?: {
    wrapper?: BoxProps;
    img?: ImgHTMLAttributes<HTMLImageElement>;
  };
};

export const shopPhotoDefaultProps: ShopPhotoProps['overrideProps'] = {
  wrapper: {
    sx: {
      width: {
        xs: hotpepperGourmetShopPhotoSize.pc.m.width,
        smd: hotpepperGourmetShopPhotoSize.pc.l.width,
      },
      // maxWidth: {
      //   xs: hotpepperGourmetShopPhotoSize.pc.m.width,
      //   smd: hotpepperGourmetShopPhotoSize.pc.l.width,
      // },
    },
  },
  img: {
    style: {
      borderRadius: '4px',
    },
  },
};

export const ShopPhoto = ({ shop, overrideProps }: ShopPhotoProps) => {
  const assetProps = _.merge({}, shopPhotoDefaultProps, overrideProps);

  return (
    <Box {...assetProps.wrapper}>
      <img src={shop.photo.pc.l} alt={shop.name} {...assetProps.img} />
    </Box>
  );
};

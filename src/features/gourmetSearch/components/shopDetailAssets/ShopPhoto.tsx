import { Box } from '@mui/material';

import { hotpepperGourmetShopPhotoSize } from '../../types';

import type { Shop } from '../../types';

export const ShopPhoto = ({ shop }: { shop: Shop }) => {
  return (
    <Box
      sx={{
        width: {
          xs: hotpepperGourmetShopPhotoSize.pc.m.width,
          smd: hotpepperGourmetShopPhotoSize.pc.l.width,
        },
        maxWidth: {
          xs: hotpepperGourmetShopPhotoSize.pc.m.width,
          smd: hotpepperGourmetShopPhotoSize.pc.l.width,
        },
      }}
    >
      <img
        src={shop.photo.pc.l}
        alt={shop.name}
        style={{
          borderRadius: '4px',
        }}
      />
    </Box>
  );
};

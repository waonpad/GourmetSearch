import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Stack, Typography } from '@mui/material';

import type { Shop } from '../../types';

export const ShopAccess = ({ shop }: { shop: Shop }) => {
  return (
    <Stack direction="row" gap={0.5} alignItems={'center'}>
      <FmdGoodIcon />
      <Typography variant="body2" color="text.secondary">
        {shop.access}
      </Typography>
    </Stack>
  );
};

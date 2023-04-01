import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import { Stack, Typography } from '@mui/material';

import type { Shop } from '../../types';

export const ShopNonSmoking = ({ shop }: { shop: Shop }) => {
  return (
    <Stack direction="row" gap={0.5} alignItems={'center'}>
      <SmokeFreeIcon />
      <Typography variant="body2" color="text.secondary">
        {shop.non_smoking}
      </Typography>
    </Stack>
  );
};

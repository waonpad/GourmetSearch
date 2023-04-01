import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Stack, Typography } from '@mui/material';

import type { Shop } from '../../types';

export const ShopDetailMemo = ({ shop }: { shop: Shop }) => {
  return (
    <Stack direction="row" gap={0.5} alignItems={'center'}>
      <BorderColorIcon />
      <Typography variant="body2" color="text.secondary">
        {shop.shop_detail_memo}
      </Typography>
    </Stack>
  );
};

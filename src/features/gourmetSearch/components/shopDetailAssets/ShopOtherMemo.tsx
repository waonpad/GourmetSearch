import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Stack, Typography } from '@mui/material';

import type { Shop } from '../../types';

export const ShopOtherMemo = ({ shop }: { shop: Shop }) => {
  return (
    <Stack direction="row" gap={0.5} alignItems={'center'}>
      <DriveFileRenameOutlineIcon />
      <Typography variant="body2" color="text.secondary">
        {shop.other_memo}
      </Typography>
    </Stack>
  );
};

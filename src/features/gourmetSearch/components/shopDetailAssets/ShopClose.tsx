import EventBusyIcon from '@mui/icons-material/EventBusy';
import { Stack, Typography } from '@mui/material';

import type { Shop } from '../../types';

export const ShopClose = ({ shop }: { shop: Shop }) => {
  return (
    <Stack direction="row" gap={0.5} alignItems={'center'}>
      <EventBusyIcon />
      <Typography variant="body2" color="text.secondary" whiteSpace="pre-wrap">
        {shop.close}
      </Typography>
    </Stack>
  );
};

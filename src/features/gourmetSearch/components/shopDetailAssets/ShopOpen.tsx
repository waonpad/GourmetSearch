import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Stack, Typography } from '@mui/material';

import type { Shop } from '../../types';

export const ShopOpen = ({ shop }: { shop: Shop }) => {
  return (
    <Stack direction="row" gap={0.5} alignItems={'center'}>
      <CalendarMonthIcon />
      <Typography variant="body2" color="text.secondary" whiteSpace="pre-wrap">
        {shop.open.replace(/）/g, `）\n`)}
      </Typography>
    </Stack>
  );
};

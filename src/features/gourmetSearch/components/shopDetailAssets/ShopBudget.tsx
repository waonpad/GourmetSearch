import PaymentsIcon from '@mui/icons-material/Payments';
import { Stack, Typography } from '@mui/material';

import type { Shop } from '../../types';

export const ShopBudget = ({ shop }: { shop: Shop }) => {
  return (
    <Stack direction="row" gap={0.5} alignItems={'center'}>
      <PaymentsIcon />
      <Typography variant="body2" color="text.secondary">
        {shop.budget.name}
      </Typography>
    </Stack>
  );
};

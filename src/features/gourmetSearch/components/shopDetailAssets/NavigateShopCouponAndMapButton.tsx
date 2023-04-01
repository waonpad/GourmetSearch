import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Button } from '@mui/material';

import type { Shop } from '../../types';

const navigateShopCouponAndMapButtonLabel = 'Get coupon and map';

export const NavigateShopCouponAndMapButton = ({ shop }: { shop: Shop }) => {
  return (
    <a href={shop.coupon_urls.pc} target="_blank" rel="noreferrer">
      <Button size="small" startIcon={<ConfirmationNumberIcon />}>
        {navigateShopCouponAndMapButtonLabel}
      </Button>
    </a>
  );
};

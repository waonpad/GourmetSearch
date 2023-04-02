import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Button } from '@mui/material';

import type { Shop } from '../../types';

const navigateShopCouponAndMapButtonLabel = 'Get coupon and map';

export const NavigateShopCouponAndMapButton = ({ shop }: { shop: Shop }) => {
  return (
    <Button
      size="small"
      startIcon={<ConfirmationNumberIcon />}
      href={shop.coupon_urls.pc}
      target="_blank"
      rel="noreferrer"
    >
      {navigateShopCouponAndMapButtonLabel}
    </Button>
  );
};

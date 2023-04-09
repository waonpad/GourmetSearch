import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Button } from '@mui/material';

import type { Shop } from '../../types';

const navigateShopCouponAndMapButtonLabel = 'Get coupon and map';
const navigateShopCouponAndMapButtonLabelShort = 'Coupon / Map';

type NavigateShopCouponAndMapButtonProps = {
  shop: Shop;
  shortLabel?: boolean;
};

export const NavigateShopCouponAndMapButton = ({
  shop,
  shortLabel,
}: NavigateShopCouponAndMapButtonProps) => {
  return (
    <Button
      size="small"
      startIcon={<ConfirmationNumberIcon />}
      href={shop.coupon_urls.pc}
      target="_blank"
      rel="noreferrer"
    >
      {shortLabel ? navigateShopCouponAndMapButtonLabelShort : navigateShopCouponAndMapButtonLabel}
    </Button>
  );
};

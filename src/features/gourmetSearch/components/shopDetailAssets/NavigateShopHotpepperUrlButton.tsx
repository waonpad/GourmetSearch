import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button } from '@mui/material';

import { FEATURE_CONSTANTS } from '../../constants';

import type { Shop } from '../../types';

const navigateShopUrlButtonLabel = 'Full details';

export const NavigateShopHotpepperUrlButton = ({ shop }: { shop: Shop }) => {
  return (
    <Button
      size="small"
      endIcon={<NavigateNextIcon />}
      href={`${FEATURE_CONSTANTS.HOTPEPPER_SHOP_URL}${shop.id}`}
      target="_blank"
      rel="noreferrer"
    >
      {navigateShopUrlButtonLabel}
    </Button>
  );
};

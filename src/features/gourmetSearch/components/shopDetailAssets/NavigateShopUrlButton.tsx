import CottageIcon from '@mui/icons-material/Cottage';
import { Button } from '@mui/material';

import type { Shop } from '../../types';

const navigateShopUrlButtonLabel = 'Go to shop page';
const navigateShopUrlButtonLabelShort = 'Shop page';

type NavigateShopUrlButtonProps = {
  shop: Shop;
  shortLabel?: boolean;
};

export const NavigateShopUrlButton = ({ shop, shortLabel }: NavigateShopUrlButtonProps) => {
  return (
    <Button
      size="small"
      startIcon={<CottageIcon />}
      href={shop.urls.pc}
      target="_blank"
      rel="noreferrer"
    >
      {shortLabel ? navigateShopUrlButtonLabelShort : navigateShopUrlButtonLabel}
    </Button>
  );
};

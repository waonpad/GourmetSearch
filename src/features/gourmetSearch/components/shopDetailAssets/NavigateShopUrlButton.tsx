import CottageIcon from '@mui/icons-material/Cottage';
import { Button } from '@mui/material';

import type { Shop } from '../../types';

const navigateShopUrlButtonLabel = 'Go to shop page';

export const NavigateShopUrlButton = ({ shop }: { shop: Shop }) => {
  return (
    <Button
      size="small"
      startIcon={<CottageIcon />}
      href={shop.urls.pc}
      target="_blank"
      rel="noreferrer"
    >
      {navigateShopUrlButtonLabel}
    </Button>
  );
};

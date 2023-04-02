import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button } from '@mui/material';

import type { Shop } from '../../types';

const navigateShopUrlButtonLabel = 'Learn full details';

export const NavigateShopHotpepperUrlButton = ({ shop }: { shop: Shop }) => {
  return (
    <Button
      size="small"
      endIcon={<NavigateNextIcon />}
      href={`https://www.hotpepper.jp/str${shop.id}`}
      target="_blank"
      rel="noreferrer"
    >
      {navigateShopUrlButtonLabel}
    </Button>
  );
};

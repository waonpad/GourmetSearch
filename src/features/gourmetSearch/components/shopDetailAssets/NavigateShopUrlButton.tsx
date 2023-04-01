import CottageIcon from '@mui/icons-material/Cottage';
import { Button } from '@mui/material';

import type { Shop } from '../../types';

const navigateShopPageLabel = 'Go to shop page';

export const NavigateShopUrlButton = ({ shop }: { shop: Shop }) => {
  return (
    <a href={shop.urls.pc} target="_blank" rel="noreferrer">
      <Button size="small" startIcon={<CottageIcon />}>
        {navigateShopPageLabel}
      </Button>
    </a>
  );
};

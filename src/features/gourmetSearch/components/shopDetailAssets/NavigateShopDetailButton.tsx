import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button } from '@mui/material';

import { Link } from '@/components/Elements';

import type { Shop } from '../../types';

const navigateShopDetailButtonLabel = 'Learn more';

export const NavigateShopDetailButton = ({ shop }: { shop: Shop }) => {
  return (
    <Button
      size="small"
      component={Link}
      to={`/app/gourmet-search/shop/${shop.id}`}
      endIcon={<NavigateNextIcon />}
    >
      {navigateShopDetailButtonLabel}
    </Button>
  );
};

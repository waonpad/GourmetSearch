import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button } from '@mui/material';

import { Link } from '@/components/Elements';

import type { Shop } from '../../types';

const navigateShopDetailLabel = 'Learn more';

export const NavigateShopDetailButton = ({ shop }: { shop: Shop }) => {
  return (
    <Button
      size="small"
      component={Link}
      to={`/app/gourmet-search/gourmet/${shop.id}`}
      endIcon={<NavigateNextIcon />}
    >
      {navigateShopDetailLabel}
    </Button>
  );
};

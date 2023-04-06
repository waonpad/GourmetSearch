import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button } from '@mui/material';

import { Link } from '@/components/Elements';

import { FEATURE_CONSTANTS } from '../../constants';

import type { Shop } from '../../types';

const navigateShopDetailButtonLabel = 'Learn more';

export const NavigateShopDetailButton = ({ shop }: { shop: Shop }) => {
  return (
    <Button
      size="small"
      component={Link}
      to={`${FEATURE_CONSTANTS.SHOP_PATH}/${shop.id}`}
      endIcon={<NavigateNextIcon />}
    >
      {navigateShopDetailButtonLabel}
    </Button>
  );
};

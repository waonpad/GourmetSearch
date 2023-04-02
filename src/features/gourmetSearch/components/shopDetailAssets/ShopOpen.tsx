import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { ShopDetailTempleteStack } from './ShopDetailTempleteStack';

import type { Shop } from '../../types';

export const ShopOpen = ({ shop }: { shop: Shop }) => {
  return (
    <ShopDetailTempleteStack
      icon={CalendarMonthIcon}
      typography={shop.open.replace(/）/g, `）\n`)}
      overrideProps={{
        typography: {
          sx: {
            whiteSpace: 'pre-wrap',
          },
        },
      }}
    />
  );
};

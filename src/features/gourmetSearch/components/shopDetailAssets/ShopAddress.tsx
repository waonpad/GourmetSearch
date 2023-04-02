import LocationOnIcon from '@mui/icons-material/LocationOn';

import { ShopDetailTempleteStack } from './ShopDetailTempleteStack';

import type { Shop } from '../../types';

export const ShopAddress = ({ shop }: { shop: Shop }) => {
  return <ShopDetailTempleteStack icon={LocationOnIcon} typography={shop.address} />;
};

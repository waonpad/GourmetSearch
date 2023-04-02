import NearMeIcon from '@mui/icons-material/NearMe';

import { ShopDetailTempleteStack } from './ShopDetailTempleteStack';

import type { Shop } from '../../types';

export const ShopAccess = ({ shop }: { shop: Shop }) => {
  return <ShopDetailTempleteStack icon={NearMeIcon} typography={shop.access} />;
};

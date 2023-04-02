import SmokeFreeIcon from '@mui/icons-material/SmokeFree';

import { ShopDetailTempleteStack } from './ShopDetailTempleteStack';

import type { Shop } from '../../types';

export const ShopNonSmoking = ({ shop }: { shop: Shop }) => {
  return <ShopDetailTempleteStack icon={SmokeFreeIcon} typography={shop.non_smoking} />;
};

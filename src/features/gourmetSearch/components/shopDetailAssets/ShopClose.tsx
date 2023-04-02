import EventBusyIcon from '@mui/icons-material/EventBusy';

import { ShopDetailTempleteStack } from './ShopDetailTempleteStack';

import type { Shop } from '../../types';

export const ShopClose = ({ shop }: { shop: Shop }) => {
  return <ShopDetailTempleteStack icon={EventBusyIcon} typography={shop.close} />;
};

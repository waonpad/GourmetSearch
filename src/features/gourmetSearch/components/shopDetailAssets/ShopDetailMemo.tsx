import BorderColorIcon from '@mui/icons-material/BorderColor';

import { ShopDetailTempleteStack } from './ShopDetailTempleteStack';

import type { Shop } from '../../types';

export const ShopDetailMemo = ({ shop }: { shop: Shop }) => {
  return <ShopDetailTempleteStack icon={BorderColorIcon} typography={shop.shop_detail_memo} />;
};

import PaymentsIcon from '@mui/icons-material/Payments';

import { ShopDetailTempleteStack } from './ShopDetailTempleteStack';

import type { Shop } from '../../types';

export const ShopBudget = ({ shop }: { shop: Shop }) => {
  return <ShopDetailTempleteStack icon={PaymentsIcon} typography={shop.budget.name} />;
};

import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopView } from './Shop.view';

export const Shop = () => {
  return (
    <FallbackWrapper>
      <ShopView />
    </FallbackWrapper>
  );
};

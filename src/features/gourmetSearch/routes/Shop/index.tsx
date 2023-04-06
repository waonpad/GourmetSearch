// import { SuspenseFallback } from '@/components/Elements/SuspenseFallback';
import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopView } from './Shop.view';

export const Shop = () => {
  return (
    <FallbackWrapper suspenseFallback={undefined} errorFallback={undefined}>
      <ShopView />
    </FallbackWrapper>
  );
};

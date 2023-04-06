// import { SuspenseFallback } from '@/components/Elements/SuspenseFallback';
import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopsView } from './Shops.view';

export const Shops = () => {
  return (
    <FallbackWrapper suspenseFallback={undefined} errorFallback={undefined}>
      <ShopsView />
    </FallbackWrapper>
  );
};

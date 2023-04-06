import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopsView } from './Shops.view';

export const Shops = () => {
  return (
    <FallbackWrapper>
      <ShopsView />
    </FallbackWrapper>
  );
};

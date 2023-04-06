import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopListView } from './ShopList.view';

import type { ShopListProps } from './ShopList.types';

export const ShopList = (props: ShopListProps) => {
  return (
    <FallbackWrapper suspenseFallback={undefined} errorFallback={undefined}>
      <ShopListView {...props} />
    </FallbackWrapper>
  );
};

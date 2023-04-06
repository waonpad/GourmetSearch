import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopListItemView } from './ShopListItem.view';

import type { ShopListItemProps } from './ShopListItem.types';

export const ShopListItem = (props: ShopListItemProps) => {
  return (
    <FallbackWrapper suspenseFallback={undefined} errorFallback={undefined}>
      <ShopListItemView {...props} />
    </FallbackWrapper>
  );
};

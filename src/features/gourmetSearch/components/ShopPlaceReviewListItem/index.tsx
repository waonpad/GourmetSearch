import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopPlaceReviewListItemView } from './ShopPlaceReviewListItem.view';

import type { ShopPlaceReviewListItemProps } from './ShopPlaceReviewListItem.types';

export const ShopPlaceReviewListItem = (props: ShopPlaceReviewListItemProps) => {
  return (
    <FallbackWrapper suspenseFallback={undefined} errorFallback={undefined}>
      <ShopPlaceReviewListItemView {...props} />
    </FallbackWrapper>
  );
};

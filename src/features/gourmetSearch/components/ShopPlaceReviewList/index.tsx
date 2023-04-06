import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopPlaceReviewListView } from './ShopPlaceReviewList.view';

import type { ShopPlaceReviewListProps } from './ShopPlaceReviewList.types';

export const ShopPlaceReviewList = (props: ShopPlaceReviewListProps) => {
  return (
    <FallbackWrapper suspenseFallback={undefined} errorFallback={undefined}>
      <ShopPlaceReviewListView {...props} />
    </FallbackWrapper>
  );
};

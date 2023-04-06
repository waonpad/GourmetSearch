import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopPlaceReviewListView } from './ShopPlaceReviewList.view';

import type { ShopPlaceReviewListProps } from './ShopPlaceReviewList.types';

/**
 * エラー画面まだ作っていない
 */
export const ShopPlaceReviewList = (props: ShopPlaceReviewListProps) => {
  return (
    <FallbackWrapper>
      <ShopPlaceReviewListView {...props} />
    </FallbackWrapper>
  );
};

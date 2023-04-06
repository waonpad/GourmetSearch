import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopPlaceReviewListItemView } from './ShopPlaceReviewListItem.view';

import type { ShopPlaceReviewListItemProps } from './ShopPlaceReviewListItem.types';

/**
 * エラー画面まだ作っていない
 */
export const ShopPlaceReviewListItem = (props: ShopPlaceReviewListItemProps) => {
  return (
    <FallbackWrapper>
      <ShopPlaceReviewListItemView {...props} />
    </FallbackWrapper>
  );
};

import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopPlacePhotoListView } from './ShopPlacePhotoList.view';

import type { ShopPlacePhotoListProps } from './ShopPlacePhotoList.types';

/**
 * エラー画面まだ作っていない
 */
export const ShopPlacePhotoList = (props: ShopPlacePhotoListProps) => {
  return (
    <FallbackWrapper>
      <ShopPlacePhotoListView {...props} />
    </FallbackWrapper>
  );
};

import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopPlacePhotoModalView } from './ShopPlacePhotoModal.view';

import type { ShopPlacePhotoModalProps } from './ShopPlacePhotoModal.types';

/**
 * エラー画面まだ作っていない
 */
export const ShopPlacePhotoModal = (props: ShopPlacePhotoModalProps) => {
  return (
    <FallbackWrapper>
      <ShopPlacePhotoModalView {...props} />
    </FallbackWrapper>
  );
};

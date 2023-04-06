import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopPlacePhotoModalView } from './ShopPlacePhotoModal.view';

import type { ShopPlacePhotoModalProps } from './ShopPlacePhotoModal.types';

export const ShopPlacePhotoModal = (props: ShopPlacePhotoModalProps) => {
  return (
    <FallbackWrapper suspenseFallback={undefined} errorFallback={undefined}>
      <ShopPlacePhotoModalView {...props} />
    </FallbackWrapper>
  );
};

import { FallbackWrapper } from '@/components/FallbackWrapper';

import { ShopPlacePhotoListView } from './ShopPlacePhotoList.view';

import type { ShopPlacePhotoListProps } from './ShopPlacePhotoList.types';

export const ShopPlacePhotoList = (props: ShopPlacePhotoListProps) => {
  return (
    <FallbackWrapper suspenseFallback={undefined} errorFallback={undefined}>
      <ShopPlacePhotoListView {...props} />
    </FallbackWrapper>
  );
};

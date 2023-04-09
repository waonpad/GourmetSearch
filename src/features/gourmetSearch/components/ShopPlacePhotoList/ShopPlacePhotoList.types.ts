import type { useShopPlaceDetails } from '../../hooks/useShopPlaceDetails';

export type ShopPlacePhotoListProps = {
  photos: google.maps.places.PlaceResult['photos'];
  queryStatus: ReturnType<typeof useShopPlaceDetails>;
};

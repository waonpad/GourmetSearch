import type { useShopPlaceDetails } from '../../hooks/useShopPlaceDetails';

export type ShopPlaceReviewListProps = {
  // shop: Shop;
  reviews: google.maps.places.PlaceResult['reviews'];
  queryStatus: ReturnType<typeof useShopPlaceDetails>;
};

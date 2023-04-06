import type { ShopPlaceDetailsSupplierData } from '../ShopPlaceDetailsSupplier';

export type ShopPlaceReviewListProps = {
  // shop: Shop;
  reviews: google.maps.places.PlaceResult['reviews'];
  queryStatus: ShopPlaceDetailsSupplierData;
};

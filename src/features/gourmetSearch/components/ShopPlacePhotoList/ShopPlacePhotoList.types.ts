import type { ShopPlaceDetailsSupplierData } from '../ShopPlaceDetailsSupplier';

export type ShopPlacePhotoListProps = {
  photos: google.maps.places.PlaceResult['photos'];
  queryStatus: ShopPlaceDetailsSupplierData;
};

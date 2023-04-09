import _ from 'lodash';

import type { useGeolocated } from '@/lib/react-geolocated';

import type { ShopListProps } from './ShopList.types';

/**
 * 位置情報の取得完了 or 位置情報不要が確認できるまで待機
 */
export const generateShopsQueryEnabled = (
  searchShopParams: ShopListProps['searchShopParams'],
  geolocated: ReturnType<typeof useGeolocated>
) => {
  return (
    geolocated.isStatusChecked === true ||
    geolocated.isLoading === false ||
    !!searchShopParams?.lat ||
    !!searchShopParams?.lng ||
    searchShopParams?.allRange === 1
  );
};

/**
 * allRangeフラグが1の場合、lat,lng,rangeは使用しない
 * 初期表示の場合、lat,lngにgeolocatedの値を使用する
 */
export const generateShopsQueryRequestLatLngRange = (
  searchShopParams: ShopListProps['searchShopParams'],
  geolocated: ReturnType<typeof useGeolocated>
) => {
  return searchShopParams?.allRange === 1
    ? undefined
    : {
        lat: searchShopParams?.lat
          ? searchShopParams?.lat
          : Object.keys(_.omit(searchShopParams, ['start']))?.length === 0
          ? geolocated.initialCoords?.latitude ?? geolocated.coords?.latitude
          : undefined,
        lng: searchShopParams?.lng
          ? searchShopParams?.lng
          : Object.keys(_.omit(searchShopParams, ['start']))?.length === 0
          ? geolocated.initialCoords?.longitude ?? geolocated.coords?.longitude
          : undefined,
        range: searchShopParams?.range,
      };
};

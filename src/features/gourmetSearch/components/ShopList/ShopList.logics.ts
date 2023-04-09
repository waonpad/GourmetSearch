import { useNavigate } from 'react-router-dom';

import _ from 'lodash';
import qs from 'qs';

import { useGeolocated } from '@/lib/react-geolocated';
import { getPage, getOffset } from '@/utils/pagination';

import { useShops } from '../../api/getShops';
import { FEATURE_CONSTANTS } from '../../constants';

import { generateShopsQueryEnabled, generateShopsQueryRequestLatLngRange } from './ShopList.utils';

import type { ShopListProps } from './ShopList.types';

export const useLogics = ({ searchShopParams }: ShopListProps) => {
  const navigate = useNavigate();

  const geolocated = useGeolocated();

  const page = getPage(
    searchShopParams?.start ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_START,
    searchShopParams?.count ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_COUNT
  );

  const isShopsQueryEnabled = generateShopsQueryEnabled(searchShopParams, geolocated);

  const shopsQueryRequestLatLngRange = generateShopsQueryRequestLatLngRange(
    searchShopParams,
    geolocated
  );

  const shopsQueryRequestStart =
    getOffset(page, searchShopParams?.count ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_COUNT) +
    1;

  const shopsQuery = useShops({
    config: {
      // suspense: true,
      // useErrorBoundary: true,
      enabled: isShopsQueryEnabled,
      // keepPreviousData: true,
    },
    requestParams: {
      ..._.omit(searchShopParams, FEATURE_CONSTANTS.HOTPEPPER_GOURMET_SEARCH_API_CUSTOM_PROPERTIES),
      lat: shopsQueryRequestLatLngRange?.lat,
      lng: shopsQueryRequestLatLngRange?.lng,
      range: shopsQueryRequestLatLngRange?.range,
      start: shopsQueryRequestStart,
    },
  });

  const handleClickPaginte = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(
      `${FEATURE_CONSTANTS.SHOPS_PATH}/${qs.stringify({
        ...searchShopParams,
        lat: shopsQueryRequestLatLngRange?.lat,
        lng: shopsQueryRequestLatLngRange?.lng,
        range: shopsQueryRequestLatLngRange?.range,
        start:
          getOffset(
            value,
            searchShopParams?.count ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_COUNT
          ) + 1,
      })}`
    );
  };

  return {
    page,
    geolocated,
    isShopsQueryEnabled,
    shopsQuery,
    handleClickPaginte,
  };
};

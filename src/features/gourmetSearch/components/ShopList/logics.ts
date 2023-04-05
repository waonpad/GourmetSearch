import { useNavigate } from 'react-router-dom';

import _ from 'lodash';
import qs from 'qs';

import { useGeolocated } from '@/lib/react-geolocated';
import { getPage, getOffset } from '@/utils/pagination';

import { useShops } from '../../api/getShops';
import { FEATURE_CONSTANTS } from '../../constants';

import type { ShopListProps } from './types';

export const useLogics = ({ searchShopParams }: ShopListProps) => {
  const navigate = useNavigate();

  const geolocated = useGeolocated();

  const page = getPage(
    searchShopParams?.start ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_START,
    searchShopParams?.count ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_COUNT
  );

  const isQueryEnabled = geolocated.isStatusChecked === true || geolocated.isLoading === false;

  const shopsQuery = useShops({
    config: {
      suspense: true,
      useErrorBoundary: true,
      enabled: isQueryEnabled,
    },
    requestParams: {
      ..._.omit(searchShopParams, ['allRange']),
      lat:
        searchShopParams?.allRange === 1
          ? undefined
          : searchShopParams?.lat ??
            geolocated.initialCoords?.latitude ??
            geolocated.coords?.latitude,
      lng:
        searchShopParams?.allRange === 1
          ? undefined
          : searchShopParams?.lng ??
            geolocated?.initialCoords?.longitude ??
            geolocated?.coords?.longitude,
      range: searchShopParams?.allRange === 1 ? undefined : searchShopParams?.range,
      start:
        getOffset(
          page,
          searchShopParams?.count ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_COUNT
        ) + 1,
    },
  });

  const handleClickPaginte = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(
      `${FEATURE_CONSTANTS.SHOPS_PATH}/${qs.stringify({
        ...searchShopParams,
        start:
          getOffset(
            value,
            searchShopParams?.count ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_COUNT
          ) + 1,
      })}`
    );
  };

  return {
    geolocated,
    page,
    shopsQuery,
    handleClickPaginte,
  };
};

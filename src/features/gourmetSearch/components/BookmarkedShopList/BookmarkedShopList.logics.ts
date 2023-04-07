import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import { getOffset, getPage } from '@/utils/pagination';

import { useBookmarkedShops } from '../../api/getBookmarkedShops';
import { useShops } from '../../api/getShops';
import { FEATURE_CONSTANTS } from '../../constants';

import type { BookmarkedShopListProps } from './BookmarkedShopList.types';

export const useLogics = ({ userId, start, count }: BookmarkedShopListProps) => {
  const navigate = useNavigate();

  const firestoreBookmarkedShopsQuery = useBookmarkedShops({
    userId,
    config: {
      start,
      count,
    },
  });

  useEffect(() => {
    console.log(firestoreBookmarkedShopsQuery);
  }, [firestoreBookmarkedShopsQuery]);

  const idsString = firestoreBookmarkedShopsQuery.data?.map((shopId) => shopId).join(',');

  const shopsQuery = useShops({
    config: {
      enabled: !!firestoreBookmarkedShopsQuery.data,
      keepPreviousData: true,
    },
    requestParams: {
      id: idsString,
    },
  });

  const page = getPage(
    start ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_START,
    count ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_COUNT
  );

  const handleClickPaginte = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(
      `${FEATURE_CONSTANTS.BOOKMARKED_SHOPS_PATH}/${userId}/${qs.stringify({
        start:
          getOffset(value, count ?? FEATURE_CONSTANTS.GET_BOOKMARKED_SHOPS_DEDAULT_REQUEST_COUNT) +
          1,
        count,
      })}`
    );
  };

  return {
    firestoreBookmarkedShopsQuery,
    shopsQuery,
    page,
    handleClickPaginte,
  };
};

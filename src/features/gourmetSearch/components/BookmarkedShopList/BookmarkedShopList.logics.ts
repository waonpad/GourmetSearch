/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from 'react-router-dom';

import { getPage } from '@/utils/pagination';

import { useBookmarkedShops } from '../../api/getBookmarkedShops';
import { useShops } from '../../api/getShops';
import { FEATURE_CONSTANTS } from '../../constants';

import { CONSTANTS } from './BookmarkedShopList.constants';

import type { BookmarkedShopListProps } from './BookmarkedShopList.types';

export const useLogics = ({ userId, start, count }: BookmarkedShopListProps) => {
  const navigate = useNavigate();

  const firestoreBookmarkedShopsQuery = useBookmarkedShops({
    userId,
    config: {
      query: {
        start: {
          cursor: 'at',
          value: [0],
        },
        limit: {
          limit: count ?? CONSTANTS.GET_BOOKMARKED_SHOPS_DEDAULT_REQUEST_COUNT,
        },
      },
    },
  });

  const idsString = firestoreBookmarkedShopsQuery.data?.map((shop) => shop.id).join(',');

  const shopsQuery = useShops({
    config: {
      enabled: !!firestoreBookmarkedShopsQuery.data,
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
    //
  };

  return {
    firestoreBookmarkedShopsQuery,
    shopsQuery,
    page,
    handleClickPaginte,
  };
};

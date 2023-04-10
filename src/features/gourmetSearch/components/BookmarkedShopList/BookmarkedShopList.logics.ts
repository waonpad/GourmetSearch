import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import { getOffset, getPage } from '@/utils/pagination';

import { useBookmarkedShops } from '../../api/getBookmarkedShops';
import { useShops } from '../../api/getShops';
import { FEATURE_CONSTANTS } from '../../constants';
import { isHotpepperGourmetSearchAPISuccessResponse } from '../../types';

import type { Shop } from '../../types';
import type { BookmarkedShopListProps } from './BookmarkedShopList.types';

export const useLogics = ({ userId, start, count }: BookmarkedShopListProps) => {
  const navigate = useNavigate();

  const [shops, setShops] = useState<Shop[]>([]);
  const [shopTotalCount, setShopTotalCount] = useState<number>(0);

  const firestoreBookmarkedShopsQuery = useBookmarkedShops({
    userId,
    config: {
      start,
      count,
      reverse: true,
    },
  });

  const idsString = firestoreBookmarkedShopsQuery.data?.map((shopId) => shopId).join(',');

  const shopsQuery = useShops({
    config: {
      enabled: !!firestoreBookmarkedShopsQuery.data,
      // keepPreviousData: true,
      onSettled(data, error) {
        if (isHotpepperGourmetSearchAPISuccessResponse(data)) {
          setShops(data.results.shop);
        } else {
          setShops([]);
          console.log(error);
        }
      },
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

  useEffect(() => {
    setShopTotalCount(firestoreBookmarkedShopsQuery.totalCount ?? 0);
  }, [firestoreBookmarkedShopsQuery.totalCount]);

  return {
    shops,
    shopTotalCount,
    firestoreBookmarkedShopsQuery,
    shopsQuery,
    page,
    handleClickPaginte,
  };
};

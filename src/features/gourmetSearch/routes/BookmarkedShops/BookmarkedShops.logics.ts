import { useParams } from 'react-router-dom';

import qs from 'qs';

import { bookmarkShopsRequestConverter } from '../../types';

import type { GetBookmarkedShopsRequest } from '../../types';

export const useLogics = () => {
  const { userId, searchParams } = useParams();

  const parsedSearchParams: GetBookmarkedShopsRequest | undefined = bookmarkShopsRequestConverter(
    qs.parse(searchParams)
  );

  console.log(searchParams);
  console.log(parsedSearchParams);

  return {
    userId,
    start: parsedSearchParams?.start,
    count: parsedSearchParams?.count,
  };
};

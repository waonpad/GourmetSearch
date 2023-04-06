import { useParams } from 'react-router-dom';

import qs from 'qs';

import { hotpepperGourmetSearchAPIRequestConverter } from '../../types';

import type { CustomizedHotpepperGourmetSearchAPIRequest } from '../../types';

export const useLogics = () => {
  const { searchParams } = useParams();

  const renderKey = searchParams;

  const parsedSearchParams: CustomizedHotpepperGourmetSearchAPIRequest | undefined =
    hotpepperGourmetSearchAPIRequestConverter(qs.parse(searchParams));

  return {
    renderKey,
    parsedSearchParams,
  };
};

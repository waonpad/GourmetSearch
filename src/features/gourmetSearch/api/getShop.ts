import { useQuery } from 'react-query';

import { RECRUIT_API_URL, RECRUIT_API_KEY, HEROKU_PROXY_URL } from '@/config';
import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { FEATURE_CONSTANTS } from '../constants';

import type { HotpepperGourmetSearchAPIRequest, HotpepperGourmetSearchAPIResponse } from '../types';

export const getShop = (shopId: string): Promise<HotpepperGourmetSearchAPIResponse> => {
  const params: HotpepperGourmetSearchAPIRequest = {
    id: shopId,
    key: RECRUIT_API_KEY,
    format: 'json',
  };

  return axios.get(FEATURE_CONSTANTS.HOTPEPPER_GOURMET_SEARCH_API_ENDPOINT, {
    baseURL: `${HEROKU_PROXY_URL}/${RECRUIT_API_URL}`,
    params: params,
  });
};

type QueryFnType = typeof getShop;

type UseShopsOptions = {
  shopId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useShop = ({ shopId, config }: UseShopsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [FEATURE_CONSTANTS.REACT_QUERY_KEYS.GET_SHOP, shopId],
    queryFn: () => getShop(shopId),
    onSettled(data, error) {
      console.log(data);
      console.log(error);

      config?.onSettled?.(data, error);
    },
  });
};

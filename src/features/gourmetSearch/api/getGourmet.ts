import { useQuery } from 'react-query';

import { RECRUIT_API_URL, RECRUIT_API_KEY, HEROKU_PROXY_URL } from '@/config';
import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import type { HotpepperGourmetRequest, HotpepperGourmetResponse } from '../types';

export const getGourmet = (shopId: string): Promise<HotpepperGourmetResponse> => {
  const params: HotpepperGourmetRequest = {
    id: shopId,
    key: RECRUIT_API_KEY,
    format: 'json',
  };

  return axios.get('/gourmet/v1/', {
    baseURL: `${HEROKU_PROXY_URL}/${RECRUIT_API_URL}`,
    params: params,
  });
};

type QueryFnType = typeof getGourmet;

type UseGourmetsOptions = {
  shopId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useGourmet = ({ shopId, config }: UseGourmetsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['gourmets', shopId],
    queryFn: () => getGourmet(shopId),
    onSuccess(data) {
      console.log('data', data);
    },
  });
};

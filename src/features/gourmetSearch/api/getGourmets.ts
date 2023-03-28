import { useQuery } from 'react-query';

import { RECRUIT_API_URL, RECRUIT_API_KEY } from '@/config';
import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import type { HotpepperGourmetRequest, HotpepperGourmetResponse } from '../types';

export const getGourmets = (
  requestParams: Omit<HotpepperGourmetRequest, 'key'>
): Promise<HotpepperGourmetResponse> => {
  return axios.get('/gourmets/v1/', {
    baseURL: RECRUIT_API_URL,
    params: {
      ...requestParams,
      key: RECRUIT_API_KEY,
    },
  });
};

type QueryFnType = typeof getGourmets;

type UseGourmetsOptions = {
  requestParams?: Omit<HotpepperGourmetRequest, 'key'>;
  config?: QueryConfig<QueryFnType>;
};

const defaultRequestParams: Omit<HotpepperGourmetRequest, 'key'> = {
  keyword: '東京',
};

const defaultOptions: UseGourmetsOptions = {
  requestParams: defaultRequestParams,
};

export const useGourmets = ({ requestParams, config }: UseGourmetsOptions = defaultOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['gourmets', requestParams ?? defaultRequestParams],
    queryFn: () => getGourmets(requestParams ?? defaultRequestParams),
  });
};

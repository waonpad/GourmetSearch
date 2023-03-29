import _ from 'lodash';
import { useQuery } from 'react-query';

import { RECRUIT_API_URL, RECRUIT_API_KEY, HEROKU_PROXY_URL } from '@/config';
import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import type {
  HotpepperGourmetRequest,
  OmittedHotpepperGourmetRequest,
  HotpepperGourmetResponse,
} from '../types';

export const getGourmets = (
  requestParams: OmittedHotpepperGourmetRequest
): Promise<HotpepperGourmetResponse> => {
  const params: HotpepperGourmetRequest = {
    ...requestParams,
    key: RECRUIT_API_KEY,
    format: 'json',
  };

  return axios.get('/gourmet/v1/', {
    baseURL: `${HEROKU_PROXY_URL}/${RECRUIT_API_URL}`,
    params: params,
  });
};

type QueryFnType = typeof getGourmets;

export type UseGourmetsOptions = {
  requestParams?: OmittedHotpepperGourmetRequest;
  config?: QueryConfig<QueryFnType>;
};

const defaultRequestParams: OmittedHotpepperGourmetRequest = {
  keyword: '東京', // テスト用
};

const defaultOptions: UseGourmetsOptions = {
  requestParams: defaultRequestParams,
};

export const useGourmets = ({ requestParams, config }: UseGourmetsOptions = defaultOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['gourmets', _.merge({}, defaultRequestParams, requestParams)],
    queryFn: () => getGourmets(_.merge({}, defaultRequestParams, requestParams)),
    onSettled(data, error) {
      console.log(_.merge({}, defaultRequestParams, requestParams));
      console.log(data);
      console.log(error);
    },
  });
};

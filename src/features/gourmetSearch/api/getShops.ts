import _ from 'lodash';
import { useQuery } from 'react-query';

import { RECRUIT_API_URL, RECRUIT_API_KEY, HEROKU_PROXY_URL } from '@/config';
import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import type {
  HotpepperGourmetSearchAPIRequest,
  OmittedHotpepperGourmetSearchAPIRequest,
  HotpepperGourmetSearchAPIResponse,
} from '../types';

export const getShops = (
  requestParams: OmittedHotpepperGourmetSearchAPIRequest
): Promise<HotpepperGourmetSearchAPIResponse> => {
  const params: HotpepperGourmetSearchAPIRequest = {
    ...requestParams,
    key: RECRUIT_API_KEY,
    format: 'json',
  };

  return axios.get('/gourmet/v1/', {
    baseURL: `${HEROKU_PROXY_URL}/${RECRUIT_API_URL}`,
    params,
  });
};

type QueryFnType = typeof getShops;

export type UseShopsOptions = {
  requestParams?: OmittedHotpepperGourmetSearchAPIRequest;
  config?: QueryConfig<QueryFnType>;
};

export const defRange = 5;
export const defCount = 10;
export const defStart = 1;

export const useShops = ({ requestParams, config }: UseShopsOptions) => {
  const defaultConfig: UseShopsOptions['config'] = {};

  const defaultRequestParams: OmittedHotpepperGourmetSearchAPIRequest = {
    range: defRange,
    count: defCount,
    start: defStart,
  };

  const mergedRequestParams = _.merge({}, defaultRequestParams, requestParams);

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ..._.merge({}, defaultConfig, config),
    queryKey: ['gourmets', mergedRequestParams],
    queryFn: () => getShops(mergedRequestParams),
    onSettled(data, error) {
      console.log(mergedRequestParams);
      console.log(data);
      console.log(error);
    },
  });
};

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
    params,
  });
};

type QueryFnType = typeof getGourmets;

export type UseGourmetsOptions = {
  requestParams?: OmittedHotpepperGourmetRequest;
  config?: QueryConfig<QueryFnType>;
};

export const defRange = 5;
export const defCount = 10;
export const defStart = 1;

export const useGourmets = ({ requestParams, config }: UseGourmetsOptions) => {
  const defaultConfig: UseGourmetsOptions['config'] = {};

  const defaultRequestParams: OmittedHotpepperGourmetRequest = {
    range: defRange,
    count: defCount,
    start: defStart,
  };

  const mergedRequestParams = _.merge({}, defaultRequestParams, requestParams);

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ..._.merge({}, defaultConfig, config),
    queryKey: ['gourmets', mergedRequestParams],
    queryFn: () => getGourmets(mergedRequestParams),
    onSettled(data, error) {
      console.log(mergedRequestParams);
      console.log(data);
      console.log(error);
    },
  });
};

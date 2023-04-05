// import { useErrorHandler } from 'react-error-boundary';
import _ from 'lodash';
import { useQuery } from 'react-query';

import { RECRUIT_API_URL, RECRUIT_API_KEY, HEROKU_PROXY_URL } from '@/config';
import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { FEATURE_CONSTANTS, GET_SHOPS_DEFAULT_REQUEST } from '../constants';
// import { isHotpepperAPIErrorResponse } from '../types';

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

  return axios.get(FEATURE_CONSTANTS.HOTPEPPER_GOURMET_SEARCH_API_ENDPOINT, {
    baseURL: `${HEROKU_PROXY_URL}/${RECRUIT_API_URL}`,
    params,
  });
};

type QueryFnType = typeof getShops;

export type UseShopsOptions = {
  requestParams?: OmittedHotpepperGourmetSearchAPIRequest;
  config?: QueryConfig<QueryFnType>;
};

export const useShops = ({ requestParams, config = {} }: UseShopsOptions) => {
  // const handleError = useErrorHandler();

  const queryEnabled =
    config.enabled && (!!requestParams?.keyword || !!requestParams?.lat || !!requestParams?.lng);

  const query = useQuery<ExtractFnReturnType<QueryFnType>>({
    ...{
      enabled: queryEnabled,
    },
    queryKey: [FEATURE_CONSTANTS.REACT_QUERY_KEYS.GET_SHOPS],
    queryFn: () => getShops(_.merge({}, GET_SHOPS_DEFAULT_REQUEST, requestParams)), // マージしないとundefinedで消される
    onSettled(data, error) {
      console.log(requestParams);
      console.log(data);
      console.log(error);

      // if (error || !data || (data && isHotpepperAPIErrorResponse(data))) {
      //   handleError('Error: Failed to get shops.');
      // }

      config.onSettled?.(data, error);
    },
  });

  return query;
};

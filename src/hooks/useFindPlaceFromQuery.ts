import { useEffect, useState } from 'react';

import _ from 'lodash';

type UseFindPlaceFromQueryRequest = Omit<google.maps.places.FindPlaceFromQueryRequest, 'fields'> & {
  fields: (keyof google.maps.places.PlaceResult)[];
};

export type UseFindPlaceFromQueryOptions = {
  request: UseFindPlaceFromQueryRequest;
  callback?: (
    results: google.maps.places.PlaceResult[] | null,
    status: google.maps.places.PlacesServiceStatus
  ) => void;
  config?: {
    enabled: boolean;
  };
};

export const defaultFindPlaceFromQueryRequest: UseFindPlaceFromQueryOptions['request'] = {
  query: '',
  fields: ['name', 'formatted_address', 'place_id', 'geometry'],
};

const defaultFindPlaceFromQueryConfig: UseFindPlaceFromQueryOptions['config'] = {
  enabled: true,
};

export const useFindPlaceFromQuery = ({
  request,
  callback,
  config,
}: UseFindPlaceFromQueryOptions) => {
  const service = new google.maps.places.PlacesService(document.createElement('div'));

  const [data, setData] = useState<google.maps.places.PlaceResult[] | null>(null);

  const [status, setStatus] = useState<{
    serviceStatus: google.maps.places.PlacesServiceStatus | undefined;
    isLoading: boolean;
    isSucess: boolean;
    isError: boolean;
  }>({
    serviceStatus: undefined,
    isLoading: false,
    isSucess: false,
    isError: false,
  });

  const mergedConfig = _.merge({}, defaultFindPlaceFromQueryConfig, config);

  const getPlaceData = () => {
    const mergedRequest = _.merge({}, defaultFindPlaceFromQueryRequest, request);

    setStatus({
      serviceStatus: undefined,
      isLoading: true,
      isSucess: false,
      isError: false,
    });

    service.findPlaceFromQuery(mergedRequest, (results, status) => {
      console.log('status: ', status);
      console.log('results: ', results);

      callback && callback(results, status);

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setData(results);
        setStatus({
          serviceStatus: status,
          isLoading: false,
          isSucess: true,
          isError: false,
        });
      } else {
        setData(null);
        setStatus({
          serviceStatus: status,
          isLoading: false,
          isSucess: false,
          isError: true,
        });
      }
    });
  };

  useEffect(() => {
    if (mergedConfig.enabled) {
      getPlaceData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(config)]);

  return {
    data,
    ...status,
  };
};

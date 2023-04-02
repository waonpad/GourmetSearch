import { useEffect, useState } from 'react';

import _ from 'lodash';

type UsePlaceDetailsRequest = google.maps.places.PlaceDetailsRequest & {
  fields: (keyof google.maps.places.PlaceResult)[];
};

type UsePlaceDetailsOptions = {
  request: UsePlaceDetailsRequest;
  callback?: (
    results: google.maps.places.PlaceResult | null,
    status: google.maps.places.PlacesServiceStatus
  ) => void;
  config?: {
    enabled: boolean;
  };
};

export const defaultPlaceId = '';

const defaultPlaceDetailsRequest: UsePlaceDetailsOptions['request'] = {
  placeId: defaultPlaceId,
  fields: ['name', 'formatted_address', 'place_id', 'geometry', 'reviews'],
};

const defaultPlaceDetailsConfig: UsePlaceDetailsOptions['config'] = {
  enabled: true,
};

export const usePlaceDetails = ({ request, callback, config }: UsePlaceDetailsOptions) => {
  const service = new google.maps.places.PlacesService(document.createElement('div'));

  const [data, setData] = useState<google.maps.places.PlaceResult | null>(null);

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

  const mergedConfig = _.merge({}, defaultPlaceDetailsConfig, config);

  const getPlaceData = () => {
    const mergedRequest = _.merge({}, defaultPlaceDetailsRequest, request);

    setStatus({
      serviceStatus: undefined,
      isLoading: true,
      isSucess: false,
      isError: false,
    });

    service.getDetails(mergedRequest, (result, status) => {
      console.log('status: ', status);
      console.log('result: ', result);

      callback && callback(result, status);

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setData(result);
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
    if (mergedConfig.enabled && request.placeId !== defaultPlaceId) {
      getPlaceData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(config)]);

  return {
    data,
    ...status,
  };
};

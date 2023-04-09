import { useFindPlaceFromQuery } from '@/hooks/useFindPlaceFromQuery';
import type { UsePlaceDetailsOptions } from '@/hooks/usePlaceDetails';
import { defaultPlaceId, usePlaceDetails } from '@/hooks/usePlaceDetails';

import type { Shop } from '../types';

type UseShopPlaceDetailsOptions = {
  shop?: Shop;
  fields?: UsePlaceDetailsOptions['request']['fields'];
};

export const useShopPlaceDetails = ({ shop, fields }: UseShopPlaceDetailsOptions) => {
  const findPlaceFromQuery = useFindPlaceFromQuery({
    config: {
      enabled: !!shop?.address,
    },
    request: {
      query: shop?.address ?? '',
      fields: [],
    },
  });

  const placeDetails = usePlaceDetails({
    config: {
      enabled: !!findPlaceFromQuery.data?.[0].place_id,
    },
    request: {
      placeId: findPlaceFromQuery.data?.[0].place_id ?? defaultPlaceId,
      fields: fields ?? [],
    },
  });

  return {
    findPlaceFromQuery,
    placeDetails,
  };
};

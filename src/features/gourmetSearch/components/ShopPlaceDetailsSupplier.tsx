import { useFindPlaceFromQuery } from '@/hooks/useFindPlaceFromQuery';
import { defaultPlaceId, usePlaceDetails } from '@/hooks/usePlaceDetails';

import type { Shop } from '../types';

export type ShopPlaceDetailsSupplierData = {
  findPlaceFromQuery: ReturnType<typeof useFindPlaceFromQuery>;
  placeDetails: ReturnType<typeof usePlaceDetails>;
};

/**
 * findPlaceFromQueryは返さないほうがいいかも
 */
export const ShopPlaceDetailsSupplier = ({
  children,
  shop,
}: {
  children: (_: ShopPlaceDetailsSupplierData) => React.ReactNode;
  shop: Shop;
}) => {
  const findPlaceFromQuery = useFindPlaceFromQuery({
    request: {
      query: shop.address,
      fields: [],
    },
  });

  const placeDetails = usePlaceDetails({
    config: {
      enabled: !!findPlaceFromQuery.data?.[0].place_id,
    },
    request: {
      placeId: findPlaceFromQuery.data?.[0].place_id ?? defaultPlaceId,
      fields: ['photos', 'reviews'],
    },
  });

  return <>{children({ findPlaceFromQuery, placeDetails })}</>;
};

import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useShop } from '../../api/getShop';
import { useShopPlaceDetails } from '../../hooks/useShopPlaceDetails';
import { isHotpepperGourmetSearchAPISuccessResponse } from '../../types';

export const useLogics = () => {
  const { shopId } = useParams();

  const renderKey = shopId;

  const shopQuery = useShop({
    config: {
      enabled: !!shopId,
      // suspense: true,
      // useErrorBoundary: true,
    },
    shopId: shopId,
  });

  const shopPlaceDetails = useShopPlaceDetails({
    shop: isHotpepperGourmetSearchAPISuccessResponse(shopQuery.data)
      ? shopQuery.data.results.shop[0]
      : undefined,
    fields: ['reviews', 'photos'],
  });

  const [isCardMediaExpanded, setIsCardMediaExpanded] = useState(false);

  const handleClickToggleExpandCardMedia = () => {
    setIsCardMediaExpanded(!isCardMediaExpanded);
  };

  return {
    renderKey,
    shopQuery,
    shopPlaceDetails,
    isCardMediaExpanded,
    handleClickToggleExpandCardMedia,
  };
};

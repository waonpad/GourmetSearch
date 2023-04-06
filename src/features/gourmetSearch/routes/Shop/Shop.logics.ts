import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useShop } from '../../api/getShop';

export const useLogics = () => {
  const { shopId } = useParams();

  const renderKey = shopId;

  const gourmetQuery = useShop({
    config: {
      enabled: !!shopId,
      suspense: true,
      useErrorBoundary: true,
    },
    shopId: shopId,
  });

  const [isCardMediaExpanded, setIsCardMediaExpanded] = useState(false);

  const handleFavoriteClick = () => {
    console.log('handleFavoriteClick', shopId);
  };

  const handleClickToggleExpandCardMedia = () => {
    setIsCardMediaExpanded(!isCardMediaExpanded);
  };

  return {
    renderKey,
    gourmetQuery,
    isCardMediaExpanded,
    handleFavoriteClick,
    handleClickToggleExpandCardMedia,
  };
};

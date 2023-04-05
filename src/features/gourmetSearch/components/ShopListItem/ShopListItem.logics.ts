import { useState } from 'react';

// import type { ShopListProps } from '../ShopList/ShopList.types';

export const useLogics = () => {
  const [isCardMediaExpanded, setIsCardMediaExpanded] = useState(false);

  const handleClickToggleExpandCardMedia = () => {
    setIsCardMediaExpanded(!isCardMediaExpanded);
  };

  return {
    isCardMediaExpanded,
    handleClickToggleExpandCardMedia,
  };
};

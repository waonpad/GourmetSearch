import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';

import { useBookmarkShop } from '../../api/bookmarkShop';

import type { Shop } from '../../types';

export type BookmarkShopButtonProps = {
  shop: Shop;
};

export const BookmarkShopButton = ({ shop }: BookmarkShopButtonProps) => {
  const bookmarkShopMutation = useBookmarkShop({ data: shop });

  const handleClickBookmarkButton = () => {
    bookmarkShopMutation.mutateToggle();
  };

  return (
    <IconButton size="small" onClick={handleClickBookmarkButton}>
      {bookmarkShopMutation.isBookmarked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

import { Link } from 'react-router-dom';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { IconButton } from '@mui/material';

import { useAuthContext } from '@/lib/auth';

import { useBookmarkShop } from '../../api/bookmarkShop';

import type { Shop } from '../../types';

export type BookmarkShopButtonProps = {
  shop: Shop;
};

export const BookmarkShopButton = ({ shop }: BookmarkShopButtonProps) => {
  const auth = useAuthContext();

  const bookmarkShopMutation = useBookmarkShop({ data: shop });

  const handleClickBookmarkButton = () => {
    bookmarkShopMutation.mutateToggle();
  };

  return (
    <IconButton
      size="small"
      {...(auth?.user
        ? { onClick: handleClickBookmarkButton }
        : {
            component: Link,
            to: '/auth/login',
          })}
    >
      {bookmarkShopMutation.isBookmarked ? (
        <BookmarkIcon color="primary" />
      ) : (
        <BookmarkBorderIcon color="primary" />
      )}
    </IconButton>
  );
};

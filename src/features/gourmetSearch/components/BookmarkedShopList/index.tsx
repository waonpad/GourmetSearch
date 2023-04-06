import { FallbackWrapper } from '@/components/FallbackWrapper';

import { BookmarkedShopListView } from './BookmarkedShopList.view';

import type { BookmarkedShopListProps } from './BookmarkedShopList.types';

export const BookmarkedShopList = (props: BookmarkedShopListProps) => {
  return (
    <FallbackWrapper suspenseFallback={undefined} errorFallback={undefined}>
      <BookmarkedShopListView {...props} />
    </FallbackWrapper>
  );
};

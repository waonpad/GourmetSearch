import { FallbackWrapper } from '@/components/FallbackWrapper';

import { BookmarkedShopsView } from './BookmarkedShops.view';

export const BookmarkedShops = () => {
  return (
    <FallbackWrapper suspenseFallback={undefined} errorFallback={undefined}>
      <BookmarkedShopsView />
    </FallbackWrapper>
  );
};

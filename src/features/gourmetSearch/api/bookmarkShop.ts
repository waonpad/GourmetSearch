import { useFirestoreWriteBatch } from '@react-query-firebase/firestore';
import { doc, increment, writeBatch } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFirestore } from '@/hooks/useFirestore';
import { useAuthContext } from '@/lib/auth';
import type { TimeStampDTO, BaseEntity } from '@/types';
import { timestampTemp } from '@/utils/constants';

import type { Shop } from '../types';

export type BookmarkShopDTO = {
  data: Shop;
};

type UseBookmarkShopOptions = BookmarkShopDTO & {
  config?: {
    // ...
  };
};

type ShopBookmarkedUserDTO = TimeStampDTO;

type BookmarkedShopDTO = TimeStampDTO;

export const useBookmarkShop = ({ data }: UseBookmarkShopOptions) => {
  const auth = useAuthContext();

  const batch = writeBatch(db);
  const BookmarkShopBatch = useFirestoreWriteBatch(batch);

  const shopRef = doc(db, 'shops', data.id);
  const userRef = doc(db, 'users', auth?.user ? auth?.user?.uid : '_');
  const bookmarkedUserRef = doc(shopRef, 'bookmarkedUsers', auth?.user ? auth?.user?.uid : '_');
  const bookmarkedShopRef = doc(userRef, 'bookmarkedShops', data.id);

  const shopDoc = useFirestore<BaseEntity & { bookmarkCount: number }>(shopRef);
  const bookmarkedUserDoc = useFirestore<BaseEntity>(bookmarkedUserRef);
  const isBookmarked = !!bookmarkedUserDoc.data && !bookmarkedUserDoc.isLoading; // 読み込み済みでデータがあればブクマ済み
  const canMutate = !shopDoc.isLoading && !bookmarkedUserDoc.isLoading; // 読み込み中はブクマできない

  const mutateToggle = () => {
    if (canMutate) {
      console.log('canMutate');
      console.log('isBookmarked', isBookmarked);
      isBookmarked ? mutateUnBookmarkBatch() : mutateBookmarkBatch();
    } else {
      console.log('can not mutate');
    }
  };

  const mutateBookmarkBatch = () => {
    // shopのドキュメントがなければ作成
    if (shopDoc.data?.bookmarkCount === undefined) {
      batch.set(shopRef, { bookmarkCount: 0 });
    }

    // ブクマしたユーザーのリストに自分を追加
    const bookmarkedUser: ShopBookmarkedUserDTO = { ...timestampTemp };
    batch.set(bookmarkedUserRef, bookmarkedUser);

    // 自分のブクマしたShopリストに追加
    const bookmarkedShop: BookmarkedShopDTO = {
      ...timestampTemp,
    };
    batch.set(bookmarkedShopRef, bookmarkedShop);

    batch.update(shopRef, { bookmarkCount: increment(1) });

    BookmarkShopBatch.mutate();
  };

  const mutateUnBookmarkBatch = () => {
    // ブクマしたユーザーのリストから自分を削除
    batch.delete(bookmarkedUserRef);

    // 自分のブクマしたShopリストから削除
    batch.delete(bookmarkedShopRef);

    batch.update(shopRef, { bookmarkCount: increment(-1) });

    BookmarkShopBatch.mutate();
  };

  return {
    ...BookmarkShopBatch,
    mutateToggle,
    isBookmarked,
    canMutate,
  };
};

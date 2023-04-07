import { useFirestoreWriteBatch } from '@react-query-firebase/firestore';
import { doc, increment, writeBatch } from 'firebase/firestore';

import { db } from '@/config/firebase';
import type { User } from '@/features/users';
import { useFirestore } from '@/hooks/useFirestore';
import { useAuthContext } from '@/lib/auth';
import type { TimeStampDTO } from '@/types';
import { timestampTemp } from '@/utils/constants';

import type { Shop, ShopDoc } from '../types';

export type BookmarkShopDTO = {
  data: Shop;
};

type UseBookmarkShopOptions = BookmarkShopDTO & {
  config?: {
    // ...
  };
};

type ShopBookmarkedUserDTO = TimeStampDTO;

export const useBookmarkShop = ({ data }: UseBookmarkShopOptions) => {
  const auth = useAuthContext();

  const batch = writeBatch(db);
  const BookmarkShopBatch = useFirestoreWriteBatch(batch);

  const shopRef = doc(db, 'shops', data.id);
  const userRef = doc(db, 'users', auth?.user ? auth?.user?.uid : '_');
  const bookmarkedUserRef = doc(shopRef, 'bookmarkedUsers', auth?.user ? auth?.user?.uid : '_');
  // const bookmarkedShopRef = doc(userRef, 'bookmarkedShops', data.id);

  const shopDoc = useFirestore<ShopDoc>(shopRef);
  const userDoc = useFirestore<User>(userRef);
  // const isBookmarked = !!userDoc.data && !userDoc.isLoading; // 読み込み済みでデータがあればブクマ済み
  const isBookmarked = !!userDoc.data?.bookmarkedShops.includes(data.id); // リスト内にあればブクマ済み
  const canMutate = !shopDoc.isLoading && !userDoc.isLoading; // 読み込み中はブクマできない

  const mutateToggle = () => {
    if (canMutate) {
      isBookmarked ? mutateUnBookmarkBatch() : mutateBookmarkBatch();
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
    // const bookmarkedShop: BookmarkedShopDTO = {
    //   ...timestampTemp,
    // };
    // batch.set(bookmarkedShopRef, bookmarkedShop);
    batch.update(userRef, {
      bookmarkedShops: [...(userDoc.data?.bookmarkedShops ?? []), data.id],
    });

    batch.update(shopRef, { bookmarkCount: increment(1) });

    BookmarkShopBatch.mutate();
  };

  const mutateUnBookmarkBatch = () => {
    // ブクマしたユーザーのリストから自分を削除
    batch.delete(bookmarkedUserRef);

    // 自分のブクマしたShopリストから削除
    // batch.delete(bookmarkedShopRef);
    batch.update(userRef, {
      bookmarkedShops: userDoc.data?.bookmarkedShops.filter((id) => id !== data.id),
    });

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

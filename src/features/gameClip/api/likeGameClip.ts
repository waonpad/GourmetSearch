import { useFirestoreWriteBatch } from '@react-query-firebase/firestore';
import { doc, increment, writeBatch } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFirestore } from '@/hooks/useFirestore';
import { useAuthContext } from '@/lib/auth';
import { timestampTemp } from '@/utils/constants';

import type { GameClip } from '../types';

export type LikeGameClipDTO = {
  data: GameClip;
};

type UseLikeGameClipOptions = LikeGameClipDTO & {
  config?: {
    // ...
  };
};

export const useLikeGameClip = ({ data }: UseLikeGameClipOptions) => {
  const auth = useAuthContext();

  const batch = writeBatch(db);
  const LikeGameClipBatch = useFirestoreWriteBatch(batch);

  const gameClipRef = doc(db, 'users', data.author.path.split('/')[1], 'gameClips', data.id);
  const userRef = doc(db, 'users', auth?.user ? auth?.user?.uid : '_');
  const likedUserRef = doc(gameClipRef, 'likedUsers', auth?.user ? auth?.user?.uid : '_');
  const likedGameClipRef = doc(userRef, 'likedGameClips', data.id);

  const likedUserDoc = useFirestore<GameClip>(likedUserRef);
  const isLiked = !!likedUserDoc.data && !likedUserDoc.isLoading; // 読み込み済みでデータがあればいいね済み
  const canMutate = !likedUserDoc.isLoading; // 読み込み中はいいねできない

  const mutateToggle = () => {
    if (canMutate) {
      isLiked ? mutateUnLikeBatch() : mutateLikeBatch();
    }
  };

  const mutateLikeBatch = () => {
    // いいねをつけたユーザーのリストに自分を追加
    batch.set(likedUserRef, { ...timestampTemp });

    // 自分のいいねした投稿リストに追加
    batch.set(likedGameClipRef, {
      originRef: gameClipRef,
      ...timestampTemp,
    });

    batch.update(gameClipRef, { likeCount: increment(1) });

    LikeGameClipBatch.mutate();
  };

  const mutateUnLikeBatch = () => {
    // いいねをつけたユーザーのリストから自分を削除
    batch.delete(likedUserRef);

    // 自分のいいねした投稿リストから削除
    batch.delete(likedGameClipRef);

    batch.update(gameClipRef, { likeCount: increment(-1) });

    LikeGameClipBatch.mutate();
  };

  return {
    ...LikeGameClipBatch,
    mutateToggle,
    isLiked,
    canMutate,
  };
};

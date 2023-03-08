import { useFirestoreWriteBatch } from '@react-query-firebase/firestore';
import { doc, writeBatch } from 'firebase/firestore';

import { db, getCounter } from '@/config/firebase';

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
  const gameClipRef = doc(db, 'users', data.author.path.split('/')[1], 'gameClips', data.id);
  const batch = writeBatch(db);
  const LikeGameClipBatch = useFirestoreWriteBatch(batch);

  const mutateBatch = async () => {
    const counter = getCounter(gameClipRef, 'likeCount');
    console.log('counter', counter);
    await counter.incrementBy(1);

    LikeGameClipBatch.mutate();
  };

  return {
    ...LikeGameClipBatch,
    mutateBatch,
  };
};

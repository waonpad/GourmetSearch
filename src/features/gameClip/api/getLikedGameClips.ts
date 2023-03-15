import { collection, doc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import type { CustomQuery } from '@/hooks/useFirestore';
import { useFirestore } from '@/hooks/useFirestore';
import { useAuthContext } from '@/lib/auth';

import type { LikedGameClip } from '../types';

export type UseLikedGameClipsOptions = {
  config?: {
    query?: Omit<CustomQuery<LikedGameClip>, 'target' | 'type'>;
  };
};

const DEFAULT_OPTIONS: UseLikedGameClipsOptions = {
  config: {
    query: {
      orderBy: [
        {
          field: 'createdAt',
          direction: 'desc',
        },
      ],
      limit: {
        limit: 10,
      },
    },
  },
};

export const useLikedGameClips = ({ config }: UseLikedGameClipsOptions) => {
  const auth = useAuthContext();

  const userRef = doc(db, 'users', auth?.user ? auth?.user?.uid : '_');

  const likedGameClips = useFirestore<LikedGameClip[]>({
    target: collection(userRef, 'likedGameClips'),
    ...(config?.query ?? DEFAULT_OPTIONS.config?.query),
  });

  return likedGameClips;
};

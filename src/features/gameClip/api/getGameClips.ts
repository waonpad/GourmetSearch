import { collectionGroup } from 'firebase/firestore';

import { db } from '@/config/firebase';
import type { CustomQuery } from '@/hooks/useFirestore';
import { useFirestore } from '@/hooks/useFirestore';

import type { GameClip } from '../types';

export type UseGameClipOptions = {
  config?: {
    query?: Omit<CustomQuery<GameClip>, 'target' | 'type'>;
  };
};

const DEFAULT_OPTIONS: UseGameClipOptions = {
  config: {
    query: {
      orderBy: [
        {
          field: 'gameTitle',
          direction: 'asc',
        },
        {
          field: 'createdAt',
          direction: 'desc',
        },
      ],
      start: {
        cursor: 'at',
        value: ['elden'],
      },
      limit: {
        limit: 10,
      },
    },
  },
};

export const useGameClips = ({ config }: UseGameClipOptions) => {
  const gameClips = useFirestore<GameClip[]>({
    target: collectionGroup(db, 'gameClips'),
    ...(config?.query ?? DEFAULT_OPTIONS.config?.query),
  });

  return gameClips;
};

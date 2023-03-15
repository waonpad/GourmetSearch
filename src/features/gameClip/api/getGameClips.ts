import { collectionGroup } from 'firebase/firestore';

import { db } from '@/config/firebase';
import type { CustomQuery } from '@/hooks/useFirestore';
import { useFirestore } from '@/hooks/useFirestore';

import type { GameClip } from '../types';

export type UseGameClipsOptions = {
  config?: {
    query?: Omit<CustomQuery<GameClip>, 'target' | 'type'>;
  };
};

const DEFAULT_OPTIONS: UseGameClipsOptions = {
  config: {
    query: {
      orderBy: [
        // {
        //   field: 'gameTitle',
        //   direction: 'asc',
        // },
        {
          field: 'createdAt',
          direction: 'desc',
        },
      ],
      // start: {
      //   cursor: 'at',
      //   value: ['elden'],
      // },
      limit: {
        limit: 10,
      },
    },
  },
};

export const useGameClips = ({ config }: UseGameClipsOptions) => {
  const gameClips = useFirestore<GameClip[]>({
    target: collectionGroup(db, 'gameClips'),
    ...(config?.query ?? DEFAULT_OPTIONS.config?.query),
  });

  return gameClips;
};

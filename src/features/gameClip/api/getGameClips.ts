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
      // limit: {
      //   limit: 10,
      // },
    },
  },
};

export const useGameClips = ({ config }: UseGameClipsOptions) => {
  const gameClips = useFirestore<GameClip[]>({
    target: collectionGroup(db, 'gameClips'),
    where: [...(DEFAULT_OPTIONS.config?.query?.where ?? []), ...(config?.query?.where ?? [])],
    orderBy: [...(DEFAULT_OPTIONS.config?.query?.orderBy ?? []), ...(config?.query?.orderBy ?? [])],
    start: config?.query?.start ?? DEFAULT_OPTIONS.config?.query?.start,
    end: config?.query?.end ?? DEFAULT_OPTIONS.config?.query?.end,
    limit: config?.query?.limit ?? DEFAULT_OPTIONS.config?.query?.limit,
  });

  return gameClips;
};

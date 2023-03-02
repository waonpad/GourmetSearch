import { query, orderBy, collectionGroup } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFirestore } from '@/hooks/useFirestore';

import type { GameClip } from '../types';

type UseGameClipOptions = {
  config?: {
    orderBy?: {
      field: 'createdAt' | 'updatedAt';
      direction: 'asc' | 'desc';
    };
  };
};

const DEFAULT_OPTIONS: UseGameClipOptions = {
  config: {
    orderBy: {
      field: 'createdAt',
      direction: 'desc',
    },
  },
};

export const useGameClips = ({ config }: UseGameClipOptions = DEFAULT_OPTIONS) => {
  const gameClips = useFirestore<GameClip[]>(
    query(
      collectionGroup(db, 'gameClips'),
      orderBy(config?.orderBy?.field as string, config?.orderBy?.direction)
    )
  );

  return gameClips;
};

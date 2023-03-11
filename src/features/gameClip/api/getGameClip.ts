import { doc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFirestore } from '@/hooks/useFirestore';

import type { GameClip } from '../types';

type UseGameClipOptions = {
  id: string;
};

export const useGameClip = ({ id }: UseGameClipOptions) => {
  const gameClip = useFirestore<GameClip>(doc(db, 'gameClips', id));

  return gameClip;
};

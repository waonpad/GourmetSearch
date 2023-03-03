import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';

import { db } from '@/config/firebase';

import type { GameClip } from '../types';

export type DeleteGameClipDTO = {
  data: GameClip;
};

type UseDeleteGameClipOptions = DeleteGameClipDTO & {
  config?: {
    // ...
  };
};

export const useDeleteGameClip = ({ data }: UseDeleteGameClipOptions) => {
  const deleteGameClipMutaion = useFirestoreDocumentDeletion(
    doc(db, 'users', data.author.path.split('/')[1], 'gameClips', data.id)
  );

  return deleteGameClipMutaion;
};

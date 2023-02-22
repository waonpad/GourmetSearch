import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';

import { db } from '@/config/firebase';

import type { MediaPost } from '../types';

export const useDeleteMediaPost = (mediaPost: MediaPost) => {
  const deleteMediaPostMutaion = useFirestoreDocumentDeletion(
    doc(db, 'users', mediaPost.author.path.split('/')[1], 'mediaPosts', mediaPost.id)
  );

  return deleteMediaPostMutaion;
};

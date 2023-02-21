import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';

import { db } from '@/config/firebase';

import type { MediaPost } from '../types';

export const useDeleteMediaPost = (MediaPost: MediaPost) => {
  const deleteMediaPostMutaion = useFirestoreDocumentDeletion(
    doc(db, 'users', MediaPost.author.path.split('/')[1], 'mediaPosts', MediaPost.id)
  );

  return deleteMediaPostMutaion;
};

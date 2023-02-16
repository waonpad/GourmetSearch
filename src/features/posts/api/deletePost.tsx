import { useEffect } from 'react';

import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { doc } from 'firebase/firestore';

import { db } from '@/config/firebase';

import type { Post } from '../types';

export const useDeletePost = (post: Post) => {
  const deletePostMutaion = useFirestoreDocumentDeletion(
    doc(db, 'users', post.author.path.split('/')[1], 'posts', post.id)
  );

  useEffect(() => {
    console.log('deletePostMutaion', deletePostMutaion);
  }, [deletePostMutaion]);

  return deletePostMutaion;
};

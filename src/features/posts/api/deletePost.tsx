import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';

import { db } from '@/config/firebase';

import type { Post } from '../types';

// export const useDeletePost = ({ postId }: { postId: string }) => {
//   const deletePostMutaion = useFirestoreDocumentDeletion(doc(collection(db, 'posts'), postId));

//   return deletePostMutaion;
// };

export const useDeletePost = (post: Post) => {
  const deletePostMutaion = useFirestoreDocumentDeletion(doc(collection(db, 'posts'), post.id));

  return deletePostMutaion;
};

import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';

import { db } from '@/config/firebase';

export const useDeletePost = ({ postId }: { postId: string }) => {
  const deletePostMutaion = useFirestoreDocumentDeletion(doc(collection(db, 'posts'), postId));

  return deletePostMutaion;
};

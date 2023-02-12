// import { useEffect, useState } from 'react';

import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';

import { db } from '@/config/firebase';

export const useDeletePost = ({ postUId }: { postUId: string }) => {
  const deletePostMutaion = useFirestoreDocumentDeletion(doc(collection(db, 'posts'), postUId));

  return deletePostMutaion;
};

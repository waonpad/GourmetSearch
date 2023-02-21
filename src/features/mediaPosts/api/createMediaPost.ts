import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection, doc, serverTimestamp } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFireAuth } from '@/lib/fireAuth';

type CreateMediaPostDTO = {
  data: {
    body: string;
  };
};

export const useCreateMediaPost = () => {
  const { user } = useFireAuth();
  const userRef = doc(collection(db, 'users'), user ? user?.uid : '_');
  const createMediaPostMutaion = useFirestoreCollectionMutation(collection(userRef, 'mediaPosts'));

  const mutateDTO = (config: CreateMediaPostDTO) => {
    const newMediaPost = {
      body: config.data.body,
      author: userRef,
      createdAt: serverTimestamp(),
    };

    createMediaPostMutaion.mutate(newMediaPost);
  };

  return {
    ...createMediaPostMutaion,
    mutateDTO,
  };
};

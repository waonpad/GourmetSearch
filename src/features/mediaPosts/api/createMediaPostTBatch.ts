import { useFirestoreWriteBatch } from '@react-query-firebase/firestore';
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFireAuth } from '@/lib/fireAuth';

type CreateMediaPostDTO = {
  data: {
    body: string;
  };
};

export const useCreateMediaPostTBatch = () => {
  const { user } = useFireAuth();
  const userRef = doc(collection(db, 'users'), user ? user?.uid : '_');
  const batch = writeBatch(db);
  const createMediaPostBatch = useFirestoreWriteBatch(batch);

  const mutateDTO = (config: CreateMediaPostDTO) => {
    const newMediaPost = {
      body: config.data.body,
      author: userRef,
      createdAt: serverTimestamp(),
    };

    batch.set(doc(collection(userRef, 'mediaPosts')), newMediaPost);
    batch.set(doc(collection(db, 'mediaPosts')), newMediaPost);

    createMediaPostBatch.mutate();
  };

  return {
    ...createMediaPostBatch,
    mutateDTO,
  };
};

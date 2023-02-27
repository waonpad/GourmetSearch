import { useFirestoreWriteBatch } from '@react-query-firebase/firestore';
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useAuth } from '@/lib/auth';

type CreatePostDTO = {
  data: {
    body: string;
  };
};

export const useCreatePostTBatch = () => {
  const { user } = useAuth();
  const userRef = doc(collection(db, 'users'), user ? user?.uid : '_');
  const batch = writeBatch(db);
  const createPostBatch = useFirestoreWriteBatch(batch);

  const mutateDTO = (config: CreatePostDTO) => {
    const newPost = {
      body: config.data.body,
      author: userRef,
      createdAt: serverTimestamp(),
    };

    batch.set(doc(collection(userRef, 'posts')), newPost);
    batch.set(doc(collection(db, 'posts')), newPost);

    createPostBatch.mutate();
  };

  return {
    ...createPostBatch,
    mutateDTO,
  };
};

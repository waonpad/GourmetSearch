import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection, doc, serverTimestamp } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFireAuth } from '@/lib/fireAuth';

type CreatePostDTO = {
  data: {
    body: string;
  };
};

export const useCreatePost = () => {
  const { user } = useFireAuth();
  const userRef = doc(collection(db, 'users'), user ? user?.uid : '_');
  const createPostMutaion = useFirestoreCollectionMutation(collection(userRef, 'posts'));

  const mutateDTO = (config: CreatePostDTO) => {
    console.log(userRef);

    const newPost = {
      body: config.data.body,
      author: userRef,
      createdAt: serverTimestamp(),
    };

    createPostMutaion.mutate(newPost);
  };

  return {
    ...createPostMutaion,
    mutateDTO,
  };
};

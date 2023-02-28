import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection, doc, serverTimestamp } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useAuthContext } from '@/lib/auth';

type CreatePostDTO = {
  data: {
    body: string;
  };
};

export const useCreatePost = () => {
  const auth = useAuthContext();
  const userRef = doc(collection(db, 'users'), auth?.user ? auth?.user?.uid : '_');
  const createPostMutaion = useFirestoreCollectionMutation(collection(userRef, 'posts'));

  const mutateDTO = (config: CreatePostDTO) => {
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

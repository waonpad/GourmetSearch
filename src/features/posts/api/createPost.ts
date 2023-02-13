import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection, serverTimestamp } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFireAuth } from '@/lib/fireAuth';

type CreatePostDTO = {
  data: {
    body: string;
  };
};

export const useCreatePost = () => {
  const { user } = useFireAuth();
  const createPostMutaion = useFirestoreCollectionMutation(collection(db, 'posts'));

  const mutateDTO = (config: CreatePostDTO) => {
    const newPost = {
      body: config.data.body,
      authorId: user?.uid as string,
      createdAt: serverTimestamp(),
    };

    createPostMutaion.mutate(newPost);
  };

  return {
    ...createPostMutaion,
    mutateDTO,
  };
};

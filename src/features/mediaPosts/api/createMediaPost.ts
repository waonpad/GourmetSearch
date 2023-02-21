import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection, doc, serverTimestamp } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFireAuth } from '@/lib/fireAuth';

import type { MediaData } from '../types';
import type { DocumentData, DocumentReference, FirestoreError } from 'firebase/firestore';

export const useCreateMediaPost = () => {
  const { user } = useFireAuth();
  const userRef = doc(collection(db, 'users'), user ? user?.uid : '_');
  const createMediaPostMutaion = useFirestoreCollectionMutation(collection(userRef, 'mediaPosts'));

  type CreateMediaPostDTO = {
    data: {
      body: string;
      file: Partial<MediaData>;
    };
    options?: {
      onSuccess?: (data: DocumentReference<DocumentData>) => void;
      onError?: (error: FirestoreError) => void;
    };
  };

  const mutateDTO = (config: CreateMediaPostDTO) => {
    console.log(config.data);

    const newMediaPost = {
      body: config.data.body,
      file: config.data.file,
      author: userRef,
      createdAt: serverTimestamp(),
    };

    createMediaPostMutaion.mutate(newMediaPost, {
      onSuccess: (data) => {
        config.options?.onSuccess && config.options.onSuccess(data);
      },
      onError: (error) => {
        config.options?.onError && config.options.onError(error);
      },
    });
  };

  return {
    ...createMediaPostMutaion,
    mutateDTO,
  };
};

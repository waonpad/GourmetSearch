import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { useErrorHandler } from 'react-error-boundary';

import { db } from '@/config/firebase';
import { useAuthContext } from '@/lib/auth';
import type { TimeStampDTO } from '@/types';
import { getVideoId } from '@/utils/youtube';

import type { YoutubeGameClip } from '../types';
import type { DocumentData, DocumentReference, FirestoreError } from 'firebase/firestore';

type MutateConfig = CreateYoutubeGameClipInput & {
  options?: {
    onSuccess?: (data: DocumentReference<DocumentData>) => void;
    onError?: (error: FirestoreError) => void;
  };
};

export type CreateYoutubeGameClipInput = {
  data: Pick<YoutubeGameClip, 'title' | 'body'> & { videoUrl: string };
};

export type CreateYoutubeGameClipDTO = {
  data: Pick<YoutubeGameClip, 'title' | 'body' | 'type' | 'videoId' | 'author'> & TimeStampDTO;
};

const GAME_CLIP_TYPE = 'youtube';

const CREATE_SUCCESS = 'gameClip create success';
const CREATE_FAILED = 'gameClip create failed';

export const useCreateYoutubeGameClip = () => {
  const auth = useAuthContext();
  const userRef = doc(db, 'users', auth?.user ? auth?.user?.uid : '_');
  const createGameClipMutaion = useFirestoreCollectionMutation(collection(userRef, 'gameClips'));
  const handleError = useErrorHandler();

  // 投稿作成
  const mutateDTO = (config: MutateConfig) => {
    const videoId = getVideoId(config.data.videoUrl);

    if (!videoId) {
      // 使用する側でYoutubeのURLかバリデーションを行う(isYoutubeUrl)
      handleError(new Error('Invalid videoId'));
      return;
    }

    const newGameClip: CreateYoutubeGameClipDTO['data'] = {
      title: config.data.title,
      body: config.data.body,
      type: GAME_CLIP_TYPE,
      videoId: videoId,
      author: userRef,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    createGameClipMutaion.mutate(newGameClip, {
      onSuccess: (data) => console.log(CREATE_SUCCESS, data),
      onError: (error) => {
        console.log(CREATE_FAILED, error);
      },
    });
  };

  return {
    ...createGameClipMutaion,
    mutateDTO,
  };
};
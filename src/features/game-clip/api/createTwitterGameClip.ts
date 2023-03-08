import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { useErrorHandler } from 'react-error-boundary';

import { db } from '@/config/firebase';
import { useAuthContext } from '@/lib/auth';
import type { TimeStampDTO } from '@/types';
import { getTweetId } from '@/utils/twitter';

import type { TwitterGameClip } from '../types';
import type { DocumentData, DocumentReference, FirestoreError } from 'firebase/firestore';

type MutateConfig = CreateTwitterGameClipInput & {
  options?: {
    onSuccess?: (data: DocumentReference<DocumentData>) => void;
    onError?: (error: FirestoreError) => void;
  };
};

export type CreateTwitterGameClipInput = {
  data: Pick<TwitterGameClip, 'title' | 'body' | 'gameTitle'> & { tweetUrl: string };
};

export type CreateTwitterGameClipDTO = {
  data: Pick<
    TwitterGameClip,
    'title' | 'body' | 'gameTitle' | 'type' | 'tweetId' | 'author' | 'likeCount'
  > &
    TimeStampDTO;
};

const GAME_CLIP_TYPE = 'twitter';

const CREATE_SUCCESS = 'gameClip create success';
const CREATE_FAILED = 'gameClip create failed';

export const useCreateTwitterGameClip = () => {
  const auth = useAuthContext();
  const userRef = doc(db, 'users', auth?.user ? auth?.user?.uid : '_');
  const createGameClipMutaion = useFirestoreCollectionMutation(collection(userRef, 'gameClips'));
  const handleError = useErrorHandler();

  // 投稿作成
  const mutateDTO = (config: MutateConfig) => {
    const tweetId = getTweetId(config.data.tweetUrl);

    if (!tweetId) {
      // 使用する側でTwitterのURLかバリデーションを行う(isTwitterUrl)
      handleError(new Error('Invalid tweetId'));
      return;
    }

    const newGameClip: CreateTwitterGameClipDTO['data'] = {
      gameTitle: config.data.gameTitle,
      title: config.data.title,
      body: config.data.body,
      type: GAME_CLIP_TYPE,
      tweetId: tweetId,
      author: userRef,
      likeCount: 0,
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

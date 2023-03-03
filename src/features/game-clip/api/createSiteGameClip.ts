import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection, doc, serverTimestamp } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { useFireStorageDeletion } from '@/hooks/useFireStorageDeletion';
import { useFireStorageMutation } from '@/hooks/useFireStorageMutaion';
import { useAuthContext } from '@/lib/auth';
import type { TimeStampDTO, FullMetadataWithDownloadUrl } from '@/types';

import type { FileData, SiteGameClip } from '../types';
import type { DocumentData, DocumentReference, FirestoreError } from 'firebase/firestore';

type MutateConfig = CreateSiteGameClipInput & {
  options?: {
    onSuccess?: (data: DocumentReference<DocumentData>) => void;
    onError?: (error: FirestoreError) => void;
  };
};

export type CreateSiteGameClipInput = {
  data: Pick<SiteGameClip, 'title' | 'body'>;
};

export type CreateSiteGameClipDTO = {
  data: Pick<SiteGameClip, 'title' | 'body' | 'type' | 'videoData' | 'thumbnailData' | 'author'> &
    TimeStampDTO;
};

const GAME_CLIP_TYPE = 'site';

const FILE_UPLOAD_SUCCESS = 'file upload success';
const FILE_UPLOAD_FAILED = 'file upload failed';
const CREATE_SUCCESS = 'gameClip create success';
const CREATE_FAILED = 'gameClip create failed';
const FILE_DELETE_SUCCESS = 'file delete (rollback) success';
const FILE_DELETE_FAILED = 'file delete (rollback) failed';
const PICK_FILE_DATA: (keyof FullMetadataWithDownloadUrl)[] = [
  'bucket',
  'contentType',
  'fullPath',
  'downloadUrl',
];

export const useCreateSiteGameClip = () => {
  const auth = useAuthContext();
  const userRef = doc(db, 'users', auth?.user ? auth?.user?.uid : '_');
  const createGameClipMutaion = useFirestoreCollectionMutation(collection(userRef, 'gameClips'));
  const fireStorageMutation = useFireStorageMutation(['video'], false);
  const fireStorageDeletion = useFireStorageDeletion();

  const isLoading = fireStorageMutation.isLoading || createGameClipMutaion.isLoading;

  const mutateTSX = (config: MutateConfig) => {
    uploadFile(config);
    // if uploadFile is success, createGameClip is called
    // if createGameClip is failed, deleteFile is called
  };

  // ファイルアップロード
  const uploadFile = (config: MutateConfig) => {
    fireStorageMutation.mutate('gameClips', {
      customMetadata: {
        owner: auth?.user?.uid as string,
      },
      pickFields: PICK_FILE_DATA,
      onSuccess: (data) => {
        console.log(FILE_UPLOAD_SUCCESS);
        console.log(data);
        createGameClip(config, data[0] as FileData);
      },
      onError: (error) => console.log(FILE_UPLOAD_FAILED, error),
    });
  };

  // 投稿作成
  const createGameClip = (config: MutateConfig, file: FileData) => {
    const newGameClip: CreateSiteGameClipDTO['data'] = {
      title: config.data.title,
      body: config.data.body,
      type: GAME_CLIP_TYPE,
      videoData: file,
      thumbnailData: null,
      author: userRef,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    createGameClipMutaion.mutate(newGameClip, {
      onSuccess: (data) => console.log(CREATE_SUCCESS, data),
      onError: (error) => {
        console.log(CREATE_FAILED, error);
        deleteFile(file);
      },
    });
  };

  // ファイル削除
  const deleteFile = (file: FileData) => {
    fireStorageDeletion.mutate(file.fullPath, {
      onSuccess: () => console.log(FILE_DELETE_SUCCESS),
      onError: () => console.log(FILE_DELETE_FAILED),
    });
  };

  return {
    ...createGameClipMutaion,
    mutateTSX,
    fireStorageMutation,
    isLoading,
  };
};

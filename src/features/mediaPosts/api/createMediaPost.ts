import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import _ from 'lodash';

import { db } from '@/config/firebase';
import { useFireStorageDeletion } from '@/hooks/useFireStorageDeletion';
import { useFireStorageMutation } from '@/hooks/useFireStorageMutaion';
import { useFireAuth } from '@/lib/fireAuth';

import type { MediaData, MediaPost } from '../types';
import type { DocumentData, DocumentReference, FirestoreError } from 'firebase/firestore';

type CreateMediaPostDTO = {
  data: Partial<MediaPost>;
  options?: {
    onSuccess?: (data: DocumentReference<DocumentData>) => void;
    onError?: (error: FirestoreError) => void;
  };
};

const FILE_UPLOAD_SUCCESS = 'file upload success';
const FILE_UPLOAD_FAILED = 'file upload failed';
const POST_CREATE_SUCCESS = 'post create success';
const POST_CREATE_FAILED = 'post create failed';
const FILE_DELETE_SUCCESS = 'file delete (rollback) success';
const FILE_DELETE_FAILED = 'file delete (rollback) failed';
const PICK_FILE_DATA = ['bucket', 'contentType', 'downloadUrl', 'fullPath'];

export const useCreateMediaPost = () => {
  const { user } = useFireAuth();
  const userRef = doc(db, 'users', user ? user?.uid : '_');
  const createMediaPostMutaion = useFirestoreCollectionMutation(collection(userRef, 'mediaPosts'));
  const fireStorageMutation = useFireStorageMutation(undefined, false);
  const fireStorageDeletion = useFireStorageDeletion();

  const mutateTSX = (config: CreateMediaPostDTO) => {
    uploadFile(config);
    // if uploadFile is success, createPost is called
    // if cratePost is failed, deleteFile is called
  };

  // 投稿作成関数
  const mutateDTO = (config: CreateMediaPostDTO) => {
    console.log(config.data);

    const newMediaPost = {
      body: config.data.body,
      files: config.data.files,
      author: userRef,
      createdAt: serverTimestamp(),
    };

    createMediaPostMutaion.mutate(newMediaPost, {
      onSuccess: (data) => config.options?.onSuccess && config.options.onSuccess(data),
      onError: (error) => config.options?.onError && config.options.onError(error),
    });
  };

  // ファイルアップロード
  const uploadFile = (config: CreateMediaPostDTO) => {
    fireStorageMutation.mutate('files', {
      customMetadata: {
        owner: user?.uid as string,
      },
      onSuccess: (data) => {
        console.log(FILE_UPLOAD_SUCCESS);
        console.log(data);
        createPost(config, data);
      },
      onError: (error) => console.log(FILE_UPLOAD_FAILED, error),
    });
  };

  // 投稿作成関数に入力データとアップロードしたファイルの情報を渡す
  const createPost = (config: CreateMediaPostDTO, files: MediaData[]) => {
    const pickedFileData = files.map((file) => _.pick(file, PICK_FILE_DATA));

    console.log('pickedFileData', pickedFileData);

    mutateDTO({
      data: {
        body: config.data.body,
        files: pickedFileData,
      },
      options: {
        onSuccess: (data) => console.log(POST_CREATE_SUCCESS, data),
        onError: (error) => {
          console.log(POST_CREATE_FAILED, error);
          deleteFile(files);
        },
      },
    });
  };

  // ファイル削除
  const deleteFile = (files: MediaData[]) => {
    files.map((file) => {
      fireStorageDeletion.mutate(file.fullPath, {
        onSuccess: () => console.log(FILE_DELETE_SUCCESS),
        onError: () => console.log(FILE_DELETE_FAILED),
      });
    });
  };

  return {
    ...createMediaPostMutaion,
    mutateTSX,
    fireStorageMutation,
  };
};

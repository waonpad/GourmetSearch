import { useState } from 'react';

import _ from 'lodash';

import { Button } from '@/components/Elements';
import { useFireStorageDeletion } from '@/hooks/useFireStorageDeletion';
import { useFireStorageMutation } from '@/hooks/useFireStorageMutaion';

import { useCreateMediaPost } from '../api/createMediaPost';

import type { MediaData } from '../types';

export const CreateMediaPost = () => {
  const createMediaPost = useCreateMediaPost();
  const fireStorageMutaion = useFireStorageMutation();
  const fireStorageDeletion = useFireStorageDeletion();

  const [mediaPostBody, setMediaPostBody] = useState<string>('');

  const handleMediaPostBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMediaPostBody(event.currentTarget.value);
  };

  const handleCreateMediaPostClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    uploadFireStorageMutate();
  };

  const uploadFireStorageMutate = () => {
    // ファイルをStorageに保存
    fireStorageMutaion.mutate('files', {
      // 成功したらFirestoreに保存
      onSuccess: (data) => {
        console.log('ファイルアップロード成功');
        createMediaPostMutate(data);
      },
      onError(error) {
        console.error(error);
        console.log('ファイルアップロード失敗');
      },
    });
  };

  const createMediaPostMutate = (data: MediaData) => {
    console.log(data);

    const pickedData = _.pick(data, ['bucket', 'contentType', 'downloadUrl', 'fullPath']);

    createMediaPost.mutateDTO({
      data: {
        body: mediaPostBody,
        file: pickedData,
      },
      options: {
        onSuccess: (data) => {
          setMediaPostBody('');
          console.log(data);
          console.log('投稿成功');
        },
        onError: (error) => {
          console.error(error);
          console.log('投稿失敗, ロールバック開始');
          // 失敗したらStorageから削除
          deleteFile(data);
        },
      },
    });
  };

  const deleteFile = (file: MediaData) => {
    if (file) {
      fireStorageDeletion.mutate(`files/${file?.name}`, {
        onSuccess: () => {
          console.log('投稿失敗, ロールバック成功');
        },
        onError: () => {
          console.error('ロールバック失敗');
        },
      });
    }
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    fireStorageMutaion.setFile(event.target.files?.[0]);
  };

  return (
    <div>
      <h1>ファイルアップロード</h1>
      <input type="file" onChange={handleChangeFile} />
      <input type="text" value={mediaPostBody} onChange={handleMediaPostBodyChange} />
      <Button onClick={handleCreateMediaPostClick}>Create</Button>
    </div>
  );
};

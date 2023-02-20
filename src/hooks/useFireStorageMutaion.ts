import { useEffect, useState } from 'react';

import { uuidv4 } from '@firebase/util';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';

import { storage } from '@/config/firebase';
import { useFireAuth } from '@/lib/fireAuth';

import type { StorageError, TaskState } from 'firebase/storage';

const FILE_TYPE_ERROR_MESSAGE = '画像または動画ファイルを選択してください';
const FILE_NOT_SELECTED_ERROR_MESSAGE = 'ファイルが選択されていません';

export const useFireStorageMutation = () => {
  const { user } = useFireAuth();

  const [fireStorageMutation, setFireStorageMutation] = useState<{
    file: File | undefined;
    error: Error | StorageError | null;
    status: TaskState | null;
    progress: number;
    downloadURL?: string;
  }>({
    file: undefined,
    error: null,
    status: null,
    progress: 0,
    downloadURL: undefined,
  });

  const { file, error } = fireStorageMutation;

  useEffect(() => {
    console.log(error);
  }, [error]);

  const setFile = (file: File | undefined) => {
    console.log(file);
    if (!file) return; // ファイルが選択されていない場合は処理を終了

    // ファイルタイプチェック
    if (file.type.match(/(image|video)/)) {
      setFireStorageMutation((prevState) => ({
        ...prevState,
        file: file,
        error: null,
        status: null,
        progress: 0,
        downloadURL: undefined,
      }));
    } else {
      setFireStorageMutation((prevState) => ({
        ...prevState,
        error: new Error(FILE_TYPE_ERROR_MESSAGE),
        status: null,
        progress: 0,
        downloadURL: undefined,
      }));
    }
  };

  const mutate = (path: string, onSuccess?: () => void, onError?: () => void) => {
    // ファイルが選択されていない場合はエラーを返す
    if (!file) {
      setFireStorageMutation((prevState) => ({
        ...prevState,
        error: new Error(FILE_NOT_SELECTED_ERROR_MESSAGE),
      }));
      onError && onError();
    } else {
      // アップロード処理
      const fileName = `${uuidv4()}.${file.name.split('.').pop()}`;

      const uploadTask = uploadBytesResumable(
        ref(storage, `${path}/${fileName}`),
        file.slice(0, file.size, file.type),
        {
          customMetadata: {
            owner: user?.uid as string,
          },
        }
      );

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setFireStorageMutation((prevState) => ({
            ...prevState,
            progress: progress,
            status: snapshot.state,
          }));
        },
        (error) => {
          setFireStorageMutation((prevState) => ({
            ...prevState,
            error: error,
          }));
          onError && onError();
        },
        // アップロード完了時にダウンロードURLを取得
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFireStorageMutation((prevState) => ({
              ...prevState,
              error: null,
              downloadURL: downloadURL,
            }));
          });
          onSuccess && onSuccess();
        }
      );
    }
  };

  return {
    ...fireStorageMutation,
    setFile,
    mutate,
  };
};

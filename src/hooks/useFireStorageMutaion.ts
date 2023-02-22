import { useEffect, useState } from 'react';

import { uuidv4 } from '@firebase/util';
import { uploadBytesResumable, ref, getDownloadURL, getMetadata } from 'firebase/storage';

import { storage } from '@/config/firebase';

import type { StorageError, TaskState, FullMetadata } from 'firebase/storage';

type FileData = {
  file: File | undefined;
  error: Error | StorageError | null;
  status: TaskState | null;
  progress: number;
  data?: (FullMetadata & { downloadUrl: string }) | undefined;
};

type FireStorageMutation = {
  files: FileData[];
  isLoading: boolean;
  error: Error | StorageError | null;
};

const FILE_TYPE_ERROR_MESSAGE = 'Unsupported file type';
const FILE_NOT_SELECTED_ERROR_MESSAGE = 'File not selected';
const DEFAULT_ALLOW_TYPE = ['image', 'video'];
const KEY_IS_REQUIRED = 'if not multiple mode, key is required';

export const useFireStorageMutation = (
  allowType: string[] = DEFAULT_ALLOW_TYPE,
  multiple: boolean
) => {
  const [fireStorageMutation, setFireStorageMutation] = useState<FireStorageMutation>({
    files: [],
    isLoading: false,
    error: null,
  });
  const [options, setOptions] = useState<
    | {
        onSuccess?: (data: (FullMetadata & { downloadUrl: string })[]) => void;
        onError?: (error?: StorageError) => void;
      }
    | undefined
  >(undefined);

  // エラーが発生したらログに出力
  useEffect(() => {
    fireStorageMutation.error && console.log(fireStorageMutation.error);
    fireStorageMutation.files.forEach((file, index) => {
      file.error && console.log(index, file.error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fireStorageMutation.error, fireStorageMutation.files.map((file) => file.error)]);

  // ファイルをセットする処理
  const setFile = (files: FileList | null, key?: number) => {
    console.log(files);

    if (!multiple && key === undefined) {
      console.error(KEY_IS_REQUIRED);
      return;
    }

    if (!files || files.length === 0) {
      multiple
        ? setFireStorageMutation((prevState) => ({ ...prevState, files: [] }))
        : setFireStorageMutation((prevState) => ({
            ...prevState,
            files: prevState.files.map((file, index) =>
              index === key ? { ...file, file: undefined, error: null } : file
            ),
          }));
      return;
    }

    const newFiles: FileData[] = multiple ? [] : fireStorageMutation.files;

    Array.from(files).map((file, index) => {
      console.log(file);

      const allow = allowType.includes(file.type.split('/')[0]);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      newFiles[multiple ? index : key!] = {
        file: allow ? file : undefined,
        error: allow ? null : new Error(FILE_TYPE_ERROR_MESSAGE),
        status: null,
        progress: 0,
        data: undefined,
      };
    });

    setFireStorageMutation((prevState) => ({
      ...prevState,
      files: newFiles,
    }));
  };

  // アップロード処理
  const mutate = (
    path: string,
    options?: {
      ignoreInvalidFile?: boolean;
      customMetadata?: { [key: string]: string & { owner?: string } };
      onSuccess?: (data: (FullMetadata & { downloadUrl: string })[]) => void;
      onError?: (error?: StorageError) => void;
    }
  ) => {
    // 有効なファイルが選択されているかチェック
    if (!fireStorageMutation.files.some((file) => file.file)) {
      setFireStorageMutation((prevState) => ({
        ...prevState,
        error: new Error(FILE_NOT_SELECTED_ERROR_MESSAGE),
      }));
      options?.onError && options.onError();
      return;
    }

    // 無効なファイルがある場合はエラーを返す
    if (!options?.ignoreInvalidFile && fireStorageMutation.files.some((file) => file.error)) {
      setFireStorageMutation((prevState) => ({
        ...prevState,
        error: new Error(FILE_TYPE_ERROR_MESSAGE),
      }));
      options?.onError && options.onError();
      return;
    }

    // 有効なファイルを全てアップロード
    setFireStorageMutation((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));

    // optionsからonSuccessとonErrorを取り出す
    const { onSuccess, onError } = options || {};
    setOptions({ onSuccess, onError });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const uploadTasks = fireStorageMutation.files.map((file, fileIndex) => {
      if (!file.file) {
        console.error('invalid file');
        return;
      }

      const fileName = `${uuidv4()}.${file.file.name.split('.').pop()}`;

      const uploadTask = uploadBytesResumable(
        ref(storage, `${path}/${fileName}`),
        file.file.slice(0, file.file.size, file.file.type),
        {
          customMetadata: options?.customMetadata,
        }
      );

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setFireStorageMutation((prevState) => ({
            ...prevState,
            files: prevState.files.map((prev, index) => {
              if (fileIndex === index) {
                return {
                  ...prev,
                  progress: progress,
                  status: snapshot.state,
                };
              }
              return prev;
            }),
          }));
        },
        (error) => {
          setFireStorageMutation((prevState) => ({
            ...prevState,
            files: prevState.files.map((prev, index) => {
              if (fileIndex === index) {
                return {
                  ...prev,
                  error: error,
                };
              }
              return prev;
            }),
          }));
          options?.onError && options.onError(error);
        },
        () => {
          Promise.all([
            getMetadata(uploadTask.snapshot.ref),
            getDownloadURL(uploadTask.snapshot.ref),
          ])
            .then(([metadata, downloadUrl]) => {
              setFireStorageMutation((prevState) => ({
                ...prevState,
                files: prevState.files.map((prev, index) => {
                  if (fileIndex === index) {
                    return {
                      ...prev,
                      status: 'success',
                      data: {
                        ...metadata,
                        downloadUrl,
                      },
                    };
                  }
                  return prev;
                }),
              }));
            })
            .catch((error) => {
              setFireStorageMutation((prevState) => ({
                ...prevState,
                files: prevState.files.map((prev, index) => {
                  if (fileIndex === index) {
                    return {
                      ...prev,
                      error: error,
                    };
                  }
                  return prev;
                }),
              }));
              options?.onError && options.onError(error);
            });
        }
      );

      return uploadTask;
    });

    // Promise.all(uploadTasks.map((task) => task?.snapshot))
    //   .then(() => {
    //     setFireStorageMutation((prevState) => ({
    //       ...prevState,
    //       isLoading: false,
    //     }));

    //     if (options?.onSuccess) {
    //       console.log(fireStorageMutation.files);
    //       const successFiles = fireStorageMutation.files.filter((file) => file.data);

    //       console.log(successFiles);
    //       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //       options.onSuccess(successFiles.map((file) => file.data!));
    //     }
    //   })
    //   .catch((error) => {
    //     setFireStorageMutation((prevState) => ({
    //       ...prevState,
    //       isLoading: false,
    //       error: error,
    //     }));
    //     options?.onError && options.onError(error);
    //   });
  };

  useEffect(() => {
    console.log(fireStorageMutation.files.filter((file) => file.file).map((file) => file.status));

    // すべてのファイルのアップロードが完了したかをチェック
    if (
      fireStorageMutation.files
        .filter((file) => file.file)
        .every((file) => file.status === 'success')
    ) {
      setFireStorageMutation((prevState) => ({
        ...prevState,
        isLoading: false,
      }));

      if (options?.onSuccess) {
        console.log(fireStorageMutation.files);
        const successFiles = fireStorageMutation.files.filter((file) => file.data);

        console.log(successFiles);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        options.onSuccess(successFiles.map((file) => file.data!));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(
      fireStorageMutation.files.filter((file) => file.file).map((file) => file.status)
    ),
  ]);

  return {
    ...fireStorageMutation,
    setFile,
    mutate,
  };
};

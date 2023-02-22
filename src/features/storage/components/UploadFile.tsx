import React, { useEffect } from 'react';

import { useFireStorageMutation } from '@/hooks/useFireStorageMutaion';
import { useFireAuth } from '@/lib/fireAuth';

export const UploadFile = () => {
  const { user } = useFireAuth();
  const fireStorageMutaion = useFireStorageMutation(undefined, false);

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    fireStorageMutaion.setFile(event.target.files, index);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fireStorageMutaion.mutate('files', {
      customMetadata: {
        owner: user?.uid as string,
      },
    });
  };

  useEffect(() => {
    // fireStorageMutaion.data && console.log('アップロード成功', fireStorageMutaion.data);

    console.log(fireStorageMutaion);
  }, [fireStorageMutaion]);

  return (
    <div>
      <h1>ファイルアップロード</h1>
      <form onSubmit={onSubmit}>
        {[...Array(3)].map((_, index) => (
          <div key={index}>
            <input type="file" onChange={(event) => handleChangeFile(event, index)} />
            <span>
              {fireStorageMutaion.files[index] && fireStorageMutaion.files[index].error?.message}
            </span>
          </div>
        ))}
        <button>Upload</button>
      </form>
    </div>
  );
};

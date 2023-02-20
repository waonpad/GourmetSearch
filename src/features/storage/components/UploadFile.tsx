import React, { useEffect } from 'react';

import { useFireStorageMutation } from '@/hooks/useFireStorageMutaion';

export const UploadFile = () => {
  const fireStorageMutaion = useFireStorageMutation();

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    fireStorageMutaion.setFile(event.target.files?.[0]);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fireStorageMutaion.mutate('files');
  };

  useEffect(() => {
    fireStorageMutaion.downloadURL &&
      console.log('アップロード成功', fireStorageMutaion.downloadURL);
  }, [fireStorageMutaion.downloadURL]);

  return (
    <div>
      <h1>ファイルアップロード</h1>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleChangeFile} />
        <button>Upload</button>
      </form>
    </div>
  );
};

import { useState } from 'react';

import { Button } from '@/components/Elements';
// import { useFirestoreDeletion } from '@/hooks/useFireStorageDeletion';
import { useFireStorageMutation } from '@/hooks/useFireStorageMutaion';

import { useCreateMediaPost } from '../api/createMediaPost';

export const CreateMediaPost = () => {
  const createMediaPost = useCreateMediaPost();
  const fireStorageMutaion = useFireStorageMutation();
  // const fireStorageDeletion = useFirestoreDeletion();

  const [MediaPostBody, setMediaPostBody] = useState<string>('');

  const handleMediaPostBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMediaPostBody(event.currentTarget.value);
  };

  const handleCreateMediaPostClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fireStorageMutaion.mutate('files');

    // 上の処理が終わったら
    createMediaPost.mutateDTO({
      data: {
        body: MediaPostBody,
      },
    });
  };

  // const handleDeleteFile = () => {
  //   if (file) {
  //     fireStorageDeletion.mutate(
  //       `files/${file?.name}`,
  //       () => console.log('File deleted successfully'),
  //       () => console.error
  //     );
  //   }
  // };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    fireStorageMutaion.setFile(event.target.files?.[0]);
  };

  return (
    <div>
      <h1>ファイルアップロード</h1>
      <input type="file" onChange={handleChangeFile} />
      <input type="text" value={MediaPostBody} onChange={handleMediaPostBodyChange} />
      <Button onClick={handleCreateMediaPostClick}>Create</Button>
    </div>
  );
};

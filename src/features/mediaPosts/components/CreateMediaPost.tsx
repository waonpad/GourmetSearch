import { useState } from 'react';

import { Button } from '@/components/Elements';

import { useCreateMediaPost } from '../api/createMediaPost';

export const CreateMediaPost = () => {
  const createMediaPost = useCreateMediaPost();

  const [mediaPostBody, setMediaPostBody] = useState<string>('');

  const handleMediaPostBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMediaPostBody(event.currentTarget.value);
  };

  const handleCreateMediaPostClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    createMediaPost.mutateTSX({ data: { body: mediaPostBody } });
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    createMediaPost.fireStorageMutation.setFile(event.target.files, index);
  };

  return (
    <div>
      <h1>ファイルアップロード</h1>
      {[...Array(3)].map((_, index) => (
        <div key={index}>
          <input type="file" onChange={(event) => handleChangeFile(event, index)} />
          <span>
            {createMediaPost.fireStorageMutation.files[index] &&
              createMediaPost.fireStorageMutation.files[index].error?.message}
          </span>
        </div>
      ))}
      <input type="text" value={mediaPostBody} onChange={handleMediaPostBodyChange} />
      <Button onClick={handleCreateMediaPostClick}>Create</Button>
    </div>
  );
};

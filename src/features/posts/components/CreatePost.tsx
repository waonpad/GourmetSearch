import { useState } from 'react';

import { Button } from '@/components/Elements';

import { useCreatePost } from '../api/createPost';

export const CreatePost = () => {
  const createPost = useCreatePost();

  const [postBody, setPostBody] = useState<string>('');

  const handlePostBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostBody(event.currentTarget.value);
  };

  const handleCreatePostClick = () => {
    createPost.mutateDTO({
      data: {
        body: postBody,
      },
    });
  };

  return (
    <>
      <input type="text" value={postBody} onChange={handlePostBodyChange} />
      <Button onClick={handleCreatePostClick}>Create</Button>
    </>
  );
};

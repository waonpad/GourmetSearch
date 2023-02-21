import { Button } from '@/components/Elements';

import { useDeleteMediaPost } from '../api/deleteMediaPost';

import type { MediaPost as MediaPostType } from '../types';

type MediaPostProps = {
  mediaPost: MediaPostType;
};

export const MediaPost = ({ mediaPost }: MediaPostProps) => {
  const deleteMediaPost = useDeleteMediaPost(mediaPost);

  const onDeleteClick = () => {
    deleteMediaPost.mutate();
  };

  return (
    <div>
      <h1>{mediaPost.body}</h1>
      <Button onClick={onDeleteClick} isLoading={deleteMediaPost.isLoading}>
        Delete
      </Button>
    </div>
  );
};

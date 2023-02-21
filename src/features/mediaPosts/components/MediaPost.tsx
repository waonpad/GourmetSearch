import { Button } from '@/components/Elements';

import { useDeleteMediaPost } from '../api/deleteMediaPost';

import type { MediaPost as MediaPostType } from '../types';

type MediaPostProps = {
  mediaPost: MediaPostType;
};

export const MediaPost = ({ mediaPost }: MediaPostProps) => {
  const deleteMediaPost = useDeleteMediaPost(mediaPost);

  const onDeleteClick = () => {
    deleteMediaPost.deleteWithStorage();
  };

  return (
    <div>
      <h1>{mediaPost.body}</h1>
      {mediaPost.file && mediaPost.file.contentType?.startsWith('image/') && (
        <img src={mediaPost.file.downloadUrl} alt="File" />
      )}
      {mediaPost.file && mediaPost.file.contentType?.startsWith('video/') && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video src={mediaPost.file.downloadUrl} controls />
      )}
      <Button onClick={onDeleteClick} isLoading={deleteMediaPost.isLoading}>
        Delete
      </Button>
    </div>
  );
};

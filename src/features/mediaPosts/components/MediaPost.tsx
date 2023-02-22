import { Button } from '@/components/Elements';

import { useDeleteMediaPost } from '../api/deleteMediaPost';

import type { MediaPost as MediaPostType } from '../types';

type MediaPostProps = {
  mediaPost: MediaPostType;
};

export const MediaPost = ({ mediaPost }: MediaPostProps) => {
  const deleteMediaPost = useDeleteMediaPost(mediaPost);

  const onDeleteClick = () => {
    deleteMediaPost.mutate(undefined, {
      onSuccess: () => console.log('投稿削除成功, Cloud Functionsでファイルの削除を実行'),
    });
  };

  return (
    <div>
      <h1>{mediaPost.body}</h1>
      {mediaPost.files?.map(
        (file, index) =>
          (file.contentType?.startsWith('image/') && (
            <img key={index} src={file.downloadUrl} alt="File" />
          )) ||
          (file.contentType?.startsWith('video/') && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video key={index} src={file.downloadUrl} controls />
          ))
      )}
      <Button onClick={onDeleteClick} isLoading={deleteMediaPost.isLoading}>
        Delete
      </Button>
    </div>
  );
};

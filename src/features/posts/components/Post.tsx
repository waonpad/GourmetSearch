import { Button } from '@/components/Elements';

import { useDeletePost } from '../api/deletePost';

import type { Post as PostType } from '../types';

type PostProps = {
  post: PostType;
};

export const Post = ({ post }: PostProps) => {
  const deletePost = useDeletePost(post);

  const onDeleteClick = () => {
    deletePost.mutate();
  };

  return (
    <div>
      <h1>{post.body}</h1>
      <Button onClick={onDeleteClick} isLoading={deletePost.isLoading}>
        Delete
      </Button>
    </div>
  );
};

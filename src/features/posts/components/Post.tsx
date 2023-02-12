import { Button } from '@/components/Elements';

import { useDeletePost } from '../api/deletePost';

import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

type PostProps = {
  post: QueryDocumentSnapshot<DocumentData>;
};

export const Post = ({ post }: PostProps) => {
  const deletePost = useDeletePost({ postUId: post.id });

  const onDeleteClick = () => {
    deletePost.mutate();
  };

  return (
    <div>
      <h1>{post.data().body}</h1>
      <Button onClick={onDeleteClick} isLoading={deletePost.isLoading}>
        Delete
      </Button>
    </div>
  );
};

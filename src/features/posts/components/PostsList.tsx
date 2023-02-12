import React from 'react';

import { Post } from './Post';

import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

type PostsListProps = {
  posts: QueryDocumentSnapshot<DocumentData>[] | undefined;
};

export const PostsList = ({ posts }: PostsListProps) => {
  if (!posts) {
    return <></>;
  }

  return (
    <div>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

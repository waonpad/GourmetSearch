import React from 'react';

import { Post } from './Post';

import type { Post as PostType } from '../types';

type PostsListProps = {
  posts: PostType[] | undefined;
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

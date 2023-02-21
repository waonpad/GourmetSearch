import React from 'react';

import { MediaPost } from './MediaPost';

import type { MediaPost as MediaPostType } from '../types';

type MediaPostsListProps = {
  mediaPosts: MediaPostType[] | undefined;
};

export const MediaPostsList = ({ mediaPosts }: MediaPostsListProps) => {
  if (!mediaPosts) {
    return <></>;
  }

  return (
    <div>
      {mediaPosts.map((mediaPost, index) => (
        <MediaPost key={index} mediaPost={mediaPost} />
      ))}
    </div>
  );
};

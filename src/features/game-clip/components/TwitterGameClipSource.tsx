import { Tweet } from 'react-twitter-widgets';

import type { TwitterGameClip } from '../types';

type TwitterGameClipSourceProps = {
  data: TwitterGameClip;
};

export const TwitterGameClipSource = ({ data }: TwitterGameClipSourceProps) => {
  return <Tweet tweetId={data.tweetId} />;
};

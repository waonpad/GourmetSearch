import { ReactPlayerLazy } from '@/lib/react-player';
import { getThumbnailUrl } from '@/utils/youtube';

import type { YoutubeGameClip } from '../types';

type YoutubeGameClipSourceProps = {
  data: YoutubeGameClip;
};

export const YoutubeGameClipSource = ({ data }: YoutubeGameClipSourceProps) => {
  return (
    <ReactPlayerLazy
      url={`https://www.youtube.com/watch?v=${data.videoId}`}
      light={getThumbnailUrl(data.videoId)}
    />
  );
};

import { ReactPlayerLazy } from '@/lib/react-player';
import { getVideoUrl, getThumbnailUrl } from '@/utils/youtube';

import type { YoutubeGameClip } from '../types';

type YoutubeGameClipSourceProps = {
  data: YoutubeGameClip;
};

export const YoutubeGameClipSource = ({ data }: YoutubeGameClipSourceProps) => {
  return <ReactPlayerLazy url={getVideoUrl(data.videoId)} light={getThumbnailUrl(data.videoId)} />;
};

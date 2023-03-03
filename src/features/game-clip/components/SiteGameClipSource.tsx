import { ReactPlayerLazy } from '@/lib/react-player';

import type { SiteGameClip } from '../types';

type SiteGameClipSourceProps = {
  data: SiteGameClip;
};

export const SiteGameClipSource = ({ data }: SiteGameClipSourceProps) => {
  return (
    <ReactPlayerLazy url={data.videoData.downloadUrl} light={data.thumbnailData?.downloadUrl} />
  );
};

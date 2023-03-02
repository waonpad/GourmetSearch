import { useState } from 'react';

import type { SiteGameClip } from '../types';

type SiteGameClipSourceProps = {
  data: SiteGameClip;
};

export const SiteGameClipSource = ({ data }: SiteGameClipSourceProps) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleClickThumbnail = () => {
    setShowVideo(true);
  };

  if (data.thumbnailData && !showVideo) {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <img src={data.thumbnailData.downloadUrl} alt="Game Clip" onClick={handleClickThumbnail} />
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video controls autoPlay>
      <source src={data.videoData.downloadUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

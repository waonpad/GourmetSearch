export const isYouTubeUrl = (url: string) => {
  const parser = new URL(url);
  return parser.hostname === 'www.youtube.com' || parser.hostname === 'youtu.be';
};

export const getVideoId = (url: string) => {
  if (!isYouTubeUrl(url)) return null;
  const regex = /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11,})+(?:[%#?&]|$)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const getThumbnailUrl = (urlOrVideoId: string) => {
  // 引数がURLの場合はvideoIdを取得、そうでない場合は引数をそのままvideoIdとして使用
  const videoId = isYouTubeUrl(urlOrVideoId) ? getVideoId(urlOrVideoId) : urlOrVideoId;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

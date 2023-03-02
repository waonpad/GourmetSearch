export const isYouTubeUrl = (url: string) => {
  try {
    const parser = new URL(url);
    return parser.hostname === 'www.youtube.com' || parser.hostname === 'youtu.be';
  } catch (error) {
    return false;
  }
};

export const isYouTubeVideoUrl = (url: string) => {
  if (!isYouTubeUrl(url)) return false;
  const parser = new URL(url);
  return (
    parser.pathname.startsWith('/watch') ||
    parser.pathname.startsWith('/embed') ||
    (parser.hostname === 'youtu.be' && !!parser.pathname.match(/^\/[0-9A-Za-z_-]{10,}$/))
  );
};

export const getVideoId = (url: string) => {
  if (!isYouTubeVideoUrl(url)) return null;
  const regex = /(?:\/|v=)([0-9A-Za-z_-]{10,})+(?:[%#?&]|$)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const getThumbnailUrl = (youtubeVideoId: string) => {
  return `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
};

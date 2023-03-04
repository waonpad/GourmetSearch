export const isYoutubeUrl = (url: string) => {
  try {
    const parser = new URL(url);
    return /(^|\.)youtube.com$/.test(parser.host) || parser.hostname === 'youtu.be';
  } catch (error) {
    return false;
  }
};

export const isYoutubeVideoUrl = (url: string) => {
  if (!isYoutubeUrl(url)) return false;
  const parser = new URL(url);
  return (
    (parser.pathname.startsWith('/watch') && parser.searchParams.get('v') !== null) ||
    parser.pathname.startsWith('/embed') ||
    (parser.hostname === 'youtu.be' && !!parser.pathname.match(/^\/[0-9A-Za-z_-]{10,}$/))
  );
};

export const getVideoId = (url: string) => {
  if (!isYoutubeVideoUrl(url)) return null;
  const regex = /(?:\/|v=)([0-9A-Za-z_-]{10,})+(?:[%#?&]|$)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const getVideoUrl = (youtubeVideoId: string) => {
  return `https://www.youtube.com/watch?v=${youtubeVideoId}`;
};

export const getThumbnailUrl = (youtubeVideoId: string) => {
  return `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
};

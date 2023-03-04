export const isTwitterUrl = (url: string) => {
  try {
    const parser = new URL(url);
    return /(^|\.)twitter.com$/.test(parser.host);
  } catch (error) {
    return false;
  }
};

export const isTweetUrl = (url: string) => {
  if (!isTwitterUrl(url)) return false;
  const parser = new URL(url);
  return /\/status(es)?\/\d+/.test(parser.pathname);
};

export const getTweetId = (url: string) => {
  if (!isTweetUrl(url)) return null;
  const parser = new URL(url);
  return parser.pathname.match(/\/status(es)?\/(\d+)/)?.[2];
};

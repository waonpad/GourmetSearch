export const isTwitterUrl = (url: string) => {
  const twitterHostnames = [
    'twitter.com',
    'www.twitter.com',
    'mobile.twitter.com',
    // 'pbs.twimg.com',
    // 't.co',
  ];

  try {
    const parser = new URL(url);
    return twitterHostnames.includes(parser.hostname);
  } catch (error) {
    return false;
  }
};

export const isTweetUrl = (url: string) => {
  if (!isTwitterUrl(url)) return false;
  const regex =
    /^https?:\/\/(?:www\.|mobile\.)?twitter\.com\/(?:#!\/)?([a-zA-Z0-9_]{1,15})\/status(?:es)?\/(\d+)(?:\?.*)?$/;
  return regex.test(url);
};

export const getTweetId = (url: string) => {
  if (!isTweetUrl(url)) return null;

  const regexes = [
    /https?:\/\/twitter\.com\/(\w+)\/status(es)?\/(\d+)/,
    /https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/,
    /https?:\/\/mobile\.twitter\.com\/(\w+)\/status(es)?\/(\d+)/,
  ];

  for (const regex of regexes) {
    const match = url.match(regex);
    if (match) {
      return match[match.length - 1];
    }
  }

  return null;
};

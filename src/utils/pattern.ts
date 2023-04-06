export const getHrefFromAtag = (aTag: string): string => {
  const href = aTag.match(/href="(.+?)"/)?.[1];
  return href ?? '';
};

export const getChildFromTag = (tag: string): string => {
  const child = tag.match(/>(.+?)</)?.[1];
  return child ?? '';
};

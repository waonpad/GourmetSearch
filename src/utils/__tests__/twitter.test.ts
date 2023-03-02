import { isTwitterUrl, isTweetUrl, getTweetId } from '../twitter';

describe('isTwitterUrl', () => {
  test('returns true for valid twitter URLs', () => {
    expect(isTwitterUrl('https://twitter.com/')).toBe(true);
    expect(isTwitterUrl('https://twitter.com/hashtag/tbt')).toBe(true);
    expect(isTwitterUrl('https://twitter.com/search?q=hello')).toBe(true);
    expect(isTwitterUrl('https://twitter.com/Twitter/status/1234567890')).toBe(true);
    expect(isTwitterUrl('https://www.twitter.com/Twitter/status/1234567890')).toBe(true);
    expect(isTwitterUrl('https://mobile.twitter.com/Twitter/status/1234567890')).toBe(true);
  });

  test('returns false for invalid twitter URLs', () => {
    expect(isTwitterUrl('https://pbs.twimg.com/profile_images/1234567890/photo.jpg')).toBe(false);
    expect(isTwitterUrl('https://t.co/abcdefg')).toBe(false);
    expect(isTwitterUrl('https://www.google.com/')).toBe(false);
  });
});

describe('isTweetUrl', () => {
  test('valid tweet url', () => {
    const urls = [
      'https://twitter.com/elonmusk/status/1367528057626767874',
      'https://www.twitter.com/elonmusk/status/1367528057626767874',
      'https://mobile.twitter.com/elonmusk/status/1367528057626767874',
      'https://twitter.com/elonmusk/statuses/1367528057626767874',
      'https://www.twitter.com/elonmusk/statuses/1367528057626767874',
      'https://mobile.twitter.com/elonmusk/statuses/1367528057626767874',
    ];
    urls.forEach((url) => {
      expect(isTweetUrl(url)).toBe(true);
    });
  });

  test('invalid tweet url', () => {
    const urls = [
      'https://twitter.com/',
      'https://twitter.com/elonmusk',
      'https://twitter.com/elonmusk/status/',
      'https://twitter.com/elonmusk/status/abc',
      'https://www.google.com/search?q=elon+musk+twitter&oq=elon+musk+twitter',
    ];
    urls.forEach((url) => {
      expect(isTweetUrl(url)).toBe(false);
    });
  });
});

describe('getTweetId', () => {
  it('returns null for invalid URL', () => {
    expect(getTweetId('not a URL')).toBeNull();
    expect(getTweetId('https://example.com')).toBeNull();
    expect(getTweetId('https://twitter.com/')).toBeNull();
    expect(getTweetId('https://twitter.com/user')).toBeNull();
    expect(getTweetId('https://twitter.com/user/status')).toBeNull();
    expect(getTweetId('https://twitter.com/user/status/invalidid')).toBeNull();
  });

  it('returns the tweet ID for valid URLs', () => {
    expect(getTweetId('https://twitter.com/user/status/1234567890')).toBe('1234567890');
    expect(getTweetId('https://twitter.com/user/statuses/1234567890')).toBe('1234567890');
    expect(getTweetId('https://twitter.com/user/status/1234567890?ref_src=twsrc%5Etfw')).toBe(
      '1234567890'
    );
    expect(getTweetId('https://mobile.twitter.com/user/status/1234567890')).toBe('1234567890');
  });
});

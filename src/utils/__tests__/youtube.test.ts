import { isYouTubeUrl, isYouTubeVideoUrl, getVideoId } from '../youtube';

// 参考
// https://takashiski.hatenablog.com/entry/2021/09/19/124500

describe('isYouTubeUrl', () => {
  test('should return true for www.youtube.com', () => {
    expect(isYouTubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
    expect(isYouTubeUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe(true);
    expect(isYouTubeUrl('https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw')).toBe(true);
  });
  test('should return true for youtu.be', () => {
    expect(isYouTubeUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true);
  });
  test('should return false for other URLs', () => {
    expect(isYouTubeUrl('https://www.google.com/')).toBe(false);
  });
});

describe('isYouTubeVideoUrl', () => {
  test('returns true for valid YouTube video URLs', () => {
    const validUrls = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'https://www.youtube.com/embed/dQw4w9WgXcQ?start=10',
      'https://youtu.be/dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=ngNhpdaT5V0&list=PLxai42gkPeMN1nTZFD4PEc96sMI8mdT03&index=3',
    ];
    validUrls.forEach((url) => {
      expect(isYouTubeVideoUrl(url)).toBe(true);
    });
  });

  test('returns false for invalid YouTube video URLs', () => {
    const invalidUrls = [
      'https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw',
      'https://www.youtube.com/results?search_query=cats',
      'https://www.youtube.com/',
      'https://youtu.be/',
    ];
    invalidUrls.forEach((url) => {
      expect(isYouTubeVideoUrl(url)).toBe(false);
    });
  });

  test('returns false for non-YouTube URLs', () => {
    const nonYouTubeUrls = ['https://example.com', 'https://www.google.com/search?q=youtube'];
    nonYouTubeUrls.forEach((url) => {
      expect(isYouTubeVideoUrl(url)).toBe(false);
    });
  });
});

describe('getVideoId', () => {
  test('returns video ID for valid YouTube video URLs', () => {
    const urlsAndIds = [
      ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
      ['https://youtu.be/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
      ['https://youtu.be/dQw4w9WgXcQ?t=10s', 'dQw4w9WgXcQ'],
      ['https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s', 'dQw4w9WgXcQ'],
      ['https://www.youtube.com/embed/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
      ['https://www.youtube.com/embed/dQw4w9WgXcQ?start=10', 'dQw4w9WgXcQ'],
      [
        'https://www.youtube.com/watch?v=ngNhpdaT5V0&list=PLxai42gkPeMN1nTZFD4PEc96sMI8mdT03&index=3',
        'ngNhpdaT5V0',
      ],
    ];
    urlsAndIds.forEach(([url, expectedId]) => {
      expect(getVideoId(url)).toBe(expectedId);
    });
  });

  test('returns null for invalid or non-YouTube URLs', () => {
    const invalidUrls = [
      'https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw',
      'https://www.youtube.com/results?search_query=cats',
      'https://www.youtube.com/',
      'https://youtu.be/',
      'https://example.com',
      'https://www.google.com/search?q=youtube',
    ];
    invalidUrls.forEach((url) => {
      expect(getVideoId(url)).toBe(null);
    });
  });
});

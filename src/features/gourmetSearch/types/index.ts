import _ from 'lodash';

import type { BaseEntity } from '@/types';

export * from './hotpepperApiRequest';
export * from './hotpepperApiResponse';

export type BookmarkedShop = BaseEntity;

export type ShopBookmarkedUser = BaseEntity;

export type BookmarkShopsRequest = {
  start?: number;
  count?: number;
};

export const bookmarkShopsRequestConverter = (request: {
  start?: string;
  count?: string;
}): BookmarkShopsRequest => {
  const convertedRequest = {
    start: request.start ? Number(request.start) : undefined,
    count: request.count ? Number(request.count) : undefined,
  };

  return _.pickBy(convertedRequest, (value) => value !== undefined);
};

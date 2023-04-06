import _ from 'lodash';

import type { BaseEntity } from '@/types';

export * from './hotpepperApiRequest';
export * from './hotpepperApiResponse';

export type BookmarkedShop = BaseEntity;

export type ShopBookmarkedUser = BaseEntity;

export type ShopDoc = BaseEntity & {
  bookmarkCount: number;
};

export type GetBookmarkedShopsRequest = {
  start?: number;
  count?: number;
};

export const bookmarkShopsRequestConverter = (request: {
  start?: string;
  count?: string;
}): GetBookmarkedShopsRequest => {
  const convertedRequest = {
    start: request.start ? Number(request.start) : undefined,
    count: request.count ? Number(request.count) : undefined,
  };

  return _.pickBy(convertedRequest, (value) => value !== undefined);
};

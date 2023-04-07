import type { OmittedHotpepperGourmetSearchAPIRequest } from '../types';

export const FEATURE_CONSTANTS = {
  REACT_QUERY_KEYS: {
    GET_SHOPS: 'shops',
    GET_SHOP: 'shop',
  },
  SHOP_DETAIL_HIDE_TARGET_STR_LENGTH: 1,
  HOTPEPPER_SHOP_URL: 'https://www.hotpepper.jp/str',
  HOTPEPPER_GOURMET_SEARCH_API_ENDPOINT: '/gourmet/v1/',
  HOTPEPPER_GOURMET_SEARCH_API_CUSTOM_PROPERTIES: ['allRange'],
  GET_SHOPS_DEFAULT_REQUEST_RANGE: 5,
  GET_SHOPS_DEFAULT_REQUEST_COUNT: 10,
  GET_SHOPS_DEFAULT_REQUEST_START: 1,
  GET_BOOKMARKED_SHOPS_DEDAULT_REQUEST_COUNT: 10,
  GET_BOOKMARKED_SHOPS_DEDAULT_REQUEST_START: 1,
  SHOPS_PATH: '/app/gourmet-search/shops',
  SHOP_PATH: '/app/gourmet-search/shop',
  BOOKMARKED_SHOPS_PATH: '/app/gourmet-search/bookmarks',
} as const;

export const GET_SHOPS_DEFAULT_REQUEST: OmittedHotpepperGourmetSearchAPIRequest = {
  range: FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_RANGE,
  count: FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_COUNT,
  start: FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_START,
};

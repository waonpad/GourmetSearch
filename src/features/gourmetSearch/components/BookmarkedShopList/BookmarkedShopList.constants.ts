const LITERAL_CONSTANTS = {
  BOOKMARKED_SHOP_LIST_RESULTS_LABEL: 'Bookmarks',
  BOOKMARKED_SHOP_LIST_NO_RESULTS_LABEL: 'No Bookmarked',
  USER_IS_NOT_EXIST_MESSAGE: 'This user is not exist',
  GET_BOOKMARKED_SHOPS_ERROR_MESSAGE: 'Failed to get bookmarked shops',
} as const;

export const CONSTANTS = {
  ...LITERAL_CONSTANTS,
};

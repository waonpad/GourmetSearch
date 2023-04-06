const LITERAL_CONSTANTS = {
  STYLE_CHANGE_TARGET_BREAKPOINT: 'md',
  PHOTO_LIST_RESULTS_LABEL: 'Photos',
  PHOTO_LIST_NO_RESULTS_LABEL: 'No Photos',
  PHOTO_LIST_COLS_LARGE_BREAKPOINT: 'lmd',
  PHOTO_LIST_COLS_LARGE: 6,
  PHOTO_LIST_COLS_MEDIUM_BREAKPOINT: 'md',
  PHOTO_LIST_COLS_MEDIUM: 5,
  PHOTO_LIST_COLS_SMALL_BREAKPOINT: 'smd',
  PHOTO_LIST_COLS_SMALL: 4,
} as const;

export const CONSTANTS = {
  ...LITERAL_CONSTANTS,
};

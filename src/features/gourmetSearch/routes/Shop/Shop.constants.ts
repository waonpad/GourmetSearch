const LITERAL_CONSTANTS = {
  STYLE_CHANGE_TARGET_BREAKPOINT: 'md',
  SHOP_CARD_MEDIA_VISIBLE_CHANGE_TARGET_BREAKPOINT: 'sm',
  SHOP_CARD_MEDIA_COLLAPSED_SIZE: 150,
  SHOP_IS_NOT_EXIST_ERROR_MESSAGE: 'Shop is not exist',
  ACTION_BUTTON_LABEL_SHORTEN_TARGET_BREAKPOINT: '500px',
} as const;

export const CONSTANTS = {
  ...LITERAL_CONSTANTS,
};

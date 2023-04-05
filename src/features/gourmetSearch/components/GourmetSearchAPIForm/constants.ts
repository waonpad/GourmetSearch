import { FEATURE_CONSTANTS } from '../../constants';

import type { GourmetSearchAPIFormInput } from './types';

type ConstantsType = {
  GOURMET_SEARCH_API_FORM: {
    DEFAULT_VALUES: {
      [K in NonNullable<keyof GourmetSearchAPIFormInput>]: NonNullable<
        GourmetSearchAPIFormInput[K]
      >;
    };
    RANGES: {
      value: GourmetSearchAPIFormInput['range'] | 0;
      label: string;
      range: number;
    }[];
  };
};

const TYPED_CONSTANTS: ConstantsType = {
  GOURMET_SEARCH_API_FORM: {
    DEFAULT_VALUES: {
      keyword: '',
      range: FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_RANGE,
    },
    RANGES: [
      { value: 1, label: '300m', range: 300 },
      { value: 2, label: '500m', range: 500 },
      { value: 3, label: '1000m', range: 1000 },
      { value: 4, label: '2000m', range: 2000 },
      { value: 5, label: '3000m', range: 3000 },
      { value: 0, label: 'All Range', range: 0 },
    ],
  },
};

const LITERAL_CONSTANTS = {
  STYLE_CHANGE_TARGET_BREAKPOINT: 'md',
  GOURMET_SEARCH_API_FORM: {
    TITLE: 'Search Shops',
    KEYWORD_NAME: 'keyword',
    KEYWORD_LABEL: 'Keyword',
    RANGE_NAME: 'range',
    RANGE_LABEL: 'Range',
    RESET_BUTTON_LABEL: 'Reset',
    SUBMIT_BUTTON_LABEL: 'Search',
  },
  MAP: {
    SHOW_MAP_BUTTON_LABEL: 'Search by Map',
    HIDE_MAP_BUTTON_LABEL: 'Hide Map',
    RESET_LOCATION_BUTTON_LABEL: 'Back to Current Location',
  },
} as const;

export const CONSTANTS: ConstantsType & typeof LITERAL_CONSTANTS = {
  ...TYPED_CONSTANTS,
  ...LITERAL_CONSTANTS,
  GOURMET_SEARCH_API_FORM: {
    ...TYPED_CONSTANTS.GOURMET_SEARCH_API_FORM,
    ...LITERAL_CONSTANTS.GOURMET_SEARCH_API_FORM,
  },
  MAP: LITERAL_CONSTANTS.MAP,
};

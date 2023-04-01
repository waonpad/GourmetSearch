/**
 * Hotpepper APIのレスポンスの基底型
 */
export interface BaseHotpepperResponse {
  results: {
    api_version: string;
  };
}

/**
 * Hotpepper APIの成功レスポンスの基底型
 */
export interface BaseHotpepperSuccessResponse extends BaseHotpepperResponse {
  results: {
    results_available: number;
    results_returned: string;
    results_start: number;
  } & BaseHotpepperResponse['results'];
}

/**
 * Hotpepper APIのエラーレスポンスの型
 */
export interface HotpepperErrorResponse extends BaseHotpepperResponse {
  results: {
    error: {
      code: number;
      message: string;
    }[];
  } & BaseHotpepperResponse['results'];
}

/**
 * Hotpepper APIのレスポンスの型
 */
export type HotpepperResponse = HotpepperGourmetResponse;

/**
 * Hotpepper APIのグルメサーチAPIの成功レスポンスの型
 */
export interface HotpepperGourmetSuccessResponse extends BaseHotpepperSuccessResponse {
  results: {
    shop: Shop[];
  } & BaseHotpepperSuccessResponse['results'];
}

/**
 * Hotpepper APIのグルメサーチAPIのレスポンスの型
 */
export type HotpepperGourmetResponse = HotpepperGourmetSuccessResponse | HotpepperErrorResponse;

/**
 * グルメサーチAPIの成功レスポンスの型ガード
 */
export const isHotpepperGourmetSuccessResponse = (
  response: HotpepperGourmetResponse
): response is HotpepperGourmetSuccessResponse => {
  return (response as HotpepperGourmetSuccessResponse).results.shop !== undefined;
};

/**
 * ホットペッパーAPIのエラーレスポンスの型ガード
 */
export const isHotpepperErrorResponse = (
  response: HotpepperResponse
): response is HotpepperErrorResponse => {
  return (response as HotpepperErrorResponse).results.error !== undefined;
};

/**
 * プロパティが無いものもある？
 */
export interface Shop {
  id: string;
  name: string;
  logo_image: string;
  name_kana: string;
  address: string;
  station_name: string;
  ktai_coupon: 0 | 1;
  large_service_area: Area;
  service_area: Area;
  large_area: Area;
  middle_area: Area;
  small_area: Area;
  lat: number;
  lng: number;
  genre: Genre;
  sub_genre?: SubGenre;
  budget: Budget;
  budget_memo: string;
  catch: string;
  capacity: number;
  access: string;
  mobile_access: string;
  urls: Urls;
  open: string;
  close: string;
  party_capacity: number;
  wifi: string;
  other_memo: string;
  shop_detail_memo: string;
  wedding: string;
  free_drink: string;
  free_food: string;
  private_room: string;
  horigotatsu: string;
  tatami: string;
  card: string;
  non_smoking: string;
  charter: string;
  ktai: string;
  parking: string;
  barrier_free: string;
  sommelier: string;
  open_air: string;
  show: string;
  karaoke: string;
  band: string;
  tv: string;
  english: string;
  pet: string;
  child: string;
  coupon_urls: CouponUrls;
  course: string;
  photo: Photo;
  lunch: string;
  midnight: string;
  // special?: special;
  // credit_card?: CreditCard;
}

export interface Budget {
  code: string;
  name: string;
  average: string;
}

export interface CouponUrls {
  pc: string;
  sp: string;
}

export interface Genre {
  code: string;
  name: string;
  catch: string;
}

export interface SubGenre {
  code: string;
  name: string;
}

export interface Area {
  code: string;
  name: string;
}

export interface Photo {
  pc: PC;
  mobile: Mobile;
}

export interface Mobile {
  l: string;
  s: string;
}

export interface PC {
  l: string;
  m: string;
  s: string;
}

export interface Urls {
  pc: string;
}

// export interface special {
//   code: string;
//   name: string;
//   special_category: SpecialCategory;
//   title: string;
// }

// export interface SpecialCategory {
//   code: string;
//   name: string;
// }

// export interface CreditCard {
//   code: string;
//   name: string;
// }

export const hotpepperGourmetShopPhotoSize = {
  logo_image: {
    width: 69,
    height: 69,
  },
  pc: {
    l: {
      width: 238,
      height: 238,
    },
    m: {
      width: 168,
      height: 168,
    },
    s: {
      width: 58,
      height: 58,
    },
  },
  mobile: {
    l: {
      width: 168,
      height: 168,
    },
    s: {
      width: 100,
      height: 100,
    },
  },
};

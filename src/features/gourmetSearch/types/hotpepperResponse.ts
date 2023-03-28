// TODO: リクエストのtypeによって返ってくるレスポンスの形式が違うのに対応しないといけない

export interface BaseHotpepperResponse {
  results: {
    api_version: number;
    results_available: number;
    results_returned: number;
    results_start: number;
  };
}

export interface HotpepperGourmetResponse extends BaseHotpepperResponse {
  results: {
    shop: Shop[];
  } & BaseHotpepperResponse['results'];
}

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
  sub_genre: SubGenre;
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
  special?: special;
  credit_card?: CreditCard;
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

export interface special {
  code: string;
  name: string;
  special_category: SpecialCategory;
  title: string;
}

export interface SpecialCategory {
  code: string;
  name: string;
}

export interface CreditCard {
  code: string;
  name: string;
}

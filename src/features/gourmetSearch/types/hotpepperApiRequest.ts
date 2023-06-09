import _ from 'lodash';

/* eslint-disable prettier/prettier */
export interface BaseHotpepperAPIRequest {
  key: string;
  format?: 'xml' | 'json' | 'jsonp';
}

export type OmittedHotpepperGourmetSearchAPIRequest = Omit<HotpepperGourmetSearchAPIRequest, 'key'>;

export type CustomizedHotpepperGourmetSearchAPIRequest = OmittedHotpepperGourmetSearchAPIRequest & {
  allRange?: 0 | 1;
};

export interface HotpepperGourmetSearchAPIRequest extends BaseHotpepperAPIRequest {
  id?: string; // 20つまで id=1&id=2&id=3 or id=1,2,3
  name?: string; // 部分一致
  name_kana?: string; // 部分一致
  name_any?: string; // nameかname_kanaで部分一致
  tel?: number;
  address?: string; // 部分一致
  special?: string; // 複数指定
  special_or?: string; // 複数指定
  special_category?: string; // 複数指定
  special_category_or?: string; // 複数指定
  large_service_area?: string;
  service_area?: string; // 3つまで
  large_area?: string; // 3つまで
  middle_area?: string; // 5つまで
  small_area?: string; // 5つまで
  /**
   * 店名かな、店名、住所、駅名、お店ジャンルキャッチ、キャッチのフリーワード検索    
   * 半角スペース区切りの文字列を渡すことでAND検索になる
   */
  keyword?: string; // 複数指定
  lat?: number;
  lng?: number;
  range?: 1 | 2 | 3 | 4 | 5; // 1:300m, 2:500m, 3:1000m, 4:2000m, 5:3000m
  datum?: string; // 初期値?: world
  ktai_coupon?: 0 | 1; // 0:あり, 1:なし
  genre?: string; // 複数指定
  budget?: string; // 2つまで
  party_capacity?: number;
  // ↓絞り込み /////////////////
  // 0:絞り込まない（初期値）1:絞り込む
  wifi?: 0 | 1;
  wedding?: 0 | 1;
  course?: 0 | 1;
  free_drink?: 0 | 1;
  free_food?: 0 | 1;
  private_room?: 0 | 1;
  horigotatsu?: 0 | 1;
  tatami?: 0 | 1;
  cocktail?: 0 | 1;
  shochu?: 0 | 1;
  sake?: 0 | 1;
  wine?: 0 | 1;
  card?: 0 | 1;
  non_smoking?: 0 | 1;
  charter?: 0 | 1;
  ktai?: 0 | 1;
  parking?: 0 | 1;
  barrier_free?: 0 | 1;
  sommelier?: 0 | 1;
  night_view?: 0 | 1;
  open_air?: 0 | 1;
  show?: 0 | 1;
  equipment?: 0 | 1;
  karaoke?: 0 | 1;
  band?: 0 | 1;
  tv?: 0 | 1;
  lunch?: 0 | 1;
  midnight?: 0 | 1;
  midnight_meal?: 0 | 1;
  english?: 0 | 1;
  pet?: 0 | 1;
  child?: 0 | 1;
  // ↑絞り込み
  ////////////////
  credit_card?: string; // 複数指定
  /**
   * lite: 主要項目のみ    
   * credit_card: クレジットカード情報を追加    
   * special: 特集情報を追加    
   * 指定なし: credit_cardとspecial以外全て    
   * +で繋いで複数指定可能
   */
  // type?: 'lite' | 'credit_card' | 'special'; // レスポンスの型を限定するために設定不可にする
  /**
   * 1: 店名かな順    
   * 2: ジャンルコード順    
   * 3: 小エリアコード順    
   * 4: おススメ順    
   * 初期値: おススメ順    
   * 位置検索時は距離順    
   */
  order?: 1 | 2 | 3 | 4;
  start?: number; // 初期値: 1
  /**
   * 1ページあたりの件数    
   * 初期値: 10    
   * 最小値: 1    
   * 最大値: 100    
   */
  count?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100;
}

/**
 * urlからパラメータを取得すると全てsrting型になるので、型を変換する    
 * asで強制的に入れているので現在は不完全
 */
export const hotpepperGourmetSearchAPIRequestConverter = (request: {
  [key in keyof CustomizedHotpepperGourmetSearchAPIRequest]: string;
}): CustomizedHotpepperGourmetSearchAPIRequest => {
  const convertedRequest: CustomizedHotpepperGourmetSearchAPIRequest = {
    // Customized Parameters
    allRange: request.allRange === '1' ? 1 : undefined,
    // Original Parameters
    format: request.format as 'xml' | 'json' | 'jsonp' | undefined,
    id: request.id,
    name: request.name,
    name_kana: request.name_kana,
    name_any: request.name_any,
    tel: request.tel ? Number(request.tel) : undefined,
    address: request.address,
    special: request.special,
    special_or: request.special_or,
    special_category: request.special_category,
    special_category_or: request.special_category_or,
    large_service_area: request.large_service_area,
    service_area: request.service_area,
    large_area: request.large_area,
    middle_area: request.middle_area,
    small_area: request.small_area,
    keyword: request.keyword,
    lat: request.lat ? Number(request.lat) : undefined,
    lng: request.lng ? Number(request.lng) : undefined,
    range: request.range ? Number(request.range) as CustomizedHotpepperGourmetSearchAPIRequest['range'] : undefined,
    datum: request.datum,
    ktai_coupon: request.ktai_coupon ? Number(request.ktai_coupon) as CustomizedHotpepperGourmetSearchAPIRequest['ktai_coupon'] : undefined,
    genre: request.genre,
    budget: request.budget,
    party_capacity: request.party_capacity ? Number(request.party_capacity) : undefined,
    wifi: request.wifi ? Number(request.wifi) as CustomizedHotpepperGourmetSearchAPIRequest['wifi'] : undefined,
    wedding: request.wedding ? Number(request.wedding) as CustomizedHotpepperGourmetSearchAPIRequest['wedding'] : undefined,
    course: request.course ? Number(request.course) as CustomizedHotpepperGourmetSearchAPIRequest['course'] : undefined,
    free_drink: request.free_drink ? Number(request.free_drink) as CustomizedHotpepperGourmetSearchAPIRequest['free_drink'] : undefined,
    free_food: request.free_food ? Number(request.free_food) as CustomizedHotpepperGourmetSearchAPIRequest['free_food'] : undefined,
    private_room: request.private_room ? Number(request.private_room) as CustomizedHotpepperGourmetSearchAPIRequest['private_room'] : undefined,
    horigotatsu: request.horigotatsu ? Number(request.horigotatsu) as CustomizedHotpepperGourmetSearchAPIRequest['horigotatsu'] : undefined,
    tatami: request.tatami ? Number(request.tatami) as CustomizedHotpepperGourmetSearchAPIRequest['tatami'] : undefined,
    cocktail: request.cocktail ? Number(request.cocktail) as CustomizedHotpepperGourmetSearchAPIRequest['cocktail'] : undefined,
    shochu: request.shochu ? Number(request.shochu) as CustomizedHotpepperGourmetSearchAPIRequest['shochu'] : undefined,
    sake: request.sake ? Number(request.sake) as CustomizedHotpepperGourmetSearchAPIRequest['sake'] : undefined,
    wine: request.wine ? Number(request.wine) as CustomizedHotpepperGourmetSearchAPIRequest['wine'] : undefined,
    card: request.card ? Number(request.card) as CustomizedHotpepperGourmetSearchAPIRequest['card'] : undefined,
    non_smoking: request.non_smoking ? Number(request.non_smoking) as CustomizedHotpepperGourmetSearchAPIRequest['non_smoking'] : undefined,
    charter: request.charter ? Number(request.charter) as CustomizedHotpepperGourmetSearchAPIRequest['charter'] : undefined,
    ktai: request.ktai ? Number(request.ktai) as CustomizedHotpepperGourmetSearchAPIRequest['ktai'] : undefined,
    parking: request.parking ? Number(request.parking) as CustomizedHotpepperGourmetSearchAPIRequest['parking'] : undefined,
    barrier_free: request.barrier_free ? Number(request.barrier_free) as CustomizedHotpepperGourmetSearchAPIRequest['barrier_free'] : undefined,
    show: request.show ? Number(request.show) as CustomizedHotpepperGourmetSearchAPIRequest['show'] : undefined,
    equipment: request.equipment ? Number(request.equipment) as CustomizedHotpepperGourmetSearchAPIRequest['equipment'] : undefined,
    karaoke: request.karaoke ? Number(request.karaoke) as CustomizedHotpepperGourmetSearchAPIRequest['karaoke'] : undefined,
    band: request.band ? Number(request.band) as CustomizedHotpepperGourmetSearchAPIRequest['band'] : undefined,
    tv: request.tv ? Number(request.tv) as CustomizedHotpepperGourmetSearchAPIRequest['tv'] : undefined,
    lunch: request.lunch ? Number(request.lunch) as CustomizedHotpepperGourmetSearchAPIRequest['lunch'] : undefined,
    midnight: request.midnight ? Number(request.midnight) as CustomizedHotpepperGourmetSearchAPIRequest['midnight'] : undefined,
    midnight_meal: request.midnight_meal ? Number(request.midnight_meal) as CustomizedHotpepperGourmetSearchAPIRequest['midnight_meal'] : undefined,
    english: request.english ? Number(request.english) as CustomizedHotpepperGourmetSearchAPIRequest['english'] : undefined,
    pet: request.pet ? Number(request.pet) as CustomizedHotpepperGourmetSearchAPIRequest['pet'] : undefined,
    child: request.child ? Number(request.child) as CustomizedHotpepperGourmetSearchAPIRequest['child'] : undefined,
    credit_card: request.credit_card,
    // type: request.type ? request.type as 'lite' | 'credit_card' | 'special' : undefined,
    order: request.order ? Number(request.order) as CustomizedHotpepperGourmetSearchAPIRequest['order'] : undefined,
    start: request.start ? Number(request.start) : undefined,
    count: request.count ? Number(request.count) as CustomizedHotpepperGourmetSearchAPIRequest['count'] : undefined,
  };
    
  return _.pickBy(convertedRequest, (value) => value !== undefined);
};

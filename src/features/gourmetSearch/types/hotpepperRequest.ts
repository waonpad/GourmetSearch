/* eslint-disable prettier/prettier */
export interface BaseHotpepperRequest {
  key: string;
  format?: 'xml' | 'json' | 'jsonp';
}

export interface HotpepperGourmetRequest extends BaseHotpepperRequest {
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
  wifi?: number;
  wedding?: number;
  course?: number;
  free_drink?: number;
  free_food?: number;
  private_room?: number;
  horigotatsu?: number;
  tatami?: number;
  cocktail?: number;
  shochu?: number;
  sake?: number;
  wine?: number;
  card?: number;
  non_smoking?: number;
  charter?: number;
  ktai?: number;
  parking?: number;
  barrier_free?: number;
  sommelier?: number;
  night_view?: number;
  open_air?: number;
  show?: number;
  equipment?: number;
  karaoke?: number;
  band?: number;
  tv?: number;
  lunch?: number;
  midnight?: number;
  midnight_meal?: number;
  english?: number;
  pet?: number;
  child?: number;
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
  type?: 'lite' | 'credit_card' | 'special';
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

// 상품 등록 카테고리 정의

export type PetType = 'dog' | 'cat';
export type MainCategoryKey =
  | 'food'
  | 'treat'
  | 'supplies'
  | 'health'
  | 'clothing';

// 한영 라벨
export const MAIN_CATEGORY_LABELS: Record<MainCategoryKey, string> = {
  food: '사료',
  treat: '간식',
  supplies: '용품',
  health: '건강',
  clothing: '의류',
};

// 서브 카테고리: 한영 라벨
export const CATEGORY_MAP: Record<
  PetType,
  Record<MainCategoryKey, Record<string, string>>
> = {
  dog: {
    food: {
      dry: '건식',
      wet: '습식/화식',
      'freeze-dried': '건조',
      etc: '기타',
    },
    treat: {
      gum: '껌',
      jerky: '저키',
      'dried-meat': '육포',
      can: '캔',
      biscuit: '비스킷',
      etc: '기타',
    },
    supplies: {
      hygiene: '위생/케어',
      toilet: '배변용품',
      toy: '장난감',
      outdoor: '외출/산책',
      mat: '방석/매트',
      etc: '기타',
    },
    health: {
      supplement: '보조제',
      checkup: '건강검진',
      skin: '피부/모질',
      ointment: '연고',
      etc: '기타',
    },
    clothing: {
      accessory: '액세서리',
      sleeveless: '민소매',
      'all-in-one': '올인원',
      outer: '아우터',
      etc: '기타',
    },
  },
  cat: {
    food: {
      dry: '건식',
      wet: '습식/화식',
      'freeze-dried': '건조',
      etc: '기타',
    },
    treat: {
      pouch: '파우치',
      snack: '스낵/트릿',
      'whole-meat': '통살',
      can: '캔',
      catnip: '캣닢',
      etc: '기타',
    },
    supplies: {
      litter: '모래',
      toilet: '배변용품',
      toy: '장난감',
      tower: '캣타워',
      scratcher: '스크래쳐',
      etc: '기타',
    },
    health: { supplement: '보조제', checkup: '케어·검진', etc: '기타' },
    clothing: {
      clothing: '의류',
      accessory: '악세서리',
      sleeveless: '민소매',
      etc: '기타',
    },
  },
};

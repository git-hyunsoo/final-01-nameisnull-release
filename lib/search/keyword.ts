// 키워드 추출 및 가중치 부여

import { Categories, ProductForBonus, ProductForKeyword } from '@/types/search';

// 카테고리 매칭에 따른 가중치 부여해주는 작업
export function giveBonus(
  product: ProductForBonus,
  filter: Categories
): number {
  // 기본 가중치
  let bonus = 1.0;

  // 동물 종류가 명시되어 있는데 다르면 패널티
  if (filter.pet && product.extra.pet !== filter.pet) {
    bonus *= 0.3; // 70% 감점
    return bonus;
  }

  // 메인 카테고리가 다르면 패널티
  if (
    filter.mainCategory &&
    product.extra.mainCategory !== filter.mainCategory
  ) {
    bonus *= 0.3;
    return bonus;
  }

  // 서브 카테고리가 다르면 패널티
  if (filter.subCategory && product.extra.subCategory !== filter.subCategory) {
    bonus *= 0.3;
    return bonus;
  }

  // 동물 종류 매칭 시 가중치 부여
  if (filter.pet && filter.pet === product.extra.pet) {
    bonus += 0.4;
  }

  // 메인 카테고리 매칭 시 가중치 부여
  if (
    filter.mainCategory &&
    product.extra.mainCategory === filter.mainCategory
  ) {
    bonus += 0.4;
  }

  // 서브 카테고리 매칭 시 가중치 부여
  if (filter.subCategory && product.extra.subCategory === filter.subCategory) {
    bonus += 0.5;
  }

  return bonus;
}

// 검색어에서 중요 키워드 추출 (카테고리 키워드 제외)
export function extractKeywords(searchQuery: string): string[] {
  const query = searchQuery.toLowerCase();

  // 제외할 카테고리 관련 키워드
  const excludeWords = [
    // 동물 종류
    '강아지',
    '개',
    '견',
    '고양이',
    '묘',

    // 메인 카테고리
    '사료',
    '간식',
    '용품',
    '건강',
    '영양제',
    '의류',
    '옷',

    // 서브 카테고리 - 사료
    '건식',
    '습식',
    '화식',
    '건조',

    // 서브 카테고리 - 강아지 간식
    '껌',
    '저키',
    '육포',
    '캔',
    '비스킷',

    // 서브 카테고리 - 고양이 간식
    '파우치',
    '스낵',
    '트릿',
    '통살',
    '캣닢',

    // 서브 카테고리 - 용품
    '위생',
    '케어',
    '배변',
    '장난감',
    '외출',
    '산책',
    '방석',
    '매트',
    '모래',
    '캣타워',
    '타워',
    '스크래쳐',

    // 서브 카테고리 - 건강
    '보조제',
    '건강검진',
    '검진',
    '피부',
    '모질',
    '연고',

    // 서브 카테고리 - 의류
    '액세서리',
    '악세서리',
    '민소매',
    '올인원',
    '아우터',

    // 일반적인 단어
    '추천',
    '해줘',
    '주세요',
    '찾아줘',
    '보여줘',
    '알려줘',
    '좋은',
    '나쁜',
    '괜찮은',
    '최고',
    '베스트',

    // 조사
    '에',
    '이',
    '가',
    '을',
    '를',
    '은',
    '는',
    '의',
    '도',
    '만',
    '와',
    '과',
    '로',
    '으로',
    '부터',
    '까지',
    '에서',
    '한테',
  ];

  // 공백으로 분리
  const words = query.split(/\s+/);

  // 제외 키워드 필터링
  const keywords = words
    .map(word => {
      // 끝에 붙은 조사 제거
      return word.replace(
        /[은는이가을를에와과의도로부터까지만한테에서](서)?$/,
        ''
      );
    })
    .filter(word => {
      return (
        word.length >= 2 && // 2글자 이상
        !excludeWords.includes(word) && // 제외 단어 아님
        !/^[0-9]+$/.test(word) // 숫자만 있는 것 제외
      );
    });

  return keywords;
}

// 상품에 키워드가 포함되어 있으면 가중치를 주는 함수
export function calculateKeywordBonus(
  product: ProductForKeyword,
  keywords: string[]
): number {
  if (keywords.length === 0) return 0;

  const productText = product.name.toLowerCase();

  let matchCount = 0;
  keywords.forEach(keyword => {
    if (productText.includes(keyword)) {
      matchCount++;
    }
  });

  // 매칭된 키워드 비율에 따라 보너스 (최대 0.3)
  const matchRatio = matchCount / keywords.length;
  return matchRatio * 0.3;
}

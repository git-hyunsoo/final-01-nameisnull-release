'use server';

import { getProducts } from '@/lib/api/products';
import cosineSimilarity from '@/lib/utils/similarity';
import { EmbeddingProducts, ProductList } from '@/types/product';
import OpenAI from 'openai';

// ----------- 타입 정의 -----------

/**
 * 반려동물 종류
 */
type PetType = 'dog' | 'cat';

/**
 * 카테고리 필터 타입
 * 검색어에서 추출된 카테고리 정보를 담는 객체
 */
type Categories = {
  pet?: PetType; // 동물 종류 (강아지/고양이)
  mainCategory?: string; // 메인 카테고리 (사료/간식/용품/건강/의류)
  subCategory?: string; // 서브 카테고리 (건식/습식/껌 등)
};

/**
 * 유사도 계산 결과
 * 각 상품의 ID와 계산된 유사도 점수를 저장
 */
interface SimilarityResult {
  _id: number; // 상품 ID
  similarity: number; // 최종 유사도 점수
}

/**
 * 상품의 extra 필드 타입
 * 상품 객체의 extra 속성 구조를 명확히 정의
 */
interface ProductExtra {
  pet: PetType; // 동물 종류
  mainCategory: string; // 메인 카테고리
  subCategory?: string; // 서브 카테고리
  embeddings?: number[]; // 임베딩 벡터
}

/**
 * 카테고리 매칭에 사용되는 상품 객체 타입
 */
interface ProductForBonus {
  extra: ProductExtra;
}

/**
 * 키워드 매칭에 사용되는 상품 객체 타입
 */
interface ProductForKeyword {
  name: string;
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY가 설정되지 않았습니다.');
  }

  // 이미 open api key가 있으면 재사용
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: OPENAI_API_KEY });
  }

  return openaiClient;
}

// 텍스트를 임베딩하는 함수
async function getEmbedding(text: string): Promise<number[]> {
  try {
    const client = getOpenAIClient();
    const response = await client.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('임베딩 생성 실패:', error);
    if (error instanceof Error) {
      // API 키 문제
      if (error.message.includes('API key')) {
        throw new Error('OpenAI API 키가 유효하지 않습니다.');
      }

      // Rate limit 문제
      if (error.message.includes('rate limit')) {
        throw new Error('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
      }

      // 네트워크 문제
      if (error.message.includes('network')) {
        throw new Error('네트워크 연결에 문제가 있습니다.');
      }

      throw new Error(`임베딩 생성 중 오류: ${error.message}`);
    }
    throw new Error('임베딩 생성 중 알 수 없는 오류가 발생했습니다.');
  }
}

// 키워드 기반 카테고리 추출 작업
function extractCategories(searchQuery: string): Categories {
  const query = searchQuery.toLowerCase();
  const result: Categories = {};

  // 강아지/고양이 판별
  if (
    query.includes('강아지') ||
    query.includes('개') ||
    query.includes('견')
  ) {
    result.pet = 'dog';
  } else if (query.includes('고양이') || query.includes('묘')) {
    result.pet = 'cat';
  }

  // 메인 카테고리 판별
  if (query.includes('사료')) {
    result.mainCategory = 'food';
  } else if (query.includes('간식')) {
    result.mainCategory = 'treat';
  } else if (query.includes('용품')) {
    result.mainCategory = 'supplies';
  } else if (query.includes('건강') || query.includes('영양제')) {
    result.mainCategory = 'health';
  } else if (query.includes('의류') || query.includes('옷')) {
    result.mainCategory = 'clothing';
  }

  // 서브 카테고리 판별 - 사료 (공통)
  if (query.includes('건식')) {
    result.subCategory = 'dry';
  } else if (query.includes('습식') || query.includes('화식')) {
    result.subCategory = 'wet';
  } else if (query.includes('건조')) {
    result.subCategory = 'freeze-dried';
  }

  // 서브 카테고리 판별 - 강아지 간식
  else if (query.includes('껌')) {
    result.subCategory = 'gum';
  } else if (query.includes('저키')) {
    result.subCategory = 'jerky';
  } else if (query.includes('육포')) {
    result.subCategory = 'dried-meat';
  } else if (query.includes('캔')) {
    result.subCategory = 'can';
  } else if (query.includes('비스킷')) {
    result.subCategory = 'biscuit';
  }
  // 서브 카테고리 판별 - 고양이 간식
  else if (query.includes('파우치')) {
    result.subCategory = 'pouch';
  } else if (query.includes('스낵') || query.includes('트릿')) {
    result.subCategory = 'snack';
  } else if (query.includes('통살')) {
    result.subCategory = 'whole-meat';
  } else if (query.includes('캣닢')) {
    result.subCategory = 'catnip';
  }

  // 서브 카테고리 판별 - 강아지 용품
  else if (query.includes('위생') || query.includes('케어')) {
    result.subCategory = 'hygiene';
  } else if (query.includes('배변')) {
    result.subCategory = 'toilet';
  } else if (query.includes('장난감')) {
    result.subCategory = 'toy';
  } else if (query.includes('외출') || query.includes('산책')) {
    result.subCategory = 'outdoor';
  } else if (query.includes('방석') || query.includes('매트')) {
    result.subCategory = 'mat';
  }
  // 서브 카테고리 판별 - 고양이 용품
  else if (query.includes('모래')) {
    result.subCategory = 'litter';
  } else if (query.includes('캣타워') || query.includes('타워')) {
    result.subCategory = 'tower';
  } else if (query.includes('스크래쳐')) {
    result.subCategory = 'scratcher';
  }

  // 서브 카테고리 판별 - 건강 (강아지)
  else if (query.includes('보조제')) {
    result.subCategory = 'supplement';
  } else if (query.includes('건강검진') || query.includes('검진')) {
    result.subCategory = 'checkup';
  } else if (query.includes('피부') || query.includes('모질')) {
    result.subCategory = 'skin';
  } else if (query.includes('연고')) {
    result.subCategory = 'ointment';
  }
  // 서브 카테고리 판별 - 의류 (공통)
  else if (query.includes('액세서리') || query.includes('악세서리')) {
    result.subCategory = 'accessory';
  } else if (query.includes('민소매')) {
    result.subCategory = 'sleeveless';
  } else if (query.includes('올인원')) {
    result.subCategory = 'all-in-one';
  } else if (query.includes('아우터')) {
    result.subCategory = 'outer';
  }

  return result;
}

// 카테고리 매칭에 따른 가중치 부여해주는 작업
function giveBonus(product: ProductForBonus, filter: Categories): number {
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
function extractKeywords(searchQuery: string): string[] {
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
function calculateKeywordBonus(
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

// 검색어 임베딩 데이터와 상품 설명 임베딩 데이터 비교하는 작업
export async function SimilarityCompare(
  formData: FormData
): Promise<ProductList[]> {
  try {
    // 1. 폼 데이터인 검색어 추출
    const searchQuery = formData.get('query') as string;

    if (!searchQuery) {
      throw new Error('검색어가 없습니다');
    }

    // 1-1. 검색어에서 카테고리 추출
    const categoryFilter = extractCategories(searchQuery);

    // 1-2. 검색어에서 카테고리를 제외한 키워드 추출
    const keywords = extractKeywords(searchQuery);

    console.log(`검색어: ${searchQuery}`);

    // 2. 검색어 임베딩
    const queryEmbedding = await getEmbedding(searchQuery);
    console.log(`검색어 임베딩 완료`);

    // 3. 모든 상품 목록 조회
    const listRes = await getProducts();
    if (!listRes.ok) {
      throw new Error(listRes.message);
    }

    const products: EmbeddingProducts = listRes.item;

    console.log(`총 ${products.length}개 상품 조회`);

    // 4. 각 상품의 임베딩과 유사도 계산

    // 4-1. 코사인 유사도 값을 저장하는 배열 생성
    const similarityArr: SimilarityResult[] = [];

    for (let i = 0; i < products.length; i++) {
      // 임베딩이 없는 상품은 스킵
      if (!products[i].extra.embeddings?.length) {
        continue;
      }

      // 4-2. 유사도 계산
      const similarity = cosineSimilarity(
        queryEmbedding,
        products[i].extra.embeddings as number[]
      );

      // 4-3. 카테고리 매칭에 따른 가중치 계산
      const categoryBonus = giveBonus(products[i], categoryFilter);

      // 4-4. 카테고리를 제외한 키워드 매칭 보너스
      const keywordBonus = calculateKeywordBonus(
        {
          name: products[i].name,
        },
        keywords
      );

      const totalSimilarity = similarity * categoryBonus + keywordBonus;
      // 4-5. 상품 _id와 유사도를 같이 저장
      similarityArr.push({ _id: products[i]._id, similarity: totalSimilarity });
    }

    // 4-6. 검색어 길이에 따라 임계값 조정
    const queryLength = searchQuery.replace(/\s/g, '').length; // 공백 제거한 길이
    let threshold = 0.5; // 기본값

    if (queryLength <= 5) {
      threshold = 0.25; // 짧은 검색어 (예: "캣닢")
    } else if (queryLength <= 10) {
      threshold = 0.35; // 중간 검색어 (예: "고양이 간식")
    } else {
      threshold = 0.4; // 긴 검색어 (예: "가루날림 적은 캣닢 티백")
    }

    // 4-7. 유사도가 0.5 이상인 상품들을 유사도가 높은 순으로 추출
    const highSimilarity = similarityArr
      .filter(item => item.similarity >= threshold)
      .sort((a, b) => b.similarity - a.similarity);

    // 5.유사도 높은 순으로 저장된 highSimilarity의 _id와 상품 목록에 있는 상품들의 _id 비교
    const productsList: ProductList[] = listRes.item;
    const searchResult: ProductList[] = highSimilarity.map(item => {
      return productsList.find(p => p._id === item._id)!;
    });
    return searchResult;
  } catch (error) {
    console.error('유사도 비교 실패:', error);
    return [];
  }
}

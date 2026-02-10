// db에 등록된 모든 상품들 임베딩
'use server';

import { getProductDetail } from '@/lib/api/products';
import { ProductDetail } from '@/types/product';
import OpenAI from 'openai';

// 관리자 accessToken
const ADMIN_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc2OTU4ODE3MiwiZXhwIjoxNzcyMTgwMTcyLCJpc3MiOiJGRUJDIn0.2ZL53UNV-qhHg1esDdwzPuyHf9MRJV3cEOWBxu89a4E';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// OpenAI 클라이언트 초기화 -> apiKey로 인증
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// 카테고리 영어 → 한글 변환 맵
const categoryMap: Record<string, string> = {
  // 메인 카테고리
  food: '사료',
  treat: '간식',
  supplies: '용품',
  health: '건강',
  clothing: '의류',
  // 서브 카테고리 - 사료
  dry: '건식',
  wet: '습식',
  'freeze-dried': '건조',
  // 서브 카테고리 - 강아지 간식
  gum: '껌',
  jerky: '저키',
  'dried-meat': '육포',
  can: '캔',
  biscuit: '비스킷',
  // 서브 카테고리 - 고양이 간식
  pouch: '파우치',
  snack: '스낵',
  'whole-meat': '통살',
  catnip: '캣닢',
  // 서브 카테고리 - 용품
  hygiene: '위생',
  toilet: '배변용품',
  toy: '장난감',
  outdoor: '외출',
  mat: '방석',
  litter: '모래',
  tower: '캣타워',
  scratcher: '스크래쳐',
  // 서브 카테고리 - 건강
  supplement: '보조제',
  checkup: '건강검진',
  skin: '피부',
  ointment: '연고',
  // 서브 카테고리 - 의류
  accessory: '액세서리',
  sleeveless: '민소매',
  'all-in-one': '올인원',
  outer: '아우터',
};

// 텍스트를 임베딩하는 함수
async function getEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  return response.data[0].embedding;
}

// 상품 정보로 임베딩용 텍스트 생성
function createEmbeddingText(product: ProductDetail): string {
  // 동물 종류 한글 변환
  const petKorean = product.extra.pet === 'dog' ? '강아지' : '고양이';

  // 카테고리 한글 변환
  const mainCategoryKorean =
    categoryMap[product.extra.mainCategory] || product.extra.mainCategory;
  const subCategoryKorean = product.extra.subCategory
    ? categoryMap[product.extra.subCategory] || product.extra.subCategory
    : '';

  // 구조화된 텍스트 생성
  const embeddingText =
    `제목: ${product.name} 카테고리: ${petKorean} ${mainCategoryKorean} ${subCategoryKorean} 설명: ${product.content} `.trim();
  // 최대 4000자로 제한
  return embeddingText.slice(0, 4000);
}

// 모든 상품의 content를 임베딩하여 extra.embedding에 저장
// 최초 1회만 실행
/*
export async function AllProductEmbeddings() {
  try {
    // ------ 1. 상품 목록 조회 api ------
    const listRes = await getProducts();
    if (!listRes.ok) {
      throw new Error(listRes.message);
    }

    const products: ProductList[] = listRes.item;

    console.log(`총 ${products.length}개 상품 발견\n`);

    // ------ 2. 각 상품 ID로 반복문 돌며 상품 상세 조회 -> content 필드를 뽑아내기 위해 ------
    const productIdList = products.map(p => p._id);

    for (let i = 0; i < productIdList.length; i++) {
      const productId = productIdList[i];

      try {
        // 2.1 상품 상세 조회 api
        const detailRes = await getProductDetail(productId.toString());
        if (!detailRes.ok) {
          throw new Error(detailRes.message);
        }

        const productDetail: ProductDetail = detailRes.item;

        // 2.2 상품 설명이 없을 때
        if (!productDetail.content) {
          console.log('content 없음!\n');
          continue;
        }

        // 2.3 이미 임베딩 된 상품이면 스킵!
        if (productDetail.extra?.embeddings?.length) {
          console.log('이미 embeddings 있음 → 스킵');
          continue;
        }

        // 2.4 임베딩용 텍스트 생성 (상품명 + 카테고리 + 설명)
        const embeddingText = createEmbeddingText(productDetail);

        // 2.5 상품 설명들 임베딩 작업
        const embedding = await getEmbedding(embeddingText);
        console.log(`-> 임베딩 완료 ${embedding.length}개`);

        // ------ 3. 상품 수정 ------
        const extra = productDetail.extra;
        extra.embeddings = embedding;
        const body = {
          extra,
        };

        const editRes = await fetch(`${API_URL}/seller/products/${productId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Client-Id': CLIENT_ID!,
            Authorization: `Bearer ${ADMIN_TOKEN}`,
          },
          body: JSON.stringify(body),
        });

        if (!editRes.ok) {
          const errText = await editRes.text();
          throw new Error(`수정 실패: ${editRes.status} ${errText}`);
        }
      } catch (error) {
        console.error('-> 반복문 돌리기 실패...\n', error);
      }
    }
  } catch (error) {
    console.error('전체 배치 실패', error);
    throw error;
  }
}
*/
// 상품 등록 시 임베딩 되도록 하는 단일 상품 임베딩 함수
export async function embedSingleProduct(productId: number) {
  try {
    // 1. 상품 상세 조회 api
    const detailRes = await getProductDetail(productId.toString());
    if (!detailRes.ok) {
      throw new Error(detailRes.message);
    }

    const productDetail: ProductDetail = detailRes.item;

    // 2. 상품 임베딩용 텍스트 생성(카테고리 필터링)
    const embeddingText = createEmbeddingText(productDetail);

    // 3. 상품 임베딩 작업
    const embedding = await getEmbedding(embeddingText);

    const extra = productDetail.extra;
    extra.embeddings = embedding;
    const body = {
      extra,
    };

    const editRes = await fetch(`${API_URL}/seller/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID!,
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (!editRes.ok) {
      const errText = await editRes.text();
      throw new Error(`수정 실패: ${editRes.status} ${errText}`);
    }
  } catch (error) {
    console.error('단일 상품 임베딩 실패:', error);
  }
}

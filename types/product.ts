import { ApiError } from '@/types/common';
import { User } from '@/types/user';

interface ProductImages {
  path: string;
  name: string;
}

export interface Product {
  _id: number;
  seller_id: number;
  price: number;
  name: string;
  mainImages: ProductImages[];
  image?: {
    path: string;
    name: string;
  };
  quantity?: number;
  buyQuantity?: number;
  show?: boolean;
  active?: boolean;
  createdAt: string;
  bookmarks: number;
  views: number;
  review_id?: number; // ← 이거 추가!
  extra: {
    pet: 'dog' | 'cat'; //동물선택
    mainCategory: string; // 메인  카테고리
    subCategory: string; // 하위 카테고리
    condition: 'new' | 'used'; // 새상품/중고
    tradeType: 'delivery' | 'direct' | 'both'; //택배/직거래/둘다
    tradeLocation?: string;
    embeddings?: number[];
  };
  seller: User;
  rating: number;
}

// 임베딩 된 상품 목록 조회
export type EmbeddingProducts = Array<Pick<Product, '_id' | 'extra' | 'name'>>;

// 검색 결과 응답 타입 -> 얘만 따로
export interface ProductSearchListRes {
  ok: 1;
  item: ProductList[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

//상품 목록 페이지
export type ProductList = Pick<
  Product,
  '_id' | 'price' | 'name' | 'mainImages' | 'bookmarks' | 'views'
> & {
  extra?: Pick<Product['extra'], 'pet' | 'mainCategory' | 'subCategory'>;
};

// 상품 목록 페이지(embedding 제외한 타입)
export type ProductWithoutEmbeddings = Omit<Product, 'extra'> & {
  extra: Omit<Product['extra'], 'embeddings'>;
};

//상품 등록 페이지
export interface SellerProduct {
  price: number;
  quantity: number;
  name: string;
  mainImages: { path: string; name: string }[];
  content: string; // 상품 설명
  extra: {
    pet: 'dog' | 'cat';
    mainCategory: string;
    subCategory?: string;
    condition: 'new' | 'used'; // 새상품/중고
    tradeType: 'delivery' | 'direct' | 'both'; //택배/직거래/둘다
    tradeLocation?: string;
  };
}

// 상품 정보
export type ProductDetail = Product & {
  content: string;
  replies: UserReview[];
  myBookmarkId?: number;
};

// 찜하기 요청
export interface BookmarkRequest {
  target_id: number;
  memo?: string;
  extra?: {
    type?: string;
  };
}

// 판매 상태 변경 및 수정 요청
export interface OrderCorrection {
  user_id: number;
  product_id: number;
  quantity: number;
}

// 판매 확정 응답 타입
export interface OrderItem {
  _id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  state: string;
  products?: {
    _id: number;
    name: string;
    price: number;
    seller_id: number;
    image?: {
      path: string;
      name: string;
    };
  }[];
  createdAt: string;
  updatedAt: string;
  cost?: {
    products: number;
    shippingFees: number;
    total: number;
  };
}

// 판매자의 다른 상품 리스트, 판매 내역 페이지
export type SellerProductList = Pick<
  Product,
  | '_id'
  | 'seller_id'
  | 'name'
  | 'mainImages'
  | 'price'
  | 'bookmarks'
  | 'views'
  | 'quantity'
  | 'buyQuantity'
> & {
  quantity: number;
  buyQuantity: number;
};

//판매자 후기
export interface UserReview {
  _id: number;
  user: {
    _id: number;
    name: string;
    image: string;
  };
  rating: number;
  content: string;
  createdAt: string;
}

// 구매 후기 등록
export interface RegistReview {
  _id: number;
  order_id: number;
  product_id: number;
  user_id: number;
  rating: number;
  content: string;
}

// 찜 목록 get
export interface BookmarkResponse {
  _id: number; // 북마크 자체 id
  user_id: number; // 북마크 한 사용자의 id
}

export interface ProductTargetBookmark extends BookmarkResponse {
  product: Product; // 좋아요 대상 상품
}

//공통부분 (찜목록 불러오기)
export type BookmarkListRes =
  | {
      ok: 1;
      item: ProductTargetBookmark[];
    }
  | ApiError;

// 찜 추가 응답
export type BookmarkCreateRes =
  | {
      ok: 1;
      item: ProductTargetBookmark;
    }
  | ApiError;

// 찜 삭제 응답
export type BookmarkDeleteRes =
  | {
      ok: 1;
    }
  | ApiError;

// 구매 내역
export interface PurchaseList {
  _id: number;
  user_id: number;
  state: string;
  products: Product[];
  cost?: {
    products: number;
    shippingFees: number;
    total: number;
  };
}

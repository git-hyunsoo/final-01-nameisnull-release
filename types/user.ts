// 상품 판매자 정보, 마이페이지
export interface User {
  _id: number;
  email: string;
  name: string;
  type: string;
  image?: string;
  extra?: {
    pet?: {
      type: 'dog' | 'cat';
      breed?: string;
      name: string;
      weight: number;
      ageGroup: 'junior' | 'adult' | 'senior';
      image?: string;
    };
    introduce: string;
  };
  token?: {
    accessToken: string;
    refreshToken: string;
  };
}

//로그인 응답
export interface LoginResponse {
  _id: number;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

//로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

//회원가입
export interface Signup {
  email: string;
  password: string;
  name: string;
  type: 'seller';
  image?: string;
  extra?: {
    pet: {
      type: 'dog' | 'cat';
      breed?: string;
      name: string;
      weight: number;
      ageGroup: 'junior' | 'adult' | 'senior';
      image?: string;
    };
    introduce: string;
  };
}

//프로필 / 펫 정보 수정
export interface UpdateUser {
  name?: string;
  image?: string;
  extra?: {
    pet?: {
      type?: 'dog' | 'cat';
      breed?: string;
      name?: string;
      weight?: number;
      ageGroup?: 'junior' | 'adult' | 'senior';
      image?: string;
    };
    introduce?: string;
  };
}



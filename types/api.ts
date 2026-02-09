import { ChatRoom } from '@/types/chat';

export interface ChatRoomListRes {
  ok: 1;
  item: ChatRoom[];
}

export interface ChatRoomInfoRes {
  ok: 1;
  item: ChatRoom;
}

// 서버 검증 에러 타입
export interface ServerValidationError {
  type: string;
  value: string;
  msg: string;
  location: string;
}

// 에러 타입
export interface ErrorRes {
  ok: 0;
  message: string;
  errors?: {
    [fieldName: string]: ServerValidationError;
  };
}

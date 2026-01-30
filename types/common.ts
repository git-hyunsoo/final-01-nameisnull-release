//타입
export type ApiResponse<T> =
  | {
      ok: 1;
      item: T;
    }
  | ApiError;

export type ApiListResponse<T> =
  | {
      ok: 1;
      item: T[];
    }
  | ApiError;

export interface ApiError {
  ok: 0;
  message: string;
  errors?: {
    [field: string]: {
      type: string;
      value: string;
      msg: string;
      location: string;
    };
  };
}

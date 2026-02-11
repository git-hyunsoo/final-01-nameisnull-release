//요청
export interface FilesRequest {
  name: string;
  path: string;
}

// 파일 업로드 결과 타입
export interface FileUploadRes {
  ok: 1;
  item: {
    name: string;
    path: string;
  }[];
}

export type GlobalResponse<T> = {
  success: boolean;
  message: string | string[];
  data: T;
  canRefresh: boolean | undefined | null;
};

export type TokenInfoResponse = {
  id: number;
  nickname: string;
  grantType: string;
  accessToken: string;
  refreshToken: string;
};

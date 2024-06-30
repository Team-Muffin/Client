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

export type ChallengeResponse = {
  badgeName: string;
  challengeType: number;
  description: string;
  detailDescription: string;
  endAt: string;
  id: number;
  logoUrl: string;
  name: string;
  participation: number;
  reward: number;
  startAt: string;
  status: string;
  term: string;
};

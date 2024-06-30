import instance from "./base";

//자체 챌린지 리스트 조회
export async function fetchChallengeList(): Promise<{
  data: ChallengeList[];
}> {
  const response = await instance.get<ChallengeListResponse>(
    "/challenge-service/challenges"
  );
  // console.log(response);
  return { data: response.data.data };
}

export interface ChallengeList {
  id: number;
  challengeType: number;
  name: string;
  description: string;
  logoUrl: string;
  challengeUrl: string;
  endAt: string;
  corpName: string;
  term: number;
  reward: number;
  participation: number;
}

interface ChallengeListResponse {
  success: boolean;
  message: string;
  data: ChallengeList[];
}

//홈 랜덤 상품 조회
export async function fetchRandomProductList(
  limit: number
): Promise<{ data: ProductListResponse }> {
  const response = await instance.get<ProductListResponse>(
    `/product-service/products/random?limit=${limit}`
  );
  return { data: response.data };
}

export interface ProductList {
  id: number;
  name: string;
  categoryName: string;
  corpName: string;
  corpImage: string;
  cardImage: string;
  tags: string[];
  boardCount: number;
  createdTime: string;
}

interface ProductListData {
  randomProducts: ProductList[];
}

interface ProductListResponse {
  success: boolean;
  message: string;
  data: ProductListData;
}

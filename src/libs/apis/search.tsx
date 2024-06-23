import instance from "./base";

// 게시글 리스트 조회
export async function fetchBoardList(options: {
  pageNo?: number;
  size?: number;
  category?: string; //1: 정보, 2: 재미, 3: 투자, 4: 기업, 5: 고급
  sort?: string; //최신순, 인기순
  userId?: number;
}): Promise<{ data: BoardData[] }> {
  const {
    pageNo = 0,
    size = 10,
    category = "1",
    sort = "최신순",
    userId = 1,
  } = options;
  const response = await instance.get<BoardListResponse>(
    `/board-service/boards?pageNo=${pageNo}&size=${size}&category=${category}&sort=${sort}&userId=${userId}`
  );
  return { data: response.data.data };
}

export interface BoardData {
  id: number;
  title: string;
  summary: string;
  thumbnail: string | null;
  createdTime: string;
  likeCount: number;
  commentCount: number;
  authorNickname: string;
}

interface BoardListResponse {
  success: boolean;
  message: string;
  data: BoardData[];
}

//챌린지 검색
interface challengeListResponse {
  success: boolean;
  message: string;
  data: ChallengeData[];
}

export interface ChallengeData {
  id: number;
  challengeType: number;
  name: string;
  description: string;
  logoUrl: string;
  endAt: string;
  challengeUrl: string;
  corpName: string;
  term: number;
  reward: number;
  participation: number;
}

export async function fetchSearchedChallengeList(
  name: string
): Promise<{ data: ChallengeData[] }> {
  const response = await instance.get<challengeListResponse>(
    `/challenge-service/challenges/search?name=${name}`
  );
  return { data: response.data.data };
}

//상품 검색

export async function fetchSearchedProductList(
  name: string,
  pageNo?: number,
  size?: number,
  category?: string,
  sort?: string
): Promise<{ data: ProductListResponse }> {
  const params = new URLSearchParams({
    name,
  });

  // pageNo, size, category, sort가 정의된 경우에만 추가
  if (pageNo !== undefined) {
    params.append("pageNo", pageNo.toString());
  }
  if (size !== undefined) {
    params.append("size", size.toString());
  }
  if (category) {
    params.append("category", category);
  }
  if (sort) {
    params.append("sort", sort);
  }
  const queryString = params.toString();
  const response = await instance.get<ProductListResponse>(
    `/product-service/products/search?${queryString}`
  );

  return { data: response.data };
}

export interface ProductList {
  id: number;
  name: string;
  corpName: string;
  corpImage: string | null;
  cardImage: string | null;
  tags: string[];
  boardCount: number;
  createdTime: string;
}

interface ProductListData {
  "searched products": ProductList[];
}
interface ProductListResponse {
  success: boolean;
  message: string;
  data: ProductListData;
}

//유저 검색

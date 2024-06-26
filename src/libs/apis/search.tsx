import instance from "./base";

interface FetchSearchedBoardListParams {
  keyword: string;
  pageNo?: number;
  size?: number;
  category?: string;
}

// 게시글 리스트 검색
export async function fetchSearchedBoardList({
  keyword,
  pageNo,
  size = 100,
  category,
}: FetchSearchedBoardListParams): Promise<{ data: BoardData[] }> {
  const params = new URLSearchParams();

  params.append("keyword", keyword);
  if (pageNo !== undefined) {
    params.append("pageNo", pageNo.toString());
  }
  if (size !== undefined) {
    params.append("size", size.toString());
  }
  if (category !== undefined) {
    params.append("category", category);
  }
  const queryString = params.toString();
  const response = await instance.get<BoardListResponse>(
    `/board-service/boards?${queryString}`
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
  authorProfile: string;
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
  categoryName: string;
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
export interface User {
  userId: number;
  nickname: string;
  profileImage: string;
  tofinId: string;
  role: string;
}

interface UserData {
  totalCount: number;
  lastIndex: number;
  users: User[];
  last: boolean;
}

interface UserListResponse {
  success: boolean;
  message: string;
  data: UserData;
}

export async function fetchSearchedUserList(
  keyword: string,
  limit: number,
  last?: number | null
): Promise<{ data: UserListResponse }> {
  const params = new URLSearchParams();
  params.append("nickname", keyword);
  params.append("limit", limit.toString());

  if (last) {
    params.append("last", last.toString());
  }

  const queryString = params.toString();
  const response = await instance.get<UserListResponse>(
    `/user-service/users/search?${queryString}`
  );

  return { data: response.data };
}

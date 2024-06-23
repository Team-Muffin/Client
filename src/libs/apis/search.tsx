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

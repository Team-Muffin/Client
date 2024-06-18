import instance from "./base";

// 게시글 리스트 조회
export async function fetchBoardList(options: {
  pageNo?: number;
  size?: number;
  category?: string; //1: 정보, 2: 재미, 3: 투자, 4: 기업, 5: 고급
  sort?: string; //최신순, 인기순
  userId?: number;
}): Promise<{ data: BoardListResponse["data"] }> {
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

interface BoardListResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    title: string;
    summary: string;
    thumbnail: string | null;
    createdTime: string;
    likeCount: number;
    commentCount: number;
    authorNickname: string;
  }[];
}

// 각 게시글 조회
export async function fetchBoardDetail(
  boardId: string
): Promise<{ data: BoardData["data"] }> {
  const response = await instance.get<BoardData>(
    `/board-service/boards/${boardId}`
  );
  return { data: response.data.data };
}

interface BoardData {
  success: boolean;
  message: string;
  data: {
    title: string;
    content: string;
    category: {
      id: number;
      name: string;
    };
    likeCount: number;
    commentCount: number;
    comments: {
      id: number;
      content: string;
      authorId: number;
      authorName: string;
      authorProfile: string;
      replies: {
        id: number;
        content: string;
        authorId: number;
        authorName: string;
        authorProfile: string;
        createdTime: string;
      }[];
      createdTime: string;
    }[];
    createdTime: string;
    authorId: number;
    authorNickname: string;
    authorProfile: string;
  };
}

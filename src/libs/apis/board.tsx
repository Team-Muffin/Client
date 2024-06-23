import instance from "./base";
import { OutputData } from "@editorjs/editorjs";

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
): Promise<{ data: BoardResponse }> {
  const response = await instance.get<BoardResponse>(
    `/board-service/boards/${boardId}`
  );
  return { data: response.data };
}

export interface BoardResponse {
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

export interface CommentResponse {
  success: boolean;
  message: string;
  data: {
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
}

export async function fetchComment(
  boardId: string
): Promise<{ data: CommentResponse }> {
  const response = await instance.get<CommentResponse>(
    `/board-service/boards/${boardId}/comments`
  );
  return { data: response.data };
}

export async function createBookmark(boardId: string) {
  await instance.post(`/board-service/boards/${boardId}/bookmark`, null, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwibmlja25hbWUiOiLrj5nsm5DssLjsuZgiLCJyb2xlIjoiTk9STUFMIiwiam9iIjoi64yA7ZWZ7IOdIiwiYmlydGgiOiIyMDAwLTAxLTAzIiwicHJvZmlsZUltYWdlIjoiaHR0cDovL-ydtOuvuOyngOyjvOyGjCIsImlhdCI6MTcxODc2MzA2NCwiZXhwIjoxOTE4NzYzOTY0fQ.2PUWMjCoPHrPxAqCV4O3fmZnZlpSQyIfdQGaWhsMiBg`, // 인증 토큰을 헤더에 추가
    },
  });
}

export async function createLike(boardId: string) {
  await instance.post(`/board-service/boards/${boardId}/like`, null, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwibmlja25hbWUiOiLrj5nsm5DssLjsuZgiLCJyb2xlIjoiTk9STUFMIiwiam9iIjoi64yA7ZWZ7IOdIiwiYmlydGgiOiIyMDAwLTAxLTAzIiwicHJvZmlsZUltYWdlIjoiaHR0cDovL-ydtOuvuOyngOyjvOyGjCIsImlhdCI6MTcxODc2MzA2NCwiZXhwIjoxOTE4NzYzOTY0fQ.2PUWMjCoPHrPxAqCV4O3fmZnZlpSQyIfdQGaWhsMiBg`, // 인증 토큰을 헤더에 추가
    },
  });
}

export async function deleteBoard(boardId: string) {
  await instance.delete(`/board-service/boards/${boardId}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwibmlja25hbWUiOiLrj5nsm5DssLjsuZgiLCJyb2xlIjoiTk9STUFMIiwiam9iIjoi64yA7ZWZ7IOdIiwiYmlydGgiOiIyMDAwLTAxLTAzIiwicHJvZmlsZUltYWdlIjoiaHR0cDovL-ydtOuvuOyngOyjvOyGjCIsImlhdCI6MTcxODc2MzA2NCwiZXhwIjoxOTE4NzYzOTY0fQ.2PUWMjCoPHrPxAqCV4O3fmZnZlpSQyIfdQGaWhsMiBg`,
    },
  });
}

//댓글

type commentData = {
  content: string;
  parentId?: number;
};

export async function createComment(boardId: string, commentData: commentData) {
  await instance.post(
    `/board-service/boards/${boardId}/comments`,
    commentData,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwibmlja25hbWUiOiLrj5nsm5DssLjsuZgiLCJyb2xlIjoiTk9STUFMIiwiam9iIjoi64yA7ZWZ7IOdIiwiYmlydGgiOiIyMDAwLTAxLTAzIiwicHJvZmlsZUltYWdlIjoiaHR0cDovL-ydtOuvuOyngOyjvOyGjCIsImlhdCI6MTcxODc2MzA2NCwiZXhwIjoxOTE4NzYzOTY0fQ.2PUWMjCoPHrPxAqCV4O3fmZnZlpSQyIfdQGaWhsMiBg`, // 인증 토큰을 헤더에 추가
      },
    }
  );
}

export async function deleteComment(commentId: number) {
  await instance.delete(
    `/board-service/boards/{boardId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwibmlja25hbWUiOiLrj5nsm5DssLjsuZgiLCJyb2xlIjoiTk9STUFMIiwiam9iIjoi64yA7ZWZ7IOdIiwiYmlydGgiOiIyMDAwLTAxLTAzIiwicHJvZmlsZUltYWdlIjoiaHR0cDovL-ydtOuvuOyngOyjvOyGjCIsImlhdCI6MTcxODc2MzA2NCwiZXhwIjoxOTE4NzYzOTY0fQ.2PUWMjCoPHrPxAqCV4O3fmZnZlpSQyIfdQGaWhsMiBg`, // 인증 토큰을 헤더에 추가
      },
    }
  );
}

export interface CreateBoardRequest {
  title: String;
  content: OutputData | Object;
  categoryId: String

}
export async function createBoard(requestBody: CreateBoardRequest) {
  try {
    const response = await instance.post(
      `/board-service/boards`,
      requestBody
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
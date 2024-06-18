import instance from "./base";

// 게시글
export async function fetchBoardList(
  pageNo?: number,
  size?: number,
  category?: number,
  sort?: string,
  userId?: number
) {
  const response = await instance.get(
    `/board-service/boards?pageNo=${pageNo}&size=${size}&category=${category}&sort=${sort}&userId=${userId}`
  );
  return response;
}

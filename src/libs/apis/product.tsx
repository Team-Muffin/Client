import instance from "./base";

//상품 리스트 조회
export async function fetchProductList(options: {
  pageNo?: number;
  size?: number;
  category?: string;
  sort?: string;
}): Promise<{ data: ProductListResponse }> {
  const { pageNo = 0, size = 10, category = "카드", sort = "최신순" } = options;
  const response = await instance.get<ProductListResponse>(
    `/product-service/products?pageNo=${pageNo}&size=${size}&category=${category}&sort=${sort}`
  );
  return { data: response.data };
}

export interface ProductList {
  id: number;
  name: string;
  corpName: string;
  corpImage: string;
  cardImage: string;
  tags: string[];
  boardCount: number;
  createdTime: string;
}

interface ProductListData {
  products: ProductList[];
}

interface ProductListResponse {
  success: boolean;
  message: string;
  data: ProductListData;
}

// 각 게시글 조회
// export async function fetchBoardDetail(
//   boardId: string
// ): Promise<{ data: BoardResponse }> {
//   const response = await instance.get<BoardResponse>(
//     `/board-service/boards/${boardId}`
//   );
//   return { data: response.data };
// }

// export interface BoardResponse {
//   success: boolean;
//   message: string;
//   data: {
//     title: string;
//     content: string;
//     category: {
//       id: number;
//       name: string;
//     };
//     likeCount: number;
//     commentCount: number;
//     comments: {
//       id: number;
//       content: string;
//       authorId: number;
//       authorName: string;
//       authorProfile: string;
//       replies: {
//         id: number;
//         content: string;
//         authorId: number;
//         authorName: string;
//         authorProfile: string;
//         createdTime: string;
//       }[];
//       createdTime: string;
//     }[];
//     createdTime: string;
//     authorId: number;
//     authorNickname: string;
//     authorProfile: string;
//   };
// }

// export interface CommentResponse {
//   success: boolean;
//   message: string;
//   data: {
//     id: number;
//     content: string;
//     authorId: number;
//     authorName: string;
//     authorProfile: string;
//     replies: {
//       id: number;
//       content: string;
//       authorId: number;
//       authorName: string;
//       authorProfile: string;
//       createdTime: string;
//     }[];
//     createdTime: string;
//   }[];
// }

// export async function fetchComment(
//   boardId: string
// ): Promise<{ data: CommentResponse }> {
//   const response = await instance.get<CommentResponse>(
//     `/board-service/boards/${boardId}/comments`
//   );
//   return { data: response.data };
// }

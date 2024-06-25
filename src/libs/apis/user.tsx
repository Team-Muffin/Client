import instance from "./base";
import { GlobalResponse } from "./responses/response";

//회원가입
interface SignUpRequest {
  tofinId: string;
  userInfo: string;
  profileImg: string;
  nickname: string;
  birth: string;
  job?: string;
}

export async function signUp(userData: SignUpRequest) {
  try {
    const response = await instance.post(`/user-service/sign-up`, userData);
    return response.data;
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);
    throw error;
  }
}

//아이디 조회
interface checkUserIdAvailabilityResp {
  success: boolean;
  message: string;
  data: {
    tofinId: string;
    available: boolean;
    reason: string;
  };
}

export async function checkUserIdAvailability(
  target: string
): Promise<checkUserIdAvailabilityResp> {
  try {
    const response = await instance.get(`/user-service/users/available-id`, {
      params: { target },
    });
    console.log("API Response Data:", response.data); // Debugging line
    // Ensure response contains 'data' and 'available' fields
    if (response.data.data.hasOwnProperty("available")) {
      return response.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("사용가능한 아이디 조회 중 오류 발생:", error);
    throw error;
  }
}

//로그인
interface SignInRequest {
  tofinId: string;
  userInfo: string;
}

export async function signIn(credentials: SignInRequest) {
  try {
    const response = await instance.post("/user-service/sign-in", credentials, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    return response.data;
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    throw error;
  }
}

//직업 조회
export interface JobResp {
  success: boolean;
  message: string;
  data: [string];
}

export async function fetchJobs(target: string): Promise<JobResp> {
  try {
    const response = await instance.get(`user-service/users/jobs`, {
      params: { target },
    });
    console.log("Jobs Reponse Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("직업 조회 오류 발생", error);
    throw error;
  }
}

//전화번호 확인
interface checkUserContactAvailabilityResp {
  success: boolean;
  message: string;
  data: {
    contact: string;
    available: boolean;
    reason: string;
  };
}

export async function CheckUserContactAvailability(
  target: string
): Promise<checkUserContactAvailabilityResp> {
  try {
    const response = await instance.get(
      `/user-service/users/available-contact`,
      { params: { target } }
    );
    console.log("API Response Data:", response.data);
    if (response.data.data.hasOwnProperty("available")) {
      return response.data;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("사용가능한 전화번호 조회 중 오류 발생:", error);
    throw error;
  }
}

//자산 연결
interface AssetRequest {
  socialName: string;
  backSocialId: string;
  contact: string;
}

export async function connectAsset(infodata: AssetRequest) {
  try {
    const response = await instance.post(
      `/user-service/users/assets`,
      infodata
    );
    return response.data;
  } catch (error) {
    console.error("자산 연결 중 오류 발생:", error);
    throw error;
  }
}

//투자 성향 설정
interface TendencyRequest {
  account: boolean;
  card: boolean;
  loan: boolean;
  invest: boolean;
  purpose: string;
}

export async function setTendency(tendata: TendencyRequest) {
  try {
    const response = await instance.post(
      `/user-service/users/tendency`,
      tendata
    );
    return response.data;
  } catch (error) {
    console.error("성향 설정 중 오류 발생", error);
    throw error;
  }
}

//회원 정보 변경
export interface EditProfileRequest {
  nickname?: string;
  job?: string;
}

export async function EditProfile(
  profileData: EditProfileRequest,
  imageFile: File | undefined
) {
  try {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile); // 이미지 파일 추가
    }
    formData.append("request", JSON.stringify(profileData)); // JSON 데이터 추가
    const response = await instance.put(
      `/user-service/users/profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("프로필 변경 API 호출 성공:", response.data); // 성공 로그 출력
    return response.data;
  } catch (error) {
    console.error("프로필 변경 중 오류 발생", error);
    throw error;
  }
}

// 유저 상세 조회
export interface UserDetailsResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    nickname: string;
    profileImage: string;
    tofinId: string;
    role: string;
    job: string;
    ageRange: number;
    followers: number;
    followings: number;
    isFollow: boolean;
  };
}

export async function getUserDetails(id: number): Promise<UserDetailsResponse> {
  try {
    const response = await instance.get(`/user-service/users/${id}`);
    // console.log("유저 상세 정보 조회 API 호출 성공:", response.data); // 성공 로그 출력
    return response.data;
  } catch (error) {
    console.error("유저 상세 정보 조회 중 오류 발생", error);
    throw error;
  }
}

//팔로워 조회
export interface FollowersReq {
  id: number;
  nickname: string;
  profileImage: string;
}

export interface GetFollowersResponse {
  success: boolean;
  message: string;
  data: FollowersReq[];
}

export async function getFollowers(
  id: number,
  limit: number = 20,
  last?: number
): Promise<GetFollowersResponse> {
  try {
    const params: Record<string, number> = { limit };
    if (last) {
      params.last = last;
    }

    const response = await instance.get(`/user-service/users/${id}/followers`, {
      params,
    });
    // console.log("팔로워 조회 API 호출 성공:", response.data); // 성공 로그 출력
    return response.data;
  } catch (error) {
    console.error("팔로워 조회 중 오류 발생", error);
    throw error;
  }
}

//포트폴리오 조회
export interface PortfolioDetails {
  totalAmount: number;
  savingRate: number;
  savingAmount: number;
  depositRate: number;
  depositAmount: number;
  cmaRate: number;
  cmaAmount: number;
  investRate: number;
  investAmount: number;
  returnRate: number;
  domesticRatio: number;
  foreignRatio: number;
  domesticStocks: { code: string; name: string; rate: number }[];
  foreignStocks: { code: string; name: string; rate: number }[];
}

export interface PortfolioResponse {
  success: boolean;
  message: string;
  data: {
    details: PortfolioDetails;
    abstracts: PortfolioDetails;
  };
}

export async function getPortfolio(id: number): Promise<PortfolioResponse> {
  try {
    const response = await instance.get(`/user-service/users/${id}/portfolios`);
    // console.log(" 조회 API 호출 성공:", response.data); // 성공 로그 출력
    return response.data;
  } catch (error) {
    console.error("포트폴리오 조회 중 오류 발생", error);
    throw error;
  }
}

export interface SubPortfolioResponse {
  success: boolean;
  message: string;
  data: {};
}

//포트폴리오 구독
export async function subscribePortfolio(
  id: number
): Promise<PortfolioResponse> {
  try {
    const response = await instance.post(
      `/user-service/users/${id}/portfolios`
    );
    console.log(" 조회 API 호출 성공:", response.data); // 성공 로그 출력
    return response.data;
  } catch (error) {
    console.error("포트폴리오 조회 중 오류 발생", error);
    throw error;
  }
}

export type AccountResponse = {
  number: string;
  productType: string;
  name: string;
  cash: number;
  image: string;
};
export async function getAccounts(): Promise<AccountResponse[]> {
  try {
    const res = await instance.get<GlobalResponse<AccountResponse[]>>(
      "/user-service/users/accounts"
    );
    return res.data.data;
  } catch (err) {
    throw err;
  }
}

export async function getBirth(): Promise<string> {
  try {
    const res = await instance.get<GlobalResponse<string>>(
      "/user-service/users/birth"
    );

    return res.data.data;
  } catch (err) {
    throw err;
  }
}

export async function isAssetConnected(): Promise<boolean> {
  try {
    const res = await instance.get<GlobalResponse<boolean>>(
      "/user-service/users/assets/status"
    );

    return res.data.data;
  } catch (err) {
    throw err;
  }
}

//팔로잉 목록 확인
export async function getFollowingList(
  id: number,
  limit?: number,
  last?: number | null
): Promise<followingResponse> {
  try {
    const params = new URLSearchParams();
    params.append("id", id.toString());
    if (limit !== undefined) {
      params.append("limit", limit.toString());
    }
    if (last !== null && last !== undefined) {
      params.append("last", last.toString());
    }
    const queryString = params.toString();
    const response = await instance.get(
      `/user-service/users/${id}/followings?${queryString}`
    );
    // console.log("팔로잉 조회 API 호출 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("팔로잉 조회 중 오류 발생", error);
    throw error;
  }
}

interface followingResponse {
  success: boolean;
  message: string;
  data: {
    totalCount: number;
    lastIndex: number;
    users: UserData[];
    last: boolean;
  };
}

export interface UserData {
  followId: number;
  userId: number;
  nickname: string;
  profileImage: string;
  tofinId: string;
  role: string;
  followStatus: boolean;
}

//팔로워 목록 확인
export async function getFollowerList(
  id: number,
  limit?: number,
  last?: number | null
): Promise<followerResponse> {
  try {
    const params = new URLSearchParams();
    params.append("id", id.toString());
    if (limit !== undefined) {
      params.append("limit", limit.toString());
    }
    if (last !== null && last !== undefined) {
      params.append("last", last.toString());
    }
    const queryString = params.toString();
    const response = await instance.get(
      `/user-service/users/${id}/followers?${queryString}`
    );
    // console.log("팔로워 조회 API 호출 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("팔로워 조회 중 오류 발생", error);
    throw error;
  }
}

interface followerResponse {
  success: boolean;
  message: string;
  data: {
    totalCount: number;
    lastIndex: number;
    users: UserData[];
    last: boolean;
  };
}
export type AccountResponse = {
  number: string;
  productType: string;
  name: string;
  cash: number;
  image: string;
};
export async function getAccounts(): Promise<AccountResponse[]> {
  try {
    const res = await instance.get<GlobalResponse<AccountResponse[]>>(
      "/user-service/users/accounts"
    );
    return res.data.data;
  } catch (err) {
    throw err;
  }
}

export async function getBirth(): Promise<string> {
  try {
    const res = await instance.get<GlobalResponse<string>>(
      "/user-service/users/birth"
    );

    return res.data.data;
  } catch (err) {
    throw err;
  }
}

export async function isAssetConnected(): Promise<boolean> {
  try {
    const res = await instance.get<GlobalResponse<boolean>>(
      "/user-service/users/assets/status"
    );

    return res.data.data;
  } catch (err) {
    throw err;
  }
}

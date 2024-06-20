import instance from "./base";

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
    const response = await instance.post("/user-service/sign-up", userData);
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

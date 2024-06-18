import instance from "./base";

export async function signUp(userData: {
  tofinId: string;
  userInfo: string;
  profileImg: string;
  nickname: string;
  birth: string;
}) {
  try {
    const response = await instance.post("/user-service/sign-up", userData);
    return response.data;
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);
    throw error;
  }
}

export async function signIn(credentials: {
  tofinId: string;
  userInfo: string;
}) {
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

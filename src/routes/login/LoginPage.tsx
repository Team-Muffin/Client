import React, { useState } from "react";
import MainLogoImg from "../../assets/main-logo.svg";
import PurpleBtn from "../../components/PurpleBtn";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore"; // Zustand에서 useAuthStore 가져오기
import { signIn } from "../../libs/apis/user"; // login API 호출 함수 가져오기

// 인터페이스 정의
interface SignInData {
  tofinId: string;
  userInfo: string;
}

interface AuthState {
  userId: string;
  userInfo: string;
  login: (
    id: string,
    userInfo: string,
    nickname: string,
    profileImg: string,
    birth: string
  ) => void;
}

const LoginPage: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login: storeLogin } = useAuthStore((state: AuthState) => ({
    login: state.login,
  })); // Zustand에서 login 액션 가져오기

  const handleLogin = async () => {
    try {
      // 실제 로그인 API 호출 예시
      const userData: SignInData = {
        tofinId: id,
        userInfo: password,
      };
      await signIn(userData); // login API 호출

      // Zustand의 login 액션 호출하여 로그인 상태 관리
      storeLogin(id, password, "", "", "");

      // 로그인 후 리다이렉트할 페이지로 이동
      // 예시로는 "/challenge" 페이지로 이동하도록 하였습니다.
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center pt-[10vh] pb-[5vh]">
        <img src={MainLogoImg} alt="Main Logo" />
        <p className="text-5xl font-semibold text-[#748BFF] mt-[6vh]">ToFin</p>
        <p className="tracking-widest text-xl font-semibold mt-[1vh]">
          너와 함께 하는 금융 여정
        </p>
      </div>

      <div className="px-[10vw]">
        <p className="text-lg font-semibold mb-[2vh]">아이디</p>
        <input
          type="text"
          id="ID"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="ID"
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <p className="text-lg font-semibold my-[2vh]">비밀번호</p>
        <input
          type="text"
          id="PW"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex mt-[5vh]">
          <PurpleBtn
            onClick={handleLogin}
            label="ToFin 시작하기 !"
            to="/home"
          />
        </div>
        <div className="flex justify-center mt-[2vh]">
          <Link to="/home" className="text-xs text-gray mr-[2vw]">
            게스트로 입장하기
          </Link>
          <Link to="/signup" className="text-xs font-medium ml-[3vw]">
            회원가입하기
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

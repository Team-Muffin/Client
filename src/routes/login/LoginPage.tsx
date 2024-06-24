import React, { useState } from "react";
import MainLogoImg from "../../assets/main-logo.svg";
import PurpleBtn from "../../components/common/PurpleBtn";
import { Link, useNavigate } from "react-router-dom";
import useAuth2Store from "../../store/useAuth2Store";

// 인터페이스 정의
interface SignInData {
  tofinId: string;
  userInfo: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth2Store();

  const handleLogin = async () => {
    const res = await login(userId, password);
    if (res) {
      navigate("/");
    } else {
      alert("아이디 및 비밀번호를 다시 확인하세요!");
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
          value={userId}
          onChange={(e) => setId(e.target.value)}
        />

        <p className="text-lg font-semibold my-[2vh]">비밀번호</p>
        <input
          type="password"
          id="PW"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex mt-[5vh]">
          <PurpleBtn onClick={handleLogin} label="ToFin 시작하기 !" />
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

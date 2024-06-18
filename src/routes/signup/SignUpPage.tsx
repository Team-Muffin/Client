import React, { useState } from "react";
import MiniCircle from "../../assets/minicircle.svg?react";
import Essential from "../../assets/required.svg?react";
import PurpleBtn from "../../components/PurpleBtn";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userInfo, setuserInfo] = useState("");
  const [userInfoCheck, setuserInfoCheck] = useState("");

  const login = useAuthStore((state) => state.login);

  const handleNext = () => {
    if (userInfo !== userInfoCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    login(userId, userInfo, "", "", ""); // 이 부분에서 Zustand의 login 함수 호출

    navigate("/signup/profile");
  };

  return (
    <>
      <div className="px-[8vw] pt-[5vh]">
        <div className="flex items-center">
          <p className="text-[#748BFF] text-4xl font-semibold">ToFin</p>
          <p className="text-2xl font-medium ml-[2vw]">에 </p>
        </div>
        <p className="text-2xl font-medium mb-[2.5vh]">
          오신 것을 환영합니다!{" "}
        </p>
        <p className="text-base mb-[7vh]">
          먼저 로그인하기 위한 <br />
          아이디와 비밀번호를 입력해주세요{" "}
        </p>
        <div className="flex mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">아이디</p>
          <Essential />
        </div>
        <input
          type="text"
          id="id"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="ID"
          required
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <div className="flex mt-[3vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">비밀번호</p>
          <Essential />
        </div>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Password"
          required
          value={userInfo}
          onChange={(e) => setuserInfo(e.target.value)}
        />

        <div className="flex mt-[3vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">비밀번호 확인</p>
          <Essential />
        </div>
        <input
          type="password"
          id="password_check"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Password_check"
          required
          value={userInfoCheck}
          onChange={(e) => setuserInfoCheck(e.target.value)}
        />
      </div>

      <div className="fixed w-full px-[8vw] bottom-[3vh]">
        <div className="flex justify-center mb-[3vh]">
          <MiniCircle className="w-3 h-3 mr-5" style={{ fill: "#748BFF" }} />
          <MiniCircle className="w-3 h-3 mr-5" />
          <MiniCircle className="w-3 h-3 mr-5" />
          <MiniCircle className="w-3 h-3" />
        </div>
        <PurpleBtn
          label="로그인 정보 작성하기"
          onClick={handleNext}
          to="/signup/profile"
        />
      </div>
    </>
  );
};

export default SignUpPage;

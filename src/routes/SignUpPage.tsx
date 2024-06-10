import { Link } from "react-router-dom";
import MiniCircle from "../assets/minicircle.svg?react";

const SignUpPage = () => {
  return (
    <>
      <div className="px-[8vw] py-[7vh]">
        <div className="flex items-center">
          <p className="text-[#748BFF] text-3xl font-semibold">ToFin</p>
          <p className="text-xl font-medium ml-[2vw]">에 </p>
        </div>
        <p className="text-xl font-medium mb-[2.5vh]">오신 것을 환영합니다! </p>

        <p className="text-sm mb-[7vh]">
          먼저 로그인하기 위한 <br />
          아이디와 비밀번호를 입력해주세요{" "}
        </p>

        <p className="text-lg font-semibold mb-[2vh]">아이디</p>
        <input
          type="text"
          id="id"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="ID"
          required
        />

        <p className="text-lg font-semibold my-[2vh]">비밀번호</p>
        <input
          type="text"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="PassWord"
          required
        />

        <p className="text-lg font-semibold my-[2vh]">비밀번호 확인</p>
        <input
          type="text"
          id="password_check"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="PassWord Check"
          required
        />

        <div className="flex justify-center mb-[2vh] mt-[15vh]">
          <Link to="/signup">
            <MiniCircle className="w-3 h-3 mr-5" style={{ fill: "#748BFF" }} />
          </Link>
          <Link to="/otherpage1">
            <MiniCircle className="w-3 h-3 mr-5" />
          </Link>
          <Link to="/otherpage2">
            <MiniCircle className="w-3 h-3 mr-5" />
          </Link>
          <Link to="/otherpage3">
            <MiniCircle className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex mt-[3vh]">
          <Link
            to="/challenge/cal"
            className="text-lg font-normal text-white text-center bg-[#748BFF] rounded-[1rem] shadow py-[2vh] w-full"
          >
            로그인 정보 작성하기
          </Link>
        </div>
      </div>
    </>
  );
};
export default SignUpPage;

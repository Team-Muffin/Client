import MainLogo from "../../assets/main-logo.svg?react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <div className="flex flex-col items-center pt-[10vh] pb-[5vh] ">
        <MainLogo />
        <p className="text-5xl font-semibold text-[#748BFF] mt-[6vh]">ToFin</p>
        <p className="tracking-widest text-xl font-semibold mt-[1vh] ">
          너와 함께 하는 금융 여정
        </p>
      </div>

      <div className="px-[10vw] ">
        <p className="text-lg font-semibold mb-[2vh]">아이디</p>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="ID"
          required
        />

        <p className="text-lg font-semibold my-[2vh]">비밀번호</p>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="PassWord"
          required
        />

        <div className="flex mt-[5vh]">
          <Link
            to="/challenge/cal"
            className="text-lg font-normal text-white text-center bg-[#748BFF] rounded-[1rem] shadow py-[2vh] w-full"
          >
            ToFin 시작하기 !
          </Link>
        </div>
        <div className="flex justify-center mt-[2vh]">
          <p className="text-xs text-gray mr-[2vw]">아직 계정이 없다면?</p>
          <Link to="/signup" className="text-xs font-medium ml-[3vw]">
            회원가입하기
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

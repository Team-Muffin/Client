import MainLogo from "../../assets/main-logo.svg?react";
import Confetti from "react-confetti";

const SignUpSuccessPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-[15vh] pb-[5vh] ">
        <MainLogo />

        <p className="text-3xl font-semibold text-[#748BFF] mt-[2vh]">
          {" "}
          {/* Adjusted margin top here */}
          WELCOME!
        </p>
        <p className="tracking-widest text-lg text-gray-500 font-semibold mt-[1vh] text-center">
          이제부터 ToFin이 <br />
          당신의 금융 활동 도우미가 될게요!
        </p>
      </div>

      <Confetti />
      <div className="absolute w-full px-[8vw] pb-[3vh] bottom-[3vh]">
        {" "}
        {/* Changed fixed to absolute */}
        <button className="text-lg font-normal text-white text-center bg-[#748BFF] rounded-[1rem] shadow py-[2vh] w-full">
          로그인 하러 가기
        </button>
      </div>
    </>
  );
};

export default SignUpSuccessPage;

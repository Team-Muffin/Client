import { useState } from "react";
import Confetti from "react-confetti";
import PurpleBtn from "../../components/common/PurpleBtn";
import MainLogoImg from "../../assets/main-logo.svg"; // Import SVG file

const SignUpSuccessPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-[15vh] pb-[5vh]">
        <img src={MainLogoImg} alt="Main Logo" />

        <p className="text-3xl font-semibold text-[#748BFF] mt-[2vh]">
          WELCOME!
        </p>
        <p className="tracking-widest text-lg text-gray-500 font-semibold mt-[1vh] text-center">
          이제부터 ToFin이 <br />
          당신의 금융 활동 도우미가 될게요!
        </p>
      </div>

      <Confetti />
      <div className="absolute w-full px-[8vw] pb-[3vh] bottom-[3vh]">
        <PurpleBtn to="/home" label="입장하기" />
      </div>
    </>
  );
};

export default SignUpSuccessPage;

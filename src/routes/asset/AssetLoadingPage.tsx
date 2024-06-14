import { PulseLoader } from "react-spinners";
import MiniCircle from "../../assets/minicircle.svg?react";
import Bank from "../../assets/bank.svg?react";
import PurpleBtn from "../../components/PurpleBtn";

const AssetLoadingPage = () => {
  return (
    <>
      <div className="px-[8vw] pt-[5vh] relative">
        <p className="text-[#748BFF] text-4xl font-semibold">ToFin</p>
        <p className="text-2xl font-medium mb-[2.5vh]">자산을 연결해주세요 </p>
        <p className="text-base mb-[4vh]">
          나의 자산을 연결할 수 있어요 <br />
          자산 공개 여부는 설정에서 바꿀 수 있어요
        </p>

        <div className="flex justify-center items-center mx-[1vw] mt-[12vh]">
          <Bank className="w-[36vw] h-[18vh] mr-[2vw]" />
          <div className="flex flex-col">
            <div className="flex mb-[1vh]">
              <div className="bg-gray-300 rounded-lg h-[6vh] w-[12vw] skeleton"></div>
              <div className="flex flex-col ml-[2vw] ">
                <div className="bg-gray-300 rounded-lg h-[2.5vh] w-[18vw] mb-[1vh] skeleton"></div>
                <div className="bg-gray-300 rounded-lg h-[2.5vh] w-[18vw] skeleton"></div>
              </div>
            </div>
            <div className="bg-gray-300 rounded-lg h-[2.5vh] w-[24vw] mb-[1vh] skeleton"></div>
            <div className="bg-gray-300 rounded-lg h-[2.5vh] w-[24vw] skeleton"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-gray-500 text-xl font-medium ">
          나의 자산을 연결 중이에요
        </p>
        <p className="text-gray-500 text-xl font-medium">잠시만 기다려주세요</p>
      </div>

      <div className="fixed w-full px-[8vw] bottom-[3vh]">
        <div className="flex justify-center mb-[3vh]">
          <MiniCircle className="w-3 h-3 mr-5" />
          <MiniCircle className="w-3 h-3 mr-5" />
          <MiniCircle className="w-3 h-3 mr-5" style={{ fill: "#748BFF" }} />
          <MiniCircle className="w-3 h-3" />
        </div>
        <div className="relative flex justify-center items-center">
          <PurpleBtn to="/signup/connectedasset" label="  " />
          <div className="absolute">
            <PulseLoader color={"#ffffff"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetLoadingPage;

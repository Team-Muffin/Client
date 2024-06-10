import { useState } from "react";

import Coin from "../assets/coin30.svg?react";
import User1 from "../assets/userIcon1.svg?react";
import EmotionSave from "../assets/emotionSave.svg?react";
import Navbar from "./Navbar";

const ChallengePage = () => {
  const [category, setCategory] = useState("최신순");
  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
  };
  const selectedCategoryCss =
    "text-xs text-white bg-[#748BFF] rounded-xl shadow  py-[0.5vh] px-[2vw]";
  const defaultCategoryCss =
    "text-xs text-[#748BFF] bg-[#ECF0FF] rounded-xl shadow py-[0.5vh] px-[2vw]";
  console.log(category);
  return (
    <>
      <div className="relative py-[3vh] px-[8vw] bg-[#758BFF] w-screen">
        <p className="text-lg font-black text-white">
          user님이 참여 중인 챌린지
        </p>
        <p className="text-xs pb-8 font-base text-white">
          2개의 챌린지에 참여 중이시네요!
        </p>

        <a
          href="#"
          className="block w-[48vw] h-[8vh] py-[1vh] px-[2vw] mb-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-sm font-black text-gray-900">감정 저축하기</p>
              <p className="text-xs font-normal text-gray-700">
                2일째 도전 중이에요
              </p>
            </div>
            <div>
              <EmotionSave width={"5vh"} height={"5vh"}></EmotionSave>
            </div>
          </div>
        </a>

        <a
          href="#"
          className="block w-[48vw] h-[8vh] py-[1vh] px-[2vw] mb-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-sm font-black text-gray-900">
                청년 저축 챌린지
              </p>
              <p className="text-xs font-normal text-gray-700">
                12일째 도전 중이에요
              </p>
            </div>
          </div>
        </a>

        <div className="absolute bottom-0 right-0">
          <User1 />
        </div>
      </div>

      <div className="relative border -mt-6 px-[8vw] py-[3vh] h-[22vh] rounded-[30px] bg-[#ECF0FF] ">
        <div className="flex ">
          <p className="text- base items-center r-3 mb-4 mr-2 font-bold text-black-900">
            신규 챌린지
          </p>

          <p className="text-sm items-center font-bold text-red-600">NEW!</p>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-base font-bold text-black-900">감정 저축하기</p>
            <p className="text-xs ml-1 font-bold text-gray-600">
              마감 기한 없음
            </p>
          </div>

          <a className="items-center">
            <Coin />
          </a>
        </div>
      </div>

      <div className="relative border -mt-10 px-[8vw] py-[3vh] h-[40vh] rounded-[30px] bg-white">
        <p className="text-base font-bold text-black-900">모집중 챌린지</p>

        <div className="flex justify-end mt-[2vh]">
          <div
            className={`${
              category === "최신순" ? selectedCategoryCss : defaultCategoryCss
            } cursor-pointer mr-[2vw]`}
            onClick={() => handleCategoryClick("최신순")}
          >
            최신순
          </div>
          <div
            className={`${
              category === "마감기한순"
                ? selectedCategoryCss
                : defaultCategoryCss
            } cursor-pointer`}
            onClick={() => handleCategoryClick("마감기한순")}
          >
            마감기한순
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default ChallengePage;

import { useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import StarRate from "../../components/StarRate";
import Character from "../../assets/character1-small.svg";
import Dropdown from "../../components/Dropdown";

export default function ReviewPage() {
  return (
    <>
      <Header text="Mr.Life" type={1} />
      <div className="mt-[4vh]" />

      <div className="py-[2vh]  px-[4.5vw] pb-[1vh]">
        <div className="flex justify-between">
          <div className="flex justify-between items-center">
            <div className="inline">
              <span className="font-semibold text-[1.15rem] ml-[1.5vw]">
                리뷰
              </span>
              <span className="font-semibold text-[1.15rem] ml-[1.5vw] text-[#738BFF]">
                20,239
              </span>
            </div>
          </div>
          <Dropdown
            defaultFilter="최신순"
            filterList={["최신순", "별점 높은 순", "별점 낮은 순"]}
          />
        </div>

        <p className="text-center font-semibold text-[1.2rem] mt-[1vh]">4.26</p>
        <StarRate rate={4.26} w={20} h={20} />
        <hr className="mt-[2vh]" />

        {/* 리뷰 컴포넌트 */}
        <div className="flex ml-[3vw] items-start my-[2vh]">
          <img className="relative t-0" src={Character} />
          <div className="ml-[2.5vw]">
            <div>
              <span className="font-semibold text-[0.95rem] text-C333333">
                권모술수
              </span>
              <span className="text-[0.8rem] text-[#9B9B9B] ml-[1vw]">
                {" "}
                40대/회사원
              </span>
            </div>
            <div className="flex items-center mt-[0.1vh]">
              <StarRate rate={4.5} w={13} h={13} />
              <span className="text-[0.7rem] text-[#9B9B9B] ml-[1vw]">
                2024.06.02
              </span>
            </div>
            <div className=" mt-[1vh]  text-[0.9rem]">좋네요 추천합니다</div>
          </div>
        </div>

        <hr />
        {/* 여기까지 리뷰 */}
        <div className="flex ml-[3vw] items-start my-[2vh]">
          <img className="relative t-0" src={Character} />
          <div className="ml-[2.5vw]">
            <div>
              <span className="font-semibold text-[0.95rem] text-C333333">
                권모술수
              </span>
              <span className="text-[0.8rem] text-[#9B9B9B] ml-[1vw]">
                {" "}
                40대/회사원
              </span>
            </div>
            <div className="flex items-center mt-[0.1vh]">
              <StarRate rate={4.5} w={13} h={13} />
              <span className="text-[0.7rem] text-[#9B9B9B] ml-[1vw]">
                2024.06.02
              </span>
            </div>
            <div className=" mt-[1vh]  text-[0.9rem]">좋네요 추천합니다</div>
          </div>
        </div>

        <hr />
      </div>

      <div className="pb-[8.5vh]" />
      <Navbar />
    </>
  );
}

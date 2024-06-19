import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import SHLogo from "../../assets/logo-sh.svg";
import Happy from "../../assets/happy.svg";
import Sad from "../../assets/disappointed.svg";
import Stars from "../../assets/review-write-star-gray.svg";
import Stars_filled from "../../assets/review-write-star-yellow.svg";
import Scrap from "../../assets/scrap.svg";
import Scrap_filled from "../../assets/scrap-filled.svg";

export default function ReviewWritePage() {
  const benefits = ["연회비지원", "관리비", "주유", "통신", "대형마트"];
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWriteButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleHappyButtonClick = () => {
    setIsModalOpen(false);
  };
  const handleSadButtonClick = () => {
    setIsModalOpen(false);
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <>
      <div className="py-[2vh] px-[4.5vw] pb-[1vh]">
        <Header text="리뷰 작성" type="backLeftTextCenter" />
        <div className="mt-[4vh]" />

        <div className="mt-[4vh]">
          <img className="w-[3.5vh] inline mr-[0.6vw]" src={SHLogo} />
          <span className="text-[0.85rem] text-C333333 mt-[0.1rem]">
            신한카드
          </span>
          <div>
            <p className="font-semibold text-[1.4rem] ml-[1.5vw] mb-[0.6vh]">
              신한카드 Mr.Life
            </p>
            <div className="mb-[1vh]">
              {benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="ml-[1.5vw] text-[0.75rem] mr-[1vw] p-[1vw] bg-CECF0FF rounded-[0.25rem]"
                >
                  #{benefit}
                </span>
              ))}
            </div>
          </div>
          <div className="App"></div>
        </div>

        <div className="flex items-center justify-center mt-[2.5vh]">
          <Rating
            onClick={handleRating}
            emptyIcon={<img src={Stars} className="inline-block" />}
            fillIcon={<img src={Stars_filled} className="inline-block" />}
          />
          {/* <span className="ml-[2vw] text-base">{rating}</span> */}
        </div>

        <textarea
          id="message"
          rows={7}
          placeholder="200자 이내로 작성해주세요"
          className=" mt-[2vh] border-gray-300 rounded-[1rem] w-full p-4 text-gray-900 text-base"
        />
        <div className="flex justify-center mt-[2vh]">
          <div
            className="text-base font-semibold text-[#758BFF] bg-[#ECF0FF] rounded-[0.6rem] shadow py-[0.8vh] px-[10vw] "
            onClick={() => handleWriteButtonClick()}
          >
            작성하기
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg p-[4vh]">
            <h2 className="text-xl font-semibold  flex justify-center">
              현대카드 M
            </h2>
            <p className="text-sm text-[#666666] mb-4 text-center">
              상품에 대한 인상을 남겨주세요
            </p>
            <div className="flex ">
              <div
                className="flex mr-[8vw] p-[2.5vw] bg-[#ECF0FF] rounded-[0.5rem] shadow"
                onClick={() => handleHappyButtonClick()}
              >
                <img src={Happy} className="mr-[1.5vw]"></img>
                <span className="text-[#738BFF]">유용해요</span>
              </div>
              <div
                className="flex p-[2.5vw] bg-[#ECF0FF] rounded-[0.5rem] shadow"
                onClick={() => handleSadButtonClick()}
              >
                <img src={Sad} className="mr-[1.5vw]"></img>
                <span className="text-[#666666]">아쉬워요</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="pb-[8.5vh]" />
      <Navbar />
    </>
  );
}

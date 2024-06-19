import React, { useState } from "react";
import MiniCircleImg from "../../assets/minicircle.svg"; // Import SVG file
import DepositImg from "../../assets/deposit.svg"; // Import SVG file
import InvestImg from "../../assets/invest.svg"; // Import SVG file
import CardImg from "../../assets/card.svg"; // Import SVG file
import LoanImg from "../../assets/loan.svg"; // Import SVG file
import InfoImg from "../../assets/info.svg"; // Import SVG file
import ReviewImg from "../../assets/review.svg"; // Import SVG file
import RocketImg from "../../assets/rocket.svg"; // Import SVG file
import PurpleBtn from "../../components/PurpleBtn";

const TendencyAnalysisPage = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState<string>("");

  const handleItemClick = (item: string) => {
    console.log("Clicked item:", item);
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem: string) => selectedItem !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handlePurposeClick = (purpose: string) => {
    console.log("Clicked purpose:", purpose);
    setSelectedPurpose(purpose);
  };

  const isSelected = (item: string) => selectedItems.includes(item);
  const isPurposeSelected = (purpose: string) => selectedPurpose === purpose;

  return (
    <>
      <div className="px-[8vw] pt-[5vh]">
        <p className="text-[#748BFF] text-4xl font-semibold">ToFin</p>
        <p className="text-2xl font-medium mb-[2.5vh]">성향을 선택해주세요 </p>
        <p className="text-base mb-[4vh]">
          내 성향 분석을 연결할 수 있어요 <br />
          성향에 따라 게시글 / 금융상품을 추천드릴게요!
        </p>
        <div className="flex justify-between mt-[4vh] mb-[0.5vh]">
          <p className="text-xl font-semibold">관심있는 상품</p>
          <div className="text-right">
            <p className="text-xs font-normal">
              관심 상품을 골라주세요 <br />( 다중 선택 가능 )
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[1vw]">
          <div
            className={`flex flex-col items-center justify-center border border-transparent rounded-lg cursor-pointer ${
              isSelected("deposit") && "bg-[#ECF0FF]"
            }`}
            onClick={() => handleItemClick("deposit")}
          >
            <img src={DepositImg} alt="Deposit" className="w-[20vw] h-[8vh]" />
            <p className="text-sm font-semibold">예적금</p>
          </div>
          <div
            className={`flex flex-col items-center justify-center border border-transparent rounded-lg p-[1vh] cursor-pointer ${
              isSelected("invest") && "bg-[#ECF0FF]"
            }`}
            onClick={() => handleItemClick("invest")}
          >
            <img
              src={InvestImg}
              alt="Invest"
              className="w-[20vw] h-[8vh] mb-[0.5vh]"
            />
            <p className="text-sm font-semibold">투자</p>
          </div>
          <div
            className={`flex flex-col items-center justify-center border border-transparent rounded-lg p-[1vh] cursor-pointer ${
              isSelected("card") && "bg-[#ECF0FF]"
            }`}
            onClick={() => handleItemClick("card")}
          >
            <img src={CardImg} alt="Card" className="w-[20vw] h-[8vh]" />
            <p className="text-sm font-semibold">카드</p>
          </div>
          <div
            className={`flex flex-col items-center justify-center border border-transparent rounded-lg p-[1vh] cursor-pointer ${
              isSelected("loan") && "bg-[#ECF0FF]"
            }`}
            onClick={() => handleItemClick("loan")}
          >
            <img
              src={LoanImg}
              alt="Loan"
              className="w-[20vw] h-[8vh] mb-[0.2vh]"
            />
            <p className="text-sm font-semibold">대출</p>
          </div>
        </div>

        <div className="flex justify-between mt-[4vh] mb-[0.5vh]">
          <p className="text-xl font-semibold">서비스 이용 목적</p>
        </div>

        <div className="flex justify-around mt-[2vh]">
          <div
            className={`flex flex-col items-center cursor-pointer rounded-lg ${
              isPurposeSelected("info") && "bg-[#ECF0FF]"
            }`}
            onClick={() => handlePurposeClick("info")}
          >
            <img src={InfoImg} alt="Info" className="w-[20vw] h-[8vh]" />
            <p className="text-sm font-semibold">정보</p>
          </div>
          <div
            className={`flex flex-col items-center cursor-pointer rounded-lg ${
              isPurposeSelected("review") && "bg-[#ECF0FF]"
            }`}
            onClick={() => handlePurposeClick("review")}
          >
            <img src={ReviewImg} alt="Review" className="w-[20vw] h-[8vh]" />
            <p className="text-sm font-semibold">리뷰</p>
          </div>
          <div
            className={`flex flex-col items-center cursor-pointer rounded-lg ${
              isPurposeSelected("fun") && "bg-[#ECF0FF]"
            }`}
            onClick={() => handlePurposeClick("fun")}
          >
            <img src={RocketImg} alt="Rocket" className="w-[20vw] h-[8vh]" />
            <p className="text-sm font-semibold">재미</p>
          </div>
        </div>
      </div>

      <div className="fixed w-full px-[8vw] bottom-[3vh]">
        <div className="flex justify-center mb-[3vh]">
          <img src={MiniCircleImg} alt="Mini Circle" className="w-3 h-3 mr-5" />
          <img src={MiniCircleImg} alt="Mini Circle" className="w-3 h-3 mr-5" />
          <img src={MiniCircleImg} alt="Mini Circle" className="w-3 h-3 mr-5" />
          <img
            src={MiniCircleImg}
            alt="Mini Circle"
            className="w-3 h-3"
            style={{
              filter:
                "invert(64%) sepia(69%) saturate(4107%) hue-rotate(206deg) brightness(100%) contrast(102%)",
            }}
          />
        </div>
        <PurpleBtn to="/signup/success" label="성향 분석 완료하기" />
      </div>
    </>
  );
};

export default TendencyAnalysisPage;

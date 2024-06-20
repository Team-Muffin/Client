import React from "react";
import CreditImg from "../../assets/credit.svg";

interface CreditProps {
  showCreditTip: boolean;
  handleCreditTipClick: () => void;
}

const Credit: React.FC<CreditProps> = ({
  showCreditTip,
  handleCreditTipClick,
}) => (
  <div className="flex flex-col px-[2vw] py-[2vh] justify-center items-center mt-[5vh]">
    <div
      className="bg-[#EDF0FF] p-[3vw] rounded-lg shadow-md"
      style={{ width: "80%" }}
    >
      <div className="flex items-center">
        <img src={CreditImg} alt="credit" className="w-[20vw] h-[12vh]" />
        <div className="ml-[2vw]">
          <p className="text-base font-semibold text-gray-800">나의 Credit</p>
          <p className="text-2xl font-bold text-gray-700">10🪙</p>
          <button className="bg-[white] text-[#748BFF] text-sm font-normal py-[0.5vh] px-[2vw] rounded-lg shadow-md mt-[1vh] mr-[2vw]">
            환전하기
          </button>
          <button
            className={`${
              showCreditTip
                ? "bg-[#748BFF] text-white"
                : "bg-[white] text-[#748BFF]"
            } text-sm font-normal py-[0.5vh] px-[2vw] rounded-lg shadow-md mt-[1vh]`}
            onClick={handleCreditTipClick}
          >
            Credit Tip ❓
          </button>
        </div>
      </div>
      {showCreditTip && (
        <div className="mt-[2vh] p-[2vw] bg-white rounded-lg shadow-md">
          <ul className="list-disc list-inside text-base">
            <li>핀 작성하기</li>
            <li>챌린지 참여하여 성공하기</li>
            <li>포트폴리오로 구독권 판매하기</li>
            <li>기업 상품 구매하기</li>
          </ul>
        </div>
      )}
    </div>
  </div>
);

export default Credit;

import React from "react";
import { Link } from "react-router-dom";
import SmallLogoImg from "../../assets/small-profile.svg";
import DateImg from "../../assets/date.svg";
import CheckImg from "../../assets/check.svg";
import DetailImg from "../../assets/detail-description.svg";

interface ChallengeProps {
  title: string;
  status: string;
  description: string;
  dateRange: string;
  participants: number;
  image: string;
}

const Challenge: React.FC<ChallengeProps> = ({
  title,
  status,
  description,
  dateRange,
  participants,
  image,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <img src={image} className="w-[18vw] h-[12vh]" alt="Challenge Image" />
      </div>

      <p className="text-xs text-[#748BFF] bg-[#ECF0FF] rounded-xl shadow mb-[1vh] py-[0.5vh] px-[2vw]">
        {status}
      </p>
      <p className="mb-[2vh] text-lg font-black text-black">{title}</p>

      <div className="w-[80vw] px-[5.5vw] py-[2vh] rounded-xl flex flex-col items-center bg-[#F4F3F8]">
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-center pl-[5vw]">
            <img
              src={DateImg}
              width={"20vw"}
              height={"20vh"}
              alt="Date"
              style={{ marginBottom: "1vh" }}
            />
            <img
              src={SmallLogoImg}
              width={"20vw"}
              height={"20vh"}
              alt="Small Logo"
              style={{ marginBottom: "0.5vh" }}
            />
            <img src={CheckImg} width={"20vw"} height={"20vh"} alt="Check" />
          </div>
          <div className="flex flex-col pr-[5vw]">
            <p className="items-center text-xs font-semibold text-black-900 dark:text-black my-[0.5vh]">
              {dateRange}
            </p>
            <p className="text-xs font-semibold text-black-900 dark:text-black my-[0.5vh]">
              {participants}명 참여
            </p>
            <p className="text-xs font-semibold text-black-900 dark:text-black mt-[0.5vh]">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-[2vh]">
        <Link
          to="/challenge/cal"
          className="text-base font-semibold text-[#748BFF] bg-[#ECF0FF] rounded-3xl shadow py-[0.5vh] px-[10vw]"
        >
          참여하기
        </Link>
      </div>
      <div className="w-full h-[2vh] bg-[#F4F3F8] mt-[2vh] mb-[2vh]"></div>

      <div className="flex items-center">
        <img src={DetailImg} alt="Detail Description" />
      </div>
    </div>
  );
};

export default Challenge;

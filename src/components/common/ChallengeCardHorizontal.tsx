import React from "react";
import Coin from "../../assets/coin.svg";
import { useNavigate } from "react-router-dom";

interface Challenge {
  title: string;
  description: string;
  participants: number;
  bgColor: string;
  ChallengeLogo: string;
  reward: number;
  link?: string;
}

const ChallengeCardHorizontal: React.FC<Challenge> = ({
  title,
  description,
  participants,
  bgColor,
  ChallengeLogo,
  reward,
  link,
}) => {
  const navigate = useNavigate();

  const clickChallengeCard = () => {
    if (link) navigate(link);
  };
  return (
    <div
      className="min-w-[37vw] p-[1vh] rounded-[1.5rem] shadow-productCard mb-[2vh]"
      style={{ backgroundColor: bgColor }}
      onClick={clickChallengeCard}
    >
      <div className="flex pt-[0.5vh] items-center ml-[1vh]">
        <img
          src={ChallengeLogo}
          className="h-[10vh] mr-[2vh] w-[15vw]"
          alt="Challenge Logo"
        />
        <div >
          <div className="flex items-center">
            <img src={Coin} className="h-[2vh] mr-[0.5vh]" />
            <span className="text-[0.8rem] text-C333333">{reward} </span>
          </div>
          <p className="text-[1rem] font-medium mt-[0.2vh]">{title}</p>
          <p className="mt-[0.2vh] text-C333333 text-[0.8rem] whitespace-normal leading-tight">
            {description}
          </p>
          <p className="text-C333333 text-[0.75rem] mt-[0.5vh]">
            참여자 {participants}명
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCardHorizontal;

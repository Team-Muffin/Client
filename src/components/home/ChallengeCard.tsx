import React from "react";

interface Challenge {
  title: string;
  description: string;
  participants: number;
  bgColor: string;
  ChallengeLogo: string;
}

const ChallengeCard: React.FC<Challenge> = ({
  title,
  description,
  participants,
  bgColor,
  ChallengeLogo,
}) => {
  return (
    <div
      className="min-w-[37vw] p-[2vh] rounded-[1.5rem] mr-[4vw]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex justify-center pb-[2vh] pt-[0.5vh]">
        <img src={ChallengeLogo} className="h-[10vh]" alt="Challenge Logo" />
      </div>
      <p className="text-[1rem] font-medium">{title}</p>
      <p className="mt-[0.5vh] text-C333333 text-[0.8rem] whitespace-normal leading-tight">
        {description}
      </p>
      <p className="text-C333333 text-[0.75rem] mt-[0.5vh]">
        참여자 {participants}명
      </p>
    </div>
  );
};

export default ChallengeCard;

import React from "react";
import { Challenge } from "../../libs/apis/user";
import ChallengeCardHorizontal from "../common/ChallengeCardHorizontal";
import { getChallengeBgColor } from "../../utils/challengeUtil";

interface ChallengeListProps {
  challenges: Challenge[];
}

const ChallengeList: React.FC<ChallengeListProps> = ({ challenges }) => {
    return (
        <div className="mt-[2vh] overflow-y-scroll">
        {challenges.map((challenge, index) => (
          <div key={index}>
            <ChallengeCardHorizontal
              key={challenge.challengeId}
              title={challenge.name}
              description={challenge.description}
              participants={challenge.participants}
              bgColor={getChallengeBgColor(challenge.challengeId)}
              ChallengeLogo={challenge.logoUrl}
              reward={30}
              id={challenge.challengeId}
            />
          </div>
        ))}
      </div>
    );
};
  



export default ChallengeList;

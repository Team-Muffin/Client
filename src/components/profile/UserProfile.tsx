import React from "react";
import { Link } from "react-router-dom";
import MyChallengeImg from "../../assets/challenge-count.svg";
import CheckedImg from "../../assets/checked.svg";

interface UserProfileProps {
  isFollowing: boolean;
  handleFollowButtonClick: () => void;
  nickname: string;
  tofinId: string;
  job: string;
  ageRange: number;
}

const UserProfile: React.FC<UserProfileProps> = ({
  isFollowing,
  handleFollowButtonClick,
  nickname,
  tofinId,
  job,
  ageRange,
}) => (
  <div className="flex flex-col items-center">
    <div className="flex justify-center gap-[8vw] items-center">
      <Link to="/challenge/detail/stampboard">
        <img src={MyChallengeImg} alt="My Challenge" style={{width: "18vw"}} />
      </Link>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center">
          <p className="text-2xl ">{nickname}</p>
          <img src={CheckedImg} alt="Checked" />
        </div>
        <p className="text-sm mr-[1vw] mb-[0.3vh]">@{tofinId}</p>
        <p className="text-xs text-[#748BFF]">{ageRange}대 {job}</p>
      </div>
      <button
        className="text-base font-normal text-[#748BFF] bg-[#ECF0FF] rounded-2xl shadow my-[2vh] px-[2vw]"
        onClick={handleFollowButtonClick}
      >
        {isFollowing ? "팔로잉" : "팔로우"}
      </button>
    </div>
  </div>
);

export default UserProfile;

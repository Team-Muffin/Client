import React from "react";
import { Link } from "react-router-dom";
import MyChallengeImg from "../../assets/challenge-count.svg";
import CheckedImg from "../../assets/checked.svg";

interface UserProfileProps {
  isFollowing: boolean;
  handleFollowButtonClick: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  isFollowing,
  handleFollowButtonClick,
}) => (
  <div className="flex justify-center gap-[9vw] items-center">
    <Link to="/challenge/detail/stampboard">
      <img src={MyChallengeImg} alt="My Challenge" />
    </Link>
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <p className="text-2xl mr-[2vw]">홍길동</p>
        <img src={CheckedImg} alt="Checked" />
      </div>
      <p className="text-base mr-[2vw] mb-[0.3vh]">@gildong</p>
      <p className="text-xs text-[#748BFF]">30대 백수</p>
    </div>
    <button
      className="text-base font-semibold text-[#748BFF] bg-[#ECF0FF] rounded-3xl shadow my-[2vh] px-[5vw]"
      onClick={handleFollowButtonClick}
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </button>
  </div>
);

export default UserProfile;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileCircleImg from "../../assets/myprofile.svg";

interface UserStatsProps {
  followers: number;
  followings: number;
  profileImage: string;
}

const UserStats: React.FC<UserStatsProps> = ({
  followers,
  followings,
  profileImage,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  const goToFollowers = () => {
    navigate(`/userProfile/follower?userId=${userId}`);
  };

  const goToFollowing = () => {
    navigate(`/userProfile/following?userId=${userId}`);
  };

  return (
    <div className="relative flex justify-center gap-[7vw]">
      <div
        className="flex flex-col items-center mt-[3vh]"
        onClick={goToFollowers}
      >
        <p className="text-base">팔로워</p>
        <p className="text-xl font-semibold">{followers}</p>
      </div>
      <div className="relative">
        <img src={ProfileCircleImg} alt="Profile Circle" className="w-[35vw]" />
        <img
          src={profileImage}
          alt="Profile"
          className="w-[25vw] h-[25vw] rounded-full absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
        />
      </div>
      <div
        className="flex flex-col items-center mt-[3vh]"
        onClick={goToFollowing}
      >
        <p className="text-base">팔로잉</p>
        <p className="text-xl font-semibold">{followings}</p>
      </div>
    </div>
  );
};

export default UserStats;

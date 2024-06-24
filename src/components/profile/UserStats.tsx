import React from "react";
import ProfileCircleImg from "../../assets/myprofile.svg";

interface UserStatsProps {
  followers: number;
  followings: number;
  profileImage: string;
}

const UserStats: React.FC<UserStatsProps> = ({ followers, followings, profileImage }) => (
  <div className="relative flex justify-center gap-[7vw]">
    <div className="flex flex-col items-center mt-[3vh]">
      <p className="text-base">팔로워</p>
      <p className="text-xl font-bold">{followers}</p>
    </div>
    <div className="relative">
      <img src={ProfileCircleImg} alt="Profile Circle" className="w-[35vw]" />
      <img
        src={profileImage}
        alt="Profile"
        className="w-[25vw] h-[25vw] rounded-full absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
      />
    </div>
    <div className="flex flex-col items-center mt-[3vh]">
      <p className="text-base">팔로우</p>
      <p className="text-xl font-bold">{followings}</p>
    </div>
  </div>
);

export default UserStats;

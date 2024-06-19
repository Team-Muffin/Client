import React from "react";
import ProfileCircleImg from "../../assets/myprofile.svg";

const UserStats: React.FC = () => (
  <div className="flex justify-center gap-[7vw]">
    <div className="flex flex-col items-center mt-[3vh]">
      <p className="text-base">팔로워</p>
      <p className="text-xl font-bold">10K</p>
    </div>
    <img src={ProfileCircleImg} alt="Profile Circle" className="w-[35vw]" />
    <div className="flex flex-col items-center mt-[3vh]">
      <p className="text-base">팔로우</p>
      <p className="text-xl font-bold">10</p>
    </div>
  </div>
);

export default UserStats;

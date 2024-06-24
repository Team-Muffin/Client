import React from "react";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  profileImage: string;
  nickname: string;
  tofinId: string;
  userId: number;
}

const UserCard: React.FC<UserCardProps> = ({
  profileImage,
  nickname,
  tofinId,
  userId,
}) => {
  const navigate = useNavigate();
  const handleUserCardClick = () => {
    navigate(`/userProfile?id=${userId}`);
  };
  return (
    <div>
      <div
        className="shadow-productCard rounded-[0.5rem] mt-[1.5vh] mb-[0.5vh]"
        onClick={handleUserCardClick}
      >
        <div className="flex p-[1vh] items-center">
          <div className="flex items-center justify-center">
            <img
              className="h-[6vh] w-[6vh] rounded-[0.8rem]"
              src={profileImage}
            />
          </div>
          <div className="pl-[1vh]">
            <p className="text-C333333 text-[0.98rem]">{nickname}</p>
            <p className="text-C333333 text-[0.8rem]">{tofinId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

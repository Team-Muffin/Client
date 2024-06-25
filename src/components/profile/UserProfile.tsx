import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MyChallengeImg from "../../assets/challenge-count.svg";
import CheckedImg from "../../assets/checked.svg";
import { fetchFollowStatus, followUser } from "../../libs/apis/board";
import useAuth2Store from "../../store/useAuth2Store";
import { useSearchParams } from "react-router-dom";

interface UserProfileProps {
  isFollowing: boolean;
  handleFollowButtonClick: (newState: boolean) => void;
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
}) => {
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingsCount, setFollowingsCount] = useState<number>(0);

  const myId = useAuth2Store((state) => state.id);
  const [searchParams] = useSearchParams();
  const profileUserId = parseInt(searchParams.get("id") || "", 10);

  useEffect(() => {
    // Fetch initial follow status when component mounts
    updateFollowStatus();
  }, []);

  const updateFollowStatus = async () => {
    try {
      const response = await fetchFollowStatus(profileUserId);
      const { data } = response.data;
      setFollowersCount(data.followers);
      setFollowingsCount(data.followings);
      // Update the follow state in the component
      handleFollowButtonClick(data.isFollow);
    } catch (error) {
      console.error("팔로우 상태 가져오기 실패:", error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        // Unfollow logic
        // Assuming you handle unfollowing on the backend, adjust accordingly
        handleFollowButtonClick(false); // Toggle the follow state to false
      } else {
        // Follow logic
        await followUser(profileUserId); // Use otherId here
        handleFollowButtonClick(true); // Toggle the follow state to true
      }
    } catch (error) {
      console.error("팔로우 토글 실패:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-[8vw] items-center">
        <Link to="/challenge/detail/badgeboard">
          <img
            src={MyChallengeImg}
            alt="My Challenge"
            style={{ width: "18vw" }}
          />
        </Link>
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center">
            <p className="text-2xl">{nickname}</p>
            <img src={CheckedImg} alt="Checked" />
          </div>
          <p className="text-sm mr-[1vw] mb-[0.3vh]">@{tofinId}</p>
          <p className="text-xs text-[#748BFF]">
            {ageRange}대 {job}
          </p>
        </div>
        {/* <div className="text-base font-normal text-[#748BFF] bg-[#ECF0FF] rounded-2xl shadow my-[2vh] px-[2vw]">
          팔로잉
        </div> */}
        {myId !== profileUserId ? (
          isFollowing ? (
            <button
              className="text-base font-normal text-[#748BFF] bg-[#ECF0FF] rounded-2xl shadow my-[2vh] px-[2vw]"
              onClick={handleFollowToggle}
            >
              팔로잉
            </button>
          ) : (
            <button
              className="text-base font-normal text-white bg-[#748BFF] rounded-2xl shadow my-[2vh] px-[2vw]"
              onClick={handleFollowToggle}
            >
              팔로우
            </button>
          )
        ) : (
          <button
            className="text-base font-normal text-[#748BFF] bg-[#ECF0FF] rounded-2xl shadow my-[2vh] px-[8vw]"
            onClick={handleFollowToggle}
          ></button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

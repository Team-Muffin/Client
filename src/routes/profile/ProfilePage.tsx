import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import UserStats from "../../components/profile/UserStats";
import UserProfile from "../../components/profile/UserProfile";
import CategoryTabs from "../../components/common/CategoryTabs";
import Portfolio from "../../components/profile/Portfolio";
import Credit from "../../components/profile/Credit";
import PurpleBtn from "../../components/common/PurpleBtn";
import Modal from "../../components/common/Modal";
import { getUserDetails, UserDetailsResponse, getFollowers, FollowersReq } from "../../libs/apis/user";
import { getPortfolio, PortfolioResponse } from "../../libs/apis/user";

const ProfilePage: React.FC = () => {
  const [userCategory, setUserCategory] = useState<string>("게시물");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [showCreditTip, setShowCreditTip] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDetailsResponse["data"] | null>(null);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const otherId = parseInt(searchParams.get("id") || "", 10);

  const [selectedFollowerId, setSelectedFollowerId] = useState<number | null>(null);
  const [followers, setFollowers] = useState<FollowersReq[]>([]);
  const [portfolioDetails, setPortfolioDetails] = useState<PortfolioResponse["data"]["details"] | null>(null);

  useEffect(() => {
    if (userId) {
      getUserDetails(parseInt(userId)).then((response) => {
        setUserData(response.data);
      }).catch((error) => {
        console.error("유저 상세 정보 조회 중 오류 발생", error);
      });

      fetchFollowers(parseInt(userId));
      fetchPortfolioData(otherId);
    }
  }, [userId, otherId]);

  const categories: string[] = [
    "게시물",
    "챌린지",
    "포트폴리오",
    "보유상품",
    "크레딧",
  ];

  const handleUserCategoryClick = (selection: string) => {
    setUserCategory(selection);
  };

  const handleFollowButtonClick = (newState: boolean) => {
    setIsFollowing(newState);
  };

  const handleCreditTipClick = () => {
    setShowCreditTip((prevState) => !prevState);
  };

  const fetchFollowers = async (userId: number) => {
    try {
      const response = await getFollowers(userId);
      if (response.success) {
        setFollowers(response.data);
      } else {
        console.error("팔로워 조회 실패:", response.message);
      }
    } catch (error) {
      console.error("팔로워 조회 중 오류 발생", error);
    }
  };

  const fetchPortfolioData = async (otherId:number) => {
    try {
      const response = await getPortfolio(otherId);
      if (response.success) {
        setPortfolioDetails(response.data.details);
      } else {
        console.error("포트폴리오 데이터 조회 실패:", response.message);
      }
    } catch (error) {
      console.error("포트폴리오 데이터 조회 중 오류 발생", error);
    }
  };

  const openFollowerModal = (followerId: number) => {
    setSelectedFollowerId(followerId);
  };

  const closeFollowerModal = () => {
    setSelectedFollowerId(null);
  };

  return (
    <>
      <div className="py-[2vh] px-[4.5vw]">
        <Header text="마이페이지" type="backLeftTextCenterSettingRight" />
        <div className="mt-[5.5vh]" />
        {userData && (
          <>
            <UserStats
              followers={userData.followers}
              followings={userData.followings}
              profileImage={userData.profileImage}
            />
            <UserProfile
              isFollowing={isFollowing}
              handleFollowButtonClick={handleFollowButtonClick}
              nickname={userData.nickname}
              tofinId={userData.tofinId}
              job={userData.job}
              ageRange={userData.ageRange}
            />
          </>
        )}
      </div>
      <div className="w-full h-[2vh] bg-[#F4F3F8] mb-[2vh]" />
      <CategoryTabs
        categories={categories}
        userCategory={userCategory}
        handleUserCategoryClick={handleUserCategoryClick}
      />
      {userCategory === "포트폴리오" && (
        <Portfolio portfolioDetails={portfolioDetails} />
      )}
      {userCategory === "크레딧" && (
        <Credit
          showCreditTip={showCreditTip}
          handleCreditTipClick={handleCreditTipClick}
        />
      )}
      
      <Navbar />


      {selectedFollowerId !== null && (
        <Modal onClose={closeFollowerModal}>
          <div className="p-4">
            <p className="text-lg font-semibold">
              Details of Follower ID: {selectedFollowerId}
            </p>
            {followers.map((follower) => (
              <div key={follower.id} className="mb-4">
                <p>{follower.nickname}</p>
                <img src={follower.profileImage} alt={follower.nickname} className="w-16 h-16 rounded-full" />
              </div>
            ))}
            <PurpleBtn label="Close" onClick={closeFollowerModal} />
          </div>
        </Modal>
      )}
      <div className="pb-[6vh]" />
    </>
  );
};

export default ProfilePage;

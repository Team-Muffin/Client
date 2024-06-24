import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import UserStats from "../../components/profile/UserStats";
import UserProfile from "../../components/profile/UserProfile";
import CategoryTabs from "../../components/common/CategoryTabs";
import Portfolio from "../../components/profile/Portfolio";
import Credit from "../../components/profile/Credit";
import PurpleBtn from "../../components/common/PurpleBtn"; // Assuming PurpleBtn for modal close
import Modal from "../../components/common/Modal";
import { getUserDetails, UserDetailsResponse, getFollowers, FollowersReq } from "../../libs/apis/user";

const ProfilePage = () => {
  const [userCategory, setUserCategory] = useState<string>("게시물");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [showCreditTip, setShowCreditTip] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDetailsResponse["data"] | null>(null);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  // State for managing modal and followers
  const [selectedFollowerId, setSelectedFollowerId] = useState<number | null>(null);
  const [followers, setFollowers] = useState<FollowersReq[]>([]);

  useEffect(() => {
    if (userId) {
      getUserDetails(parseInt(userId)).then((response) => {
        setUserData(response.data);
      }).catch((error) => {
        console.error("유저 상세 정보 조회 중 오류 발생", error);
      });

      // Fetch initial followers
      fetchFollowers(parseInt(userId));
    }
  }, [userId]);

  const categories: string[] = [
    "게시물",
    "챌린지",
    "포트폴리오",
    "보유상품",
    "크레딧",
  ];

  const pieChartData = [
    { id: "stylus", label: "stylus", value: 276, color: "hsl(219, 70%, 50%)" },
    { id: "sass", label: "sass", value: 85, color: "hsl(243, 70%, 50%)" },
    { id: "c", label: "c", value: 430, color: "hsl(164, 70%, 50%)" },
    { id: "ruby", label: "ruby", value: 98, color: "hsl(103, 70%, 50%)" },
    { id: "php", label: "php", value: 29, color: "hsl(314, 70%, 50%)" },
  ];

  const barChartData = [{ id: "networth", 입출금: 10, 저축: 37, 투자: 53 }];

  const handleUserCategoryClick = (selection: string) => {
    setUserCategory(selection);
  };

  const handleFollowButtonClick = () => {
    setIsFollowing((prevState) => !prevState);
  };

  const handleCreditTipClick = () => {
    setShowCreditTip((prevState) => !prevState);
  };

  // Function to fetch followers
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

  // Function to open modal for selected follower
  const openFollowerModal = (followerId: number) => {
    setSelectedFollowerId(followerId);
  };

  // Function to close modal
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
        <Portfolio barChartData={barChartData} pieChartData={pieChartData} />
      )}
      {userCategory === "크레딧" && (
        <Credit
          showCreditTip={showCreditTip}
          handleCreditTipClick={handleCreditTipClick}
        />
      )}
      <Navbar />

      {/* Modal for selected follower */}
      {selectedFollowerId !== null && (
        <Modal onClose={closeFollowerModal}>
          <div className="p-4">
            <p className="text-lg font-semibold">
              Details of Follower ID: {selectedFollowerId}
            </p>
            {/* Replace with actual follower details rendering */}
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
    </>
  );
};

export default ProfilePage;

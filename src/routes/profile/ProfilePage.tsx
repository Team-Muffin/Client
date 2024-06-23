import { useState } from "react";
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import UserStats from "../../components/profile/UserStats";
import UserProfile from "../../components/profile/UserProfile";
import CategoryTabs from "../../components/common/CategoryTabs";
import Portfolio from "../../components/profile/Portfolio";
import Credit from "../../components/profile/Credit";

const ProfilePage = () => {
  const [userCategory, setUserCategory] = useState<string>("게시물");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [showCreditTip, setShowCreditTip] = useState<boolean>(false);

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

  return (
    <>
      <div className="py-[2vh] px-[4.5vw]">
        <Header text="마이페이지" type="backLeftTextCenterSettingRight" />
        <div className="mt-[5.5vh]" />
        <UserStats />
        <UserProfile
          isFollowing={isFollowing}
          handleFollowButtonClick={handleFollowButtonClick}
        />
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
    </>
  );
};

export default ProfilePage;

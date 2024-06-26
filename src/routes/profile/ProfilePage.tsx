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

import BoardCard from "../../components/common/BoardCard"; // BoardCard 컴포넌트 import
import { getUserDetails, UserDetailsResponse, getFollowers, FollowersReq , getMyChallenge, getMyEndChallenge } from "../../libs/apis/user";
import { getPortfolio, PortfolioResponse, Challenge,subscribePortfolio } from "../../libs/apis/user"; // 포트폴리오 구독 및 게시물 목록 API import
import { fetchUserBoardList, BoardData, FetchUserBoardListParams } from "../../libs/apis/user";
import ChallengeList from "../../components/profile/Challenge";



const ProfilePage: React.FC = () => {
  const [userCategory, setUserCategory] = useState<string>("핀");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [showCreditTip, setShowCreditTip] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDetailsResponse["data"] | null>(null);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const otherId = parseInt(searchParams.get("id") || "", 10);

  const [selectedFollowerId, setSelectedFollowerId] = useState<number | null>(null);
  const [followers, setFollowers] = useState<FollowersReq[]>([]);
  const [portfolioDetails, setPortfolioDetails] = useState<PortfolioResponse["data"]["details"] | null>(null);
  const [portfolioAbstracts, setPortfolioAbstracts] = useState<PortfolioResponse["data"]["abstracts"] | null>(null);
  const [portfolioError, setPortfolioError] = useState<string | null>(null); // State to track portfolio fetch error

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false); // State to track if the portfolio is subscribed
  const [boardList, setBoardList] = useState<BoardData[]>([]); // 게시물 목록 상태 추가

  const [challengeList, setChallengeList] = useState<Challenge[]>([]);
  const[endChallengeList, setEndChallengeList] = useState<Challenge[]>([]);


  useEffect(() => {
    if (userId) {
      getUserDetails(parseInt(userId))
        .then((response) => {
          setUserData(response.data);
          setIsFollowing(response.data.isFollow); // Set follow state from user data
        })
        .catch((error) => {
          console.error("유저 상세 정보 조회 중 오류 발생", error);
        });

      fetchFollowers(parseInt(userId));
      fetchPortfolioData(otherId);
      fetchMyChallenge(parseInt(userId));
      fetchMyEndChallenge(parseInt(userId));
    }
  }, [userId, otherId]);

  useEffect(() => {
    if (userCategory === "핀") {
      fetchBoardListData(); // 핀 카테고리를 선택하면 게시물 목록을 가져옵니다.
    }
  }, [userCategory]);

  const categories: string[] = userData?.role === "CORP" 
    ? ["핀", "챌린지"]
    : ["핀", "챌린지", "포트폴리오", "크레딧"];

  const handleUserCategoryClick = (selection: string) => {
    setUserCategory(selection);
  };

  const handleFollowButtonClick = (newState: boolean) => {
    setIsFollowing(newState);
  };

  const handleCreditTipClick = async () => {
    setShowCreditTip(false); // Close credit tip after clicking

    try {
      const response = await subscribePortfolio(otherId);
      if (response.success) {
        // If successfully subscribed, refetch portfolio data
        setIsSubscribed(true);
        fetchPortfolioData(otherId);
      } else {
        console.error("포트폴리오 구독 실패:", response.message);
        // Handle failure scenario
      }
    } catch (error) {
      console.error("포트폴리오 구독 중 오류 발생", error);
      // Handle error scenario
    }
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

  const fetchPortfolioData = async (otherId: number) => {
    try {
      const response = await getPortfolio(otherId);
      if (response.success) {
        setPortfolioDetails(response.data.details);
        setPortfolioAbstracts(response.data.abstracts);
        setPortfolioError(null); // Reset error state if successful
        setIsSubscribed(true); // Set as subscribed if successful
      } else {
        setPortfolioError(response.message); // Set error message if not successful
        setIsSubscribed(false); // Set as not subscribed if not successful
      }
    } catch (error) {
      console.error("포트폴리오 데이터 조회 중 오류 발생", error);
      setPortfolioError("포트폴리오 데이터 조회 중 오류 발생");
      setIsSubscribed(false); // Set as not subscribed if error occurs
    }
  };

  const fetchBoardListData = async () => {
    try {
      const params: FetchUserBoardListParams = { keyword: "", pageNo: 0, size: 10 };
      if (userId) {
        params.userId = parseInt(userId);
      }
      const response = await fetchUserBoardList(params);
      if (response.data) {
        setBoardList(response.data);
      } else {
        console.error("게시물 목록 조회 실패");
      }
    } catch (error) {
      console.error("게시물 목록 조회 중 오류 발생", error);
    }
  };

  const fetchMyChallenge = async(userId: number)=>{
    try {
      const response = await getMyChallenge(userId);
      console.log("데이터당!!!!!", response)
      if (response.message) {
        console.log("성공이욤")
        setChallengeList(response.data);
        console.log("저장된 데이터!!", challengeList);
      } else {
        console.error("참여중인 챌린지 조회 실패:", response.message);
      }
    } catch (error) {
      console.error("참여중인 챌린지 조회 중 오류 발생", error);
    }
  }

  const fetchMyEndChallenge = async(userId: number)=>{
    try {
      const response = await getMyEndChallenge(userId);
      console.log("데이터당!!!!!", response)
      if (response.message) {
        console.log("성공이욤")
        setEndChallengeList(response.data);
        console.log("저장된 데이터!!", challengeList);
      } else {
        console.error("참여중인 챌린지 조회 실패:", response.message);
      }
    } catch (error) {
      console.error("참여중인 챌린지 조회 중 오류 발생", error);
    }
  }


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
              role={userData.role} // role 속성 추가
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
      {userCategory === "챌린지" && (
        <>
        <div className="relative px-[8vw] py-[3vh] bg-white">
        <div className="flex justify-between">
          <p className="text-base font-bold text-black-900">참여중인 챌린지</p>
        </div>
        {challengeList.length>0?(
          <ChallengeList challenges={challengeList}/>
        ):(
          <div className="flex flex-col items-center py-[8vh] px-[6vw] bg-white rounded">
          <p className="text-lg font-semibold mb-[3vh]">
            아직 참여한 챌린지가 없어요 <br /> &nbsp; 챌린지에 참여해보세요!
          </p>
        </div>
        )}
        </div>

        <div className="relative px-[8vw] py-[3vh] bg-white">
        <div className="flex justify-between">
          <p className="text-base font-bold text-black-900">참여했던 챌린지</p>
        </div>
        {challengeList.length>0?(
          <ChallengeList challenges={endChallengeList}/>
        ):(
          <div className="flex flex-col items-center py-[8vh] px-[6vw] bg-white rounded">
          <p className="text-lg font-semibold mb-[3vh]">
            아직 완료한 챌린지가 없어요!
          </p>
        </div>
        )}
        </div>
        </>
      )}
      
      {userCategory === "포트폴리오" && userData?.role === "FINFLUENCER" && (
        <>
          {(portfolioDetails || portfolioAbstracts) ? (
            <Portfolio portfolioDetails={portfolioDetails} />
          ) : (
            <div className="flex flex-col items-center py-[8vh] px-[6vw] bg-white rounded">
              <p className="text-lg font-semibold mb-[3vh]">
                포트폴리오를 확인하기 위해 <br /> &nbsp; 크레딧을 사용해보세요!
              </p>
              <button type="button" className="bg-[#748BFF] text-white p-[3vw] rounded-lg" onClick={handleCreditTipClick}>크레딧 사용해보기</button>
              {showCreditTip && (
                <Credit
                  showCreditTip={showCreditTip}
                  handleCreditTipClick={handleCreditTipClick}
                />
              )}
            </div>
          )}
        </>
      )}
      <div className="w-full">
        {userCategory === "핀" && (
          <div>
            {boardList.length > 0 ? (
              boardList.map((board) => (
                <div className="flex justify-between items-center my-[1.75vh] px-[5vw]" key={board.id}>
                  <BoardCard
                    title={board.title}
                    description={board.summary}
                    author={board.authorNickname}
                    time={board.createdTime}
                    heartCount={board.likeCount}
                    replyCount={board.commentCount}
                    imageUrl={board.thumbnail}
                    authorImageUrl={board.authorProfile}
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-between items-center py-[8vh] px-[6vw] bg-white rounded">
                <p className="text-lg items-center font-semibold mb-[3vh]">
                &nbsp; 작성한 게시물이 없어요. <br />  새로운 핀을 작성해주세요!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
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

            {/* Replace with actual follower details rendering */}
            {followers.map((follower, index) => (
              <div key={index} className="mb-4">
                <p>{follower.nickname}</p>
                <img
                  src={follower.profileImage}
                  alt={follower.nickname}
                  className="w-16 h-16 rounded-full"
                />
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

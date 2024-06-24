import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import ProductCard from "../../components/common/ProductCard";
import ChallengeCard from "../../components/home/ChallengeCard";
import BoardCardVertical from "../../components/home/BoardCardVertical";
import { fetchChallengeList, ChallengeList } from "../../libs/apis/home";
import { getChallengeBgColor } from "../../utils/challengeColorUtil";

export default function HomePage() {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [challengeListData, setChallengeListData] = useState<ChallengeList[]>(
    []
  );

  const callChallengeData = async () => {
    try {
      const { data } = await fetchChallengeList();
      setChallengeListData(data);
    } catch (error) {
      console.error("홈 챌린지 리스트 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callChallengeData();
    console.log(challengeListData);
  }, []);

  const data = [
    {
      id: 1,
      imageUrl:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202107/29/0a0a379f-05c8-4777-a071-b29abcf9f542.jpg",
      title: "⭐️️ 내가 들었던 펀드 추천 글 ⭐",
      summary: "오늘은 내가 들었던 펀드 중에 제일 좋았던 신한은행의 @@@ 펀드야",
      authorNickname: "이듀미",
      createdTime: 3,
      likeCount: 3,
      commentCount: 5,
    },
    {
      id: 1,
      imageUrl:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202107/29/0a0a379f-05c8-4777-a071-b29abcf9f542.jpg",
      title: "⭐️️ 내가 들었던 펀드 추천 글 ⭐",
      summary: "오늘은 내가 들었던 펀드 중에 제일 좋았던 신한은행의 @@@ 펀드야",
      authorNickname: "이듀미",
      createdTime: 3,
      likeCount: 3,
      commentCount: 5,
    },
  ];

  const handleSearchBtnClick = () => {
    navigate(`/search`, {
      state: { domain: "home" },
    });
  };

  const handleChallengeCardClick = (id: number) => {
    navigate(`/challenge/${id}`);
  };

  const handleNotificationBtnClick = () => {
    navigate("/notification");
  };

  const handleChallengeMoreBtnClick = () => {
    navigate("/challenge");
  };

  const challengeDescription = [
    "매일의 감정에 따라 저축해봐요!",
    "저렴한 재료로 맛있는 요리를 만들어봐요!",
    "유익한 금융 도서를 추천해 보세요!",
    "ESG 기업을 소개하고 공유해봐요!",
    "관심 기업을 분석하고 정보를 나눠요!",
  ];

  return (
    <>
      <div className="pt-[2vh] px-[4.5vw]">
        {/* 헤더랑 */}
        <Header
          type="logoLeftSearchAndAlarmRight"
          searchBtn={handleSearchBtnClick}
          notiBtn={handleNotificationBtnClick}
        />
        <div className="mt-[5.5vh]"></div>
        {/* 세트로 들고 다녀야 됨 */}
        <div className="flex justify-between items-center mb-[1.5vh]">
          <span className="font-semibold text-[1.2rem]">요즘 뜨는 챌린지 </span>{" "}
          <p
            className="text-[0.75rem] text-C333333 "
            onClick={handleChallengeMoreBtnClick}
          >
            더보기 {">"}
          </p>
        </div>

        {/* 챌린지 카드 컴포넌트  */}
        <div className="whitespace-nowrap overflow-x-auto flex scrollbar-hide">
          {challengeListData.map((challenge, index) => (
            <>
              <ChallengeCard
                title={challenge.name}
                description={challengeDescription[index]}
                participants={challenge.participation}
                bgColor={getChallengeBgColor(challenge.id)}
                ChallengeLogo={challenge.logoUrl}
              />
            </>
          ))}
        </div>

        <div className="flex justify-between items-center my-[1.5vh]">
          <span className="font-semibold text-[1.2rem]">맞춤 핀 </span>{" "}
        </div>

        <div>
          {data.map((data, index) => (
            <div key={index}>
              <BoardCardVertical
                title={data.title}
                description={data.summary}
                author={data.authorNickname}
                time={data.createdTime}
                heartCount={data.likeCount}
                replyCount={data.commentCount}
                imageUrl="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-business-men-icon-png-image_925963.jpg"
                // imageUrl={data.thumbnail}
                authorImageUrl="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-business-men-icon-png-image_925963.jpg"
                link={`board/${data.id}`}
              />
            </div>
          ))}
        </div>
        <hr />
        <div className="flex justify-between items-center mt-[1.5vh]">
          <span className="font-medium text-[1rem]">이런 상품은 어때요?</span>{" "}
        </div>
      </div>

      <div className="slider-container pb-[4vh] w-[85vw] m-auto 0">
        <Slider {...settings}>
          {/* <ProductCard
                type={1}
                productImg="{data.cardImage}"
                productName="{data.cardImage}"
                productBrand="{data.cardImage}"
                benefits=[]
                reviewCount=3
                link={`${data.id}`}
              />

<ProductCard
                type={1}
                productImg={data.cardImage}
                productName={data.name}
                productBrand={data.corpName}
                benefits={data.tags.slice(0, 2)}
                reviewCount={data.boardCount}
                link={`${data.id}`}
              />
          <ProductCard
                type={1}
                productImg={data.cardImage}
                productName={data.name}
                productBrand={data.corpName}
                benefits={data.tags.slice(0, 2)}
                reviewCount={data.boardCount}
                link={`${data.id}`}
              /> */}
        </Slider>
      </div>
      <hr />

      <div className="pb-[7.5vh]" />
      <Navbar />
    </>
  );
}

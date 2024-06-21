import React, { useState } from "react";
import Slider from "react-slick";
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import ProductCard from "../../components/common/ProductCard";
import ChallengeCard from "../../components/home/ChallengeCard";
import BoardCardVertical from "../../components/home/BoardCardVertical";

export default function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
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

  const challenges = [
    {
      bgColor: "#F9D1E3",
      title: "금융 도서 추천",
      description: "금융 도서를 타 유저에게 추천하세요",
      participants: 751,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-J0LYyB-YOa6R7T1D_SAo64qrJgWs_zhHUQ&s",
    },
    {
      bgColor: "#8DBDFF",
      title: "금융 도서 추천",
      description: "금융 도서를 타 유저에게 추천하세요",
      participants: 751,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-J0LYyB-YOa6R7T1D_SAo64qrJgWs_zhHUQ&s",
    },
    {
      bgColor: "#F8D560",
      title: "금융 도서 추천",
      description: "금융 도서를 타 유저에게 추천하세요",
      participants: 751,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-J0LYyB-YOa6R7T1D_SAo64qrJgWs_zhHUQ&s",
    },
  ];

  return (
    <>
      <div className="pt-[2vh] px-[4.5vw]">
        {/* 헤더랑 */}
        <Header type="logoLeftSearchAndAlarmRight" />
        <div className="mt-[5.5vh]"></div>
        {/* 세트로 들고 다녀야 됨 */}
        <div className="flex justify-between items-center mb-[1.5vh]">
          <span className="font-semibold text-[1.2rem]">요즘 뜨는 챌린지 </span>{" "}
          <p className="text-[0.75rem] text-C333333 ">더보기 {">"}</p>
        </div>

        {/* 챌린지 카드 컴포넌트 */}
        <div className="whitespace-nowrap overflow-x-auto flex scrollbar-hide">
          {challenges.map((challenge) => (
            <>
              <ChallengeCard
                title={challenge.title}
                description={challenge.description}
                participants={challenge.participants}
                bgColor={challenge.bgColor}
                ChallengeLogo={challenge.logo}
              />
            </>
          ))}
        </div>

        <div className="flex justify-between items-center my-[1.5vh]">
          <span className="font-semibold text-[1.2rem]">맞춤 핀 </span>{" "}
        </div>

        <div>
          {data.map((data) => (
            <>
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
            </>
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

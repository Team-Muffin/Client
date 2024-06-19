import React from "react";
import Slider from "react-slick";
import { useState } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import Heart from "../../assets/heart-empty.svg";
import Reply from "../../assets/reply.svg";
import character1_small from "../../assets/character1-small.svg";
import ChallengeLogo from "../../assets/coin30.svg";
import ProductCard from "../../components/ProductCard";

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
      content: "오늘은 내가 들었던 펀드 중에 제일 좋았던 신한은행의 @@@ 펀드야",
      author: "이듀미",
      createdAt: "3분전",
      likes: 3,
      replies: 5,
    },
    {
      id: 2,
      imageUrl:
        "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/135/bd671ac15bc9ef902fff7f0d6d2655c5_res.jpeg",
      title: "⭐️️ 내가 들었던 펀드 추천 글 ⭐",
      content: "오늘은 내가 들었던 펀드 중에 제일 좋았던 신한은행의 @@@ 펀드야",
      author: "이듀미",
      createdAt: "3분전",
      likes: 3,
      replies: 5,
    },
  ];

  const challenges = [
    {
      bgColor: "#F9D1E3",
      title: "금융 도서 추천",
      description: "금융 도서를 타 유저에게 추천하세요",
      participants: "참여자 751명",
    },
    {
      bgColor: "#8DBDFF",
      title: "금융 도서 추천하기",
      description: "금융 도서를 타 유저에게 추천하세요",
      participants: "참여자 751명",
    },
    {
      bgColor: "#F8D560",
      title: "금융 도서 추천하기",
      description: "금융 도서를 타 유저에게 추천하세요",
      participants: "참여자 751명",
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
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className={`min-w-[37vw] p-[2vh] rounded-[1.5rem] mr-[4vw]`}
              style={{ backgroundColor: challenge.bgColor }}
            >
              <div className="flex justify-center pb-[2vh] pt-[0.5vh]">
                <img src={ChallengeLogo} className="h-[10vh]" />
              </div>
              <p className="text-[1rem] font-medium">{challenge.title}</p>
              <p className="mt-[0.5vh] text-C333333 text-[0.8rem] whitespace-normal leading-tight">
                {challenge.description}
              </p>
              <p className="text-C333333 text-[0.75rem] mt-[0.5vh]">
                {challenge.participants}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center my-[1.5vh]">
          <span className="font-semibold text-[1.2rem]">맞춤 핀 </span>{" "}
        </div>

        <div>
          {data.map((item) => (
            <>
              <hr />
              <div
                key={item.id}
                className="max-w-sm m-auto bg-white rounded-lg shadow-default "
              >
                <Link to={`/`}>
                  <div className="my-[1.75vh]">
                    <img
                      className="rounded-t-lg w-full h-[20vh]"
                      src={item.imageUrl}
                      alt=""
                    />

                    <div className="flex justify-between items-center ">
                      <div className="px-[2.5vw] mr-[0.8vw] mt-[1.5vh] ">
                        <p className="text-[1.1rem] text-C333333 font-medium">
                          {item.title}
                        </p>
                        <p className="leading-tight text-[0.9rem] text-C333333 line-clamp-1 mt-[0.25vh]">
                          {item.content}
                        </p>
                        <div className="flex items-center mt-[0.5vh] mb-[1.5vh] justify-between">
                          <div className="flex">
                            <img
                              src={character1_small}
                              className="w-[4.5vw] mr-[1vw]"
                            />
                            <p className="text-[0.85rem] text-C333333">
                              {item.author} | {item.createdAt}
                            </p>
                          </div>
                          <div className="flex ">
                            <img
                              src={Heart}
                              className="w-[1.5vh] mr-[0.5vw] text-C333333"
                            ></img>
                            <p className="text-[0.85rem] mr-[1.2vw] text-C333333">
                              {item.likes}
                            </p>
                            <img
                              src={Reply}
                              className="w-[1.5vh] mr-[0.5vw] text-C333333"
                            ></img>
                            <p className="text-[0.85rem] text-C333333">
                              {item.replies}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
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
          <ProductCard
            cardName="신한카드 Mr.Life"
            cardBrand="신한카드"
            benefits={["#연회비 지원", "#관리비"]}
            reviewCount={530}
            link="/productDetail"
          />

          <ProductCard
            cardName="신한카드 Mr.Life"
            cardBrand="신한카드"
            benefits={["#연회비 지원", "#관리비"]}
            reviewCount={530}
            link="/productDetail"
          />
          <ProductCard
            cardName="신한카드 Mr.Life"
            cardBrand="신한카드"
            benefits={["#연회비 지원", "#관리비"]}
            reviewCount={530}
            link="/productDetail"
          />
        </Slider>
      </div>
      <hr />

      <div className="pb-[7.5vh]" />
      <Navbar />
    </>
  );
}

import React from "react";
import Header from "../../components/common/Header";
import Challenge from "../../components/challenge/Challenge";
import SaveKingImg from "../../assets/save-king.svg"; // 감정 저축 챌린지 이미지
import EcoKingImg from "../../assets/eco-king.svg"; // ESG투자 챌린지 이미지 등 추가 필요
import ReportImg from "../../assets/report.svg";
import BookwormImg from "../../assets/book-worm.svg";
import Navbar from "../../components/common/Navbar";
import CookImg from "../../assets/cook.svg";
import DetailImg from "../../assets/detail-description.svg";

const ChallengeDetailPage = () => {
  // 각 챌린지에 대한 정보
  const challenges = [
    {
      title: "감정 저축 챌린지",
      status: "진행중",
      description: "매일 매일 감정에 따라 저축을 해봐요!",
      dateRange: "2024.06.03~2024.07.01",
      participants: 1758,
      image: SaveKingImg,
    },

    {
      title: "ESG투자 챌린지",
      status: "진행중",
      description: " ESG 기업을 소개하는 핀을 투자 카테고리에 포스팅해보세요!",
      dateRange: "항상",
      participants: 2500,
      image: EcoKingImg,
    },
    {
      title: "기업 분석 챌린지",
      status: "진행중",
      description: "원하는 기업을 분석하여 정보 카테고리에 포스팅해보세요!!",
      dateRange: "항상",
      participants: 2500,
      image: ReportImg,
    },
    {
      title: "금융 도서 추천 챌린지",
      status: "진행중",
      description:
        "자신에게 도움이 되었다고 생각한 금융 도서를 정보 카테고리에 포스팅하세요!",
      dateRange: "항상",
      participants: 2500,
      image: BookwormImg,
    },
    {
      title: "절약 레시피 챌린지",
      status: "진행중",
      description: " 자신의 절약 레시피를 소개하는 게시물을 포스팅해 보세요",
      dateRange: "항상",
      participants: 2500,
      image: CookImg,
    },
  ];

  return (
    <>
      <Header text="감정 저축 챌린지" type={"backLeftTextCenter"} />
      <div className="mt-[4.5vh]"></div>

      {challenges.map((challenge, index) => (
        <Challenge
          key={index}
          title={challenge.title}
          status={challenge.status}
          description={challenge.description}
          dateRange={challenge.dateRange}
          participants={challenge.participants}
          image={challenge.image}
        />
      ))}
      <div className="flex items-center">
        <img src={DetailImg} alt="디테일이미지" />
      </div>

      <Navbar />
    </>
  );
};

export default ChallengeDetailPage;

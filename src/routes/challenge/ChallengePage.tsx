import React, { useState, useEffect } from "react";
import CoinImg from "../../assets/coin30.svg";
import User1Img from "../../assets/user-icon.svg";
import EmotionSaveImg from "../../assets/emotion-save.svg";
import Navbar from "../../components/common/Navbar";
import useAuthStore from "../../store/useAuthStore";
import {
  fetchOurChallenges,
  fetchCorpChallenges,
  Challenge,
} from "../../libs/apis/challenge";
import ChallengeCardHorizontal from "../../components/common/ChallengeCardHorizontal";
import { getChallengeBgColor } from "../../utils/challengeColorUtil";
import CorpChallengeCardHorizontal from "../../components/common/CorpChallengeCardHorizontal";

const ChallengePage = () => {
  const [category, setCategory] = useState("최신순");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [corpChallenges, setCorpChallenges] = useState<Challenge[]>([]);
  const nickName = useAuthStore((state) => state.nickname);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const challengeData = await fetchOurChallenges();
        setChallenges(challengeData); // Set the state with the array of challenges
        const corpChallenges = await fetchCorpChallenges(0);
        setCorpChallenges(corpChallenges);
      } catch (error) {
        console.error("챌린지 조회 오류 발생", error);
      }
    };

    fetchChallenges();
  }, []);

  const handleCorpChallenges = async (sort: number) => {
    const corpChallenges = await fetchCorpChallenges(sort);
    setCorpChallenges(corpChallenges);
  };

  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
    console.log(selection);
    if (selection === "최신순") {
      handleCorpChallenges(0);
    } else {
      handleCorpChallenges(1);
    }
  };

  const selectedCategoryCss =
    "text-xs text-white bg-[#748BFF] rounded-xl shadow py-[0.5vh] px-[2vw]";
  const defaultCategoryCss =
    "text-xs text-[#748BFF] bg-[#ECF0FF] rounded-xl shadow py-[0.5vh] px-[2vw]";

  return (
    <>
      <div className="relative py-[3vh] px-[8vw] bg-[#758BFF] w-screen">
        <p className="text-lg font-black text-white">
          {nickName}님이 참여 중인 챌린지
        </p>
        <p className="text-xs pb-8 font-base text-white">
          2개의 챌린지에 참여 중이시네요!
        </p>

        <a
          href="#"
          className="block w-[48vw] h-[8vh] py-[1vh] px-[2vw] mb-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-sm font-black text-gray-900">감정 저축하기</p>
              <p className="text-xs font-normal text-gray-700">
                2일째 도전 중이에요
              </p>
            </div>
            <div>
              <img
                src={EmotionSaveImg}
                width={"40vw"}
                height={"30vh"}
                alt="Emotion Save"
              />
            </div>
          </div>
        </a>

        <a
          href="#"
          className="block w-[48vw] h-[8vh] py-[1vh] px-[2vw] mb-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-sm font-black text-gray-900">
                청년 저축 챌린지
              </p>
              <p className="text-xs font-normal text-gray-700">
                12일째 도전 중이에요
              </p>
            </div>
          </div>
        </a>

        <div className="absolute bottom-0 right-0">
          <img src={User1Img} alt="User Icon" />
        </div>
      </div>

      <div className="relative border -mt-6 px-[8vw] py-[3vh] h-[22vh] rounded-[30px] bg-[#ECF0FF]">
        <div className="flex">
          <p className="text-base items-center mb-4 mr-2 font-bold text-black-900">
            신규 챌린지
          </p>

          <p className="text-sm items-center font-bold text-red-600">NEW!</p>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-base font-bold text-black-900">감정 저축하기</p>
            <p className="text-xs ml-1 font-bold text-gray-600">
              마감 기한 없음
            </p>
          </div>

          <a className="items-center">
            <img src={CoinImg} alt="Coin" />
          </a>
        </div>
      </div>

      <div className="relative border -mt-10 px-[8vw] py-[3vh] rounded-[30px] bg-white">
        <div className="flex justify-between">
          <p className="text-base font-bold text-black-900">자체 챌린지</p>
        </div>

        <div className="mt-[2vh] overflow-y-scroll">
          {challenges.map((challenge, index) => (
            <div key={index}>
              <ChallengeCardHorizontal
                key={challenge.id}
                title={challenge.name}
                description={challenge.description}
                participants={challenge.participation}
                bgColor={getChallengeBgColor(challenge.id)}
                ChallengeLogo={challenge.logoUrl}
                reward={challenge.reward}
              />
            </div>
          ))}
        </div>

        <div className="pb-[7vh]" />

        <div className="flex justify-between">
          <p className="text-base font-bold text-black-900">기업 챌린지</p>
          <div className="flex">
            <div
              className={`${
                category === "최신순" ? selectedCategoryCss : defaultCategoryCss
              } cursor-pointer mr-[2vw]`}
              onClick={() => handleCategoryClick("최신순")}
            >
              최신순
            </div>
            <div
              className={`${
                category === "마감기한순"
                  ? selectedCategoryCss
                  : defaultCategoryCss
              } cursor-pointer`}
              onClick={() => handleCategoryClick("마감기한순")}
            >
              마감기한순
            </div>
          </div>
        </div>

        <div className="mt-[2vh] overflow-y-scroll">
          {corpChallenges.map((challenge, index) => (
            <div key={index}>
              <CorpChallengeCardHorizontal
                key={challenge.id}
                title={challenge.name}
                logo={challenge.logoUrl}
                description={challenge.description}
                corpName={challenge.corpName}
                challengeUrl={challenge.challengeUrl}
                endAt={challenge.endAt}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pb-[7vh]" />
      <Navbar />
    </>
  );
};

export default ChallengePage;

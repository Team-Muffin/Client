import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallLogoImg from "../../assets/small-profile.svg";
import DateImg from "../../assets/date.svg";
import CheckImg from "../../assets/check.svg";
import Coin from "../../assets/coin.svg";
import { getLinkByChallengeType } from "../../utils/challengeUtil";
import { fetchSavingProductSummary } from "../../libs/apis/product";
import SelectAccountModal from "../common/SelectAccountModal";
import { getMyChallenges, joinEmoChallenge } from "../../libs/apis/challenge";
import useAuth2Store from "../../store/useAuth2Store";

interface ChallengeProps {
  id: number;
  title: string;
  status: string;
  description: string;
  dateRange: string;
  challengeType: number;
  participants: number;
  image: string;
  detailDescription: string;
  reward: number;
}

const Challenge: React.FC<ChallengeProps> = ({
  id,
  title,
  challengeType,
  description,
  dateRange,
  participants,
  image,
  detailDescription,
  reward,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [inProgress, setProgress] = useState<boolean>(false);
  const userId = useAuth2Store((state) => state.id);
  useEffect(() => {
    const fetchMyChallengeStatus = async (userId: number, id: number) => {
      const res = await getMyChallenges(0, userId);
      for (let i = 0; i < res.length; i++) {
        if (id === res[i].challengeId && res[i].status === "진행중") {
          setProgress(true);
          console.log("dksehla?");
        }
        console.log(res[i].challengeId, id, res[i].status);
      }
    };

    fetchMyChallengeStatus(userId!, id);
  }, [id]);

  const handleLink = () => {
    if (inProgress) {
      alert("이미 참여 중인 챌린지입니다!");
      return;
    }


    if (confirmed) {
      let url;
      if (id === 1) {
        url = "/challenge/calendar";
      } else {
        url = `/board/write?challengeId=${id}`;
      }
      navigate(url);

    const confirmed = window.confirm(`${title}에 참여하시겠습니까?`);
    if (challengeType === 1) {
      if (confirmed) {
        setModalOpen(true);
      }
    } else {
      if (confirmed) {
        navigate(`/board/write?challengeId=${id}`);
      }

    }
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <img src={image} className="w-[38vw] h-[26vh]" alt="Challenge Image" />
      </div>

      <p className="flex py-2 items-center text-xs text-[#748BFF] bg-[#ECF0FF] rounded-xl shadow mb-[1vh] py-[0.5vh] px-[2vw]">
        <span>{`성공 보상: `}</span>
        <p className="px-1"></p>
        <img src={Coin} className="h-[1.2vh]" />
        <span>{`${reward}`}</span>
      </p>
      <p className="mb-[2vh] text-lg font-black text-black">{title}</p>

      <div className="w-[80vw] px-[5.5vw] py-[2vh] rounded-xl flex flex-col items-center bg-[#F4F3F8]">
        <div className="flex justify-between w-full">
          <div className="flex-col items-center pl-[5vw] pr-[5vw]">
            <div className="flex items-center gap-x-4">
              <img src={DateImg} width={"20vw"} height={"20vh"} alt="Date" />
              <p className="items-center text-xs font-semibold text-black-900 dark:text-black my-[0.5vh]">
                {dateRange}
              </p>
            </div>
            <div className="flex items-center gap-x-4 ">
              <img src={CheckImg} width={"20vw"} height={"20vh"} alt="Date" />
              <p className="text-xs font-semibold text-black-900 dark:text-black my-[0.5vh]">
                {participants}명 참여
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              <img
                src={SmallLogoImg}
                width={"20vw"}
                height={"20vh"}
                alt="Small Logo"
              />
              <p
                className="text-xs font-semibold text-black-900 dark:text-black mt-[0.5vh]"
                style={{ wordBreak: "keep-all" }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-[2vh]">
        <button
          type="button"
          onClick={handleLink}
          className="text-base font-semibold text-[#748BFF] bg-[#ECF0FF] rounded-3xl shadow py-[0.5vh] px-[10vw]"
        >
          {inProgress ? "참여중" : "참여하기"}
        </button>
      </div>
      {isModalOpen ? (
        <SelectAccountModal
          onClose={() => setModalOpen(false)}
          callback={(toAcc, fromAcc) => {
            joinEmoChallenge(id, toAcc, fromAcc).then((res) =>
              navigate(`/challenge/calendar/${res}`)
            );
          }}
        />
      ) : (
        <></>
      )}
      <div className="w-full h-[2vh] bg-[#F4F3F8] mt-[2vh] mb-[2vh]"></div>
      <div className="flex items-center mb-20">
        <img src={detailDescription} alt="Detail Description" />
      </div>
    </div>
  );
};

export default Challenge;

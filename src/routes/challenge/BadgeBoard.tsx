import React, { useEffect, useState } from "react";
import EcoKing from "../../assets/eco-king.svg";
import SaveKing from "../../assets/save-king.svg";
import Bookworm from "../../assets/book-worm.svg";
import Report from "../../assets/report.svg";
import Cook from "../../assets/cook.svg";
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import { Badge } from "../../libs/apis/challenge";
import { fetchSuccessBadges } from "../../libs/apis/challenge";
import useAuth2Store from "../../store/useAuth2Store";

export default function BadgeBoard() {
  const initialBadges = [
    { name: "EcoKing", path: EcoKing, title: "지속가능성의\n챔피언" },
    { name: "SaveKing", path: SaveKing, title: "솔직저축왕" },
    { name: "Bookworm", path: Bookworm, title: "금융독서왕" },
    { name: "Report", path: Report, title: "투자의 현자" },
    { name: "Cook", path: Cook, title: "절약요리왕" },
  ];

  const myId = useAuth2Store((state) => state.id);
  const [userBadges, setUserBadges] = useState<Badge[] | null>(null);

  useEffect(() => {
    if (myId !== null) {
      fetchSuccessBadges(myId.toString())
        .then((data) => {
          setUserBadges(data);
        })
        .catch((error) => {
          console.error("성공 뱃지 조회 오류: ", error);
        });
    }
  }, []);

  return (
    <>
      <Header text="챌린지 뱃지함" type="backLeftTextCenter" />
      <div className="mt-[7vh]"></div>

      <div className="flex justify-center mt-[2vh]">
        <div className="text-[15px] font text-[#000000] bg-[#ECF0FF] rounded-2xl shadow py-[0.5vh] px-[8vw] text-center">
          챌린지에 성공하면 멋진 뱃지를 얻을 수 있어요. <br />
          다양한 뱃지를 수집하는 재미를 느껴보세요!
        </div>
      </div>

      <div className="mt-[3.5vh]"></div>

      {/* 도장판 */}
      <div className="grid grid-cols-3 gap-4 justify-center px-[2vw] mt-[2vh]">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="badge-item mx-[1vw] my-[1vw] text-center border-2 gray-400 p-[2vw] rounded-lg min-h-[22vh] h-[18vh]"
          >
            {userBadges && userBadges[index] ? (
              <>
                <img
                  src={userBadges[index].imgUrl}
                  alt={userBadges[index].challengeName}
                  className="stamp-img w-[23vw] h-[15vh] object-contain"
                />
                <p className="mt-[1vw] font-semibold text-sm whitespace-pre-line">
                  {userBadges[index].badgeName}
                </p>
              </>
            ) : (
              <div className="w-[22vw] h-[15vh] flex items-center justify-center">
                <span className="text-gray-400">-</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <Navbar />
    </>
  );
}

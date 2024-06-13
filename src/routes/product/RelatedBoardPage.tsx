import { useState } from "react";
import Header from "../../components/Header";
import Navbar from "../Navbar";
import BoardCard from "../../components/BoardCard";

export default function RelatedBoardPage() {
  return (
    <>
      <Header text="Mr.Life" type={1} />
      <div className="mt-[4vh]" />

      <div className="py-[2vh]  px-[4.5vw] pb-[1vh]">
        <div className="flex justify-between">
          <div className="flex justify-between items-center">
            <div className="inline">
              <span className="font-medium text-[1rem] ml-[1.5vw]">
                관련 게시글
              </span>
              <span className="font-medium text-[1rem] ml-[1.5vw] text-[#738BFF]">
                9
              </span>
            </div>
          </div>
        </div>
        <hr className="border-CD9D9D9 mt-[1vh]" />
        <BoardCard
          title="⭐️내가 들었던 펀드 추천 글⭐️"
          description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
          author="이듀미"
          time="3"
          heartCount={7}
          replyCount={3}
          imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
          link="boardDetail"
        />
        <BoardCard
          title="⭐️내가 들었던 펀드 추천 글⭐️"
          description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
          author="이듀미"
          time="3"
          heartCount={7}
          replyCount={3}
          imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
          link=""
        />
        <BoardCard
          title="⭐️내가 들었던 펀드 추천 글⭐️"
          description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
          author="이듀미"
          time="3"
          heartCount={7}
          replyCount={3}
          imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
          link=""
        />
      </div>

      <div className="pb-[8.5vh]" />
      <Navbar />
    </>
  );
}

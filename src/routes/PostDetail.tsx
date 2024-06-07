import React, { useState } from "react";
import Header from "../components/Header";
import Dropdown from "../components/Dropdown";
import writeButton from "../assets/writeButton.svg";
import PostCard from "../components/PostCard";
import Navbar from "./Navbar";
import character1 from "../assets/character1.svg";
import Heart from "../assets/heart_empty.svg";
import Reply from "../assets/reply.svg";
import Scrap from "../assets/scrap.svg";

export default function PostDetail() {
  const [category, setCategory] = useState("유저");

  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
  };

  return (
    <>
      <div className="py-[2vh] px-[4.5vw]">
        {/* 헤더랑 */}
        <Header text="꿀팁" type={1} />
        <div className="mt-[4vh]"></div>
        {/* 세트로 들고 다녀야 됨 */}
        <div className="px-[3vw]">
          <div className="flex items-center">
            <img className="pr-[3vw]" src={character1} />
            <div>
              <p className="text-[1.2rem] text-C333333 font-medium">이듀미</p>
              <p className="text-[0.8rem] text-C333333">2시간 전</p>
            </div>
          </div>
          {/* 여기 민우 TODO */}
          <p className=" py-[1vh] text-[1.25rem] font-medium">
            ⭐️️ 내가 들었던 펀드 추천 글 ⭐
          </p>
          <p className=" text-[0.75rem]">
            오늘은 내가 들었던 펀드 중에 제일 좋았던 신한은행의 펀드를
            이야기해볼게! 투자에 관심이 있다면 한 번쯤은 펀드를 고려해 봤을
            거야. 그 중에서도 신한은행의 펀드는 안정성과 수익률 모두에서 우수한
            평가를 받고 있어 많은 투자자들에게 사랑받고 있어. 내가 추천하는
            펀드는 '신한은행 글로벌 밸런스 펀드'야. <br />
            이 펀드는 주식과 채권에 분산 투자하여 안정적인 수익을 추구하는
            펀드야. 주식의 비중이 높아 주식시장이 좋을 때는 높은 수익을 기대할
            수 있고, 채권의 비중이 있어서 시장이 불안정할 때도 안정적인 수익을
            유지할 수 있어. 특히 글로벌 시장에 투자하기 때문에 특정 국가의 경제
            상황에 크게 좌우되지 않고, 전 세계 다양한 산업에 분산 투자하여
            리스크를 낮출 수 있어.
            <br />
            또한 신한은행의 펀드는 전문가들이 관리하는 만큼 신뢰할 수 있어. 시장
            분석과 투자 전략 수립에 있어 탁월한 능력을 가진 전문가들이 투자
            포트폴리오를 관리해 주기 때문에, 개별 투자자가 직접 투자하는 것보다
            안정적이고 효율적인 투자 성과를 기대할 수 있어. <br />
            물론 모든 투자에는 리스크가 따르기 때문에, 자신의 투자 성향과 목표에
            맞는지 잘 고려해야 해. 하지만 장기적인 안목으로 본다면, 신한은행의
            글로벌 밸런스 펀드는 매우 매력적인 선택이 될 수 있어. 나 또한 이
            펀드를 통해 안정적인 수익을 얻을 수 있었고, 앞으로도 꾸준히 투자할
            계획이야. <br />
            신한은행의 펀드를 통해 경제적 자유를 향해 한 걸음 더 나아가 보는 건
            어떨까? 다양한 옵션과 전문가의 조언을 통해, 나만의 투자 포트폴리오를
            구성해 보길 바래!
            <br />
          </p>
          {/* 까지 민우 TODO */}
          <div className="flex justify-between ">
            <div className="flex items-center">
              <img
                src={Heart}
                className="w-[1.2rem] mr-[1vw] text-C333333"
              ></img>
              <p className="text-[0.85rem] mr-[1.75vw] text-C333333">7</p>
              <img
                src={Reply}
                className="w-[1.25rem] mr-[1vw] text-C333333"
              ></img>
              <p className="text-[0.85rem] mr-[1vw] text-C333333">3</p>
            </div>
            <div className="flex bg-[#F8F5F5] p-[1.5vw] rounded-[0.5rem]">
              <img
                src={Scrap}
                className="w-[1.2rem] mr-[1vw] text-C333333"
              ></img>
              <p className="text-[0.85rem] mr-[1vw] text-C333333">저장</p>
            </div>
          </div>
        </div>
        <hr className="border-CD9D9D9 mt-[1vh]" />

        <div></div>

        <Navbar />
      </div>
    </>
  );
}

import { useState } from "react";
import Header from "../../components/Header";
import Dropdown from "../../components/Dropdown";
import writeButton from "../../assets/write-button.svg";
import ProductCard from "../../components/ProductCard";
import Navbar from "../Navbar";
import Search from "../../assets/search-gray.svg";
import SHCard from "../../assets/card-sh.svg";

import Star from "../../assets/star-filled.svg";

export default function ProductListPage() {
  const [category, setCategory] = useState("카드");
  const categories = ["카드", "예적금", "투자", "대출"];
  const [userInfo, setUserInfo] = useState("20대 여성");
  const [productInfo, setProductInfo] = useState("체크카드");

  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
  };

  const selectedCategoryCss =
    "text-base text-C748BFF bg-CECF0FF py-[0.3vh] px-[6.5vw] rounded-[0.5rem] shadow";
  const defaultCategoryCss = "text-base text-C333333 px-[6.5vw] py-[0.3vh]";

  return (
    <>
      <div className="py-[2vh] px-[4.5vw]">
        {/* 헤더랑 */}
        <Header text="상품" type={3} />
        <div className="mt-[4vh]"></div>
        {/* 세트로 들고 다녀야 됨 */}

        <div className="flex justify-center">
          {categories.map((cat) => (
            <p
              key={cat}
              className={`${
                category === cat ? selectedCategoryCss : defaultCategoryCss
              } cursor-pointer`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-CECF0FF rounded-t-[1.75rem]">
        <p className="p-[4vh] pb-[3vh] text-[1.25rem] font-bold">
          <span className="text-[#738BFF]">{userInfo}</span>이
          <br /> 가장 많이 사용하는{" "}
          <span className="text-[#738BFF]">{productInfo}</span>는?
        </p>
        <div className="flex justify-center pb-[4vh]">
          <img className="pr-[5vw]" src={SHCard} />
          <div className="">
            <span className="p-[1vw] text-[0.6rem] text-white bg-[#738BFF] p-[1vw] rounded-[0.25rem]">
              신한카드
            </span>
            <p className="mt-[0.5vh] font-semibold text-[1.15rem]">
              신한카드 Mr.Life
            </p>
            <div className="flex">
              <img src={Star} />
              <p className="ml-[0.25vh] text-[0.75rem]"> 4.7 (530)</p>
            </div>
            <p className="py-[0.8vh] text-[0.8rem] font-medium">
              신한카드 이용하고
              <br className="m-0 p-0" /> 최대 10만원 캐시백 받아가자!
            </p>
            <p className=" text-[0.75rem] text-C333333">• 공과금 10% 할인</p>
            <p className=" text-[0.75rem] text-C333333">
              • 마트, 편의점 10% 할인
            </p>
            <p className=" text-[0.75rem] text-C333333">• 식음료 10% 할인</p>
            <p className="text-[0.6rem] text-C333333 text-end mt-[1rem]">
              {" "}
              더보기 {">"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-[4.5vw] mt-[3.5vw]">
        <div className=" w-[93vw] mx-auto flex justify-between items-center text-C333333 text-[1rem] bg-[#F4F3FA] py-[1.25vh] px-[4vw] rounded-[0.9rem]">
          <input
            type="text"
            id="small-input"
            className="block w-full text-[0.95rem] border-none bg-[#F4F3FA] p-[0] m-[0]"
            placeholder="궁금한 상품을 검색해보세요!"
          />
          <img src={Search} />
        </div>

        <Dropdown
          defaultFilter="리뷰 많은 순"
          filterList={["리뷰 많은 순", "별점 높은 순", "최신순"]}
        />

        <ProductCard
          cardName="신한카드 Mr.Life"
          cardBrand="신한카드"
          benefits={["#연회비 지원", "#관리비"]}
          rating={4.7}
          reviewCount={530}
          link="/"
        />
        <ProductCard
          cardName="신한카드 Mr.Life"
          cardBrand="신한카드"
          benefits={["#연회비 지원", "#관리비"]}
          rating={4.7}
          reviewCount={530}
          link="/"
        />
        <ProductCard
          cardName="신한카드 Mr.Life"
          cardBrand="신한카드"
          benefits={["#연회비 지원", "#관리비"]}
          rating={4.7}
          reviewCount={530}
          link="/"
        />
        <ProductCard
          cardName="신한카드 Mr.Life"
          cardBrand="신한카드"
          benefits={["#연회비 지원", "#관리비"]}
          rating={4.7}
          reviewCount={530}
          link="/"
        />

        <img className="fixed bottom-[8vh] right-[4vw] z-5" src={writeButton} />
      </div>
      <div className="pb-[8.5vh]" />
      <Navbar />
    </>
  );
}

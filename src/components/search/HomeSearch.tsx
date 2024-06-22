import React from "react";
import { useState, useRef, useEffect } from "react";
import CategoryTabs from "../common/CategoryTabs";

interface HomeSearchProps {
  keyword: string;
}

const HomeSearch: React.FC<HomeSearchProps> = (keyword) => {
  const categories = ["핀", "챌린지", "상품", "유저"];
  const [category, setCategory] = useState("핀");

  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
  };

  useEffect(() => {
    if (category === "핀") {
      //category랑 keyword로 쏘기
    }
  });
  return (
    <>
      <CategoryTabs
        categories={categories}
        userCategory={category}
        handleUserCategoryClick={handleCategoryClick}
        width={15}
      />
    </>
  );
};

export default HomeSearch;

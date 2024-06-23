import React from "react";
import { useState, useRef, useEffect } from "react";
import CategoryTabs from "../common/CategoryTabs";

interface BoardSearchProps {
  keyword: string;
}

const BoardSearch: React.FC<BoardSearchProps> = (keyword) => {
  const categories = ["정보", "재미", "투자", "기업", "고급"];
  const [category, setCategory] = useState("정보");

  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
  };

  useEffect(() => {
    if (category === "정보") {
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

export default BoardSearch;

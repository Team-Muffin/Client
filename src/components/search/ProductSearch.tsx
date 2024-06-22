import React from "react";
import { useState, useRef, useEffect } from "react";
import CategoryTabs from "../common/CategoryTabs";

interface ProductSearchProps {
  keyword: string;
}

const ProductSearch: React.FC<ProductSearchProps> = (keyword) => {
  const categories = ["카드", "예적금", "투자", "대출"];
  const [category, setCategory] = useState("카드");

  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
  };

  useEffect(() => {
    if (category === "카드") {
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

export default ProductSearch;

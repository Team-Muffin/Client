import React from "react";
import { useState, useRef, useEffect } from "react";
import CategoryTabs from "../common/CategoryTabs";
import { fetchSearchedProductList, ProductList } from "../../libs/apis/search";
import ProductCard from "../common/ProductCard";
import { useNavigate } from "react-router-dom";

interface ProductSearchProps {
  keyword: string;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ keyword }) => {
  const navigate = useNavigate();
  const categories = ["카드", "예적금", "투자", "대출"];
  const [category, setCategory] = useState("카드");
  const [productData, setProductData] = useState<ProductList[]>([]);
  const [productPageNo, setProductPageNo] = useState(0);
  const [size, setSize] = useState(10);
  const callProductData = async () => {
    try {
      const { data } = await fetchSearchedProductList(
        keyword,
        productPageNo,
        size,
        category === "투자" ? "펀드" : category
      );

      setProductData(data.data["searched products"]);
    } catch (error) {
      console.log("챌린지 검색 리스트 불러오는 중 오류", error);
    }
  };

  const handleProductCardClick = async (link: string) => {
    navigate(link);
  };

  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
  };

  useEffect(() => {
    callProductData();
  }, [keyword, category]);

  return (
    <>
      <CategoryTabs
        categories={categories}
        userCategory={category}
        handleUserCategoryClick={handleCategoryClick}
        width={15}
      />
      <>
        <>
          <div className="py-[2vh] px-[4.5vw]">
            <hr />
            {productData.length === 0 && (
              <>
                <div className="text-C333333 py-[2vh] px-[1.5vh] text-[0.9rem]">
                  "{keyword}" 검색 결과가 없습니다.
                </div>
              </>
            )}

            {productData.map((data, index) => (
              <React.Fragment key={index}>
                <div>
                  <ProductCard
                    type={category}
                    productImg={data.cardImage || data.corpImage || ""}
                    productName={data.name}
                    productBrand={data.corpName}
                    benefits={data.tags.slice(0, 2)}
                    reviewCount={data.boardCount}
                    link={`${data.id}`}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      </>
    </>
  );
};

export default ProductSearch;

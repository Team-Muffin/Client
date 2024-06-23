import { useState, useRef, useEffect } from "react";
import Header from "../../components/common/Header";
import Dropdown from "../../components/common/Dropdown";
import writeButton from "../../assets/write-button.svg";
import ProductCard from "../../components/common/ProductCard";
import Navbar from "../../components/common/Navbar";
import Search from "../../assets/search-gray.svg";
import { fetchProductList, ProductList } from "../../libs/apis/product";
import { useNavigate } from "react-router-dom";

export default function ProductListPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("카드");
  const categories = ["카드", "예적금", "투자", "대출"];
  const [userInfo, setUserInfo] = useState("20대 여성");
  const [productInfo, setProductInfo] = useState("체크카드");
  const [productListData, setProductListData] = useState<ProductList[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [size, setSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("최신순");
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleSearchBtnClick = () => {
    navigate(`/search`, {
      state: { domain: "product" },
    });
  };

  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
    setSelectedFilter("최신순");
  };

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  const selectedCategoryCss =
    "text-base text-C748BFF bg-CECF0FF py-[0.3vh] px-[5.5vw] rounded-[0.5rem] shadow";
  const defaultCategoryCss = "text-base text-C333333 px-[5.5vw] py-[0.3vh]";

  const callProductListData = async () => {
    try {
      const response = await fetchProductList({
        pageNo,
        size,
        category: category === "투자" ? "펀드" : category,
        sort: selectedFilter,
      });

      if (response.data) {
        console.log(response.data);
        setProductListData(response.data.data.products);
      } else {
        console.error("상품 리스트 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("상품 리스트 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callProductListData();
  }, [pageNo, size, category, selectedFilter]);

  return (
    <>
      <div className="py-[2vh] px-[4.5vw]">
        {/* 헤더랑 */}
        <Header
          text="상품"
          type="textCenterSearchRight"
          searchBtn={handleSearchBtnClick}
        />
        <div className="mt-[4vh]"></div>
        {/* 세트로 들고 다녀야 됨 */}

        <div className="flex justify-between">
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

        <div>
          <Dropdown
            defaultFilter="최신순"
            filterList={["최신순", "인기순"]}
            onFilterChange={handleFilterChange}
            newFilter={selectedFilter}
          />

          {productListData.map((data) => (
            <div key={data.id}>
              <ProductCard
                type={category === "투자" ? "펀드" : category}
                productImg={
                  category === "카드" ? data.cardImage : data.corpImage
                }
                productName={data.name}
                productBrand={data.corpName}
                benefits={data.tags.slice(0, 2)}
                reviewCount={data.boardCount}
                link={`${data.id}`}
              />
            </div>
          ))}
        </div>
        <div className="pb-[8.5vh]" />
        <Navbar />
      </div>
    </>
  );
}

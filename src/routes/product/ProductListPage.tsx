import { useState, useRef, useEffect, useCallback } from "react";
import Header from "../../components/common/Header";
import Dropdown from "../../components/common/Dropdown";
import writeButton from "../../assets/write-button.svg";
import ProductCard from "../../components/common/ProductCard";
import Navbar from "../../components/common/Navbar";
import Search from "../../assets/search-gray.svg";
import { fetchProductList, ProductList } from "../../libs/apis/product";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useCategoryFilterStore from "../../store/useCategoryFilterStore";

export default function ProductListPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("카드");
  const categories = ["카드", "예적금", "투자", "대출"];
  const [userInfo, setUserInfo] = useState("20대 여성");
  const [productInfo, setProductInfo] = useState("체크카드");
  const [selectedFilter, setSelectedFilter] = useState("최신순");
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(10);

  const { savedCategory, savedFilter } = useCategoryFilterStore((state) => ({
    savedCategory: state.savedCategory,
    savedFilter: state.savedFilter,
  }));

  useEffect(() => {
    if (savedCategory) setCategory(savedCategory);
    if (savedFilter) setSelectedFilter(savedFilter);
  }, []);

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

  const fetchProductListData = async (pageParam: number) => {
    const response = await fetchProductList({
      pageNo: pageParam,
      size: size,
      category: category === "투자" ? "펀드" : category,
      sort: selectedFilter,
    });

    return response.data.data.products;
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isError } =
    useInfiniteQuery(
      ["product", category, selectedFilter], // useInfiniteQuery의 key로 사용될 배열
      ({ pageParam = 0 }) => fetchProductListData(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.length === size ? allPages.length : undefined;
        },
        select: (data) => ({
          pages: data.pages.flatMap((page) => page),
          pageParams: data.pageParams,
        }),
      }
    );

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  return (
    <>
      <div className="py-[2vh] px-[4.5vw]">
        <Header
          text="상품"
          type="textCenterSearchRight"
          searchBtn={handleSearchBtnClick}
        />
        <div className="mt-[4vh]"></div>
        <div className="flex justify-between">
          {categories.map((cat, index) => (
            <p
              key={index}
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

          {data?.pages.map((data, index) => (
            <div key={index}>
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
                category={category}
                filter={selectedFilter}
              />
            </div>
          ))}
        </div>

        <div ref={observerRef} className="pb-[8.5vh]" />

        {isLoading && <LoadingSpinner />}
        {isError && <p>Error loading data...</p>}

        <Navbar />
      </div>
    </>
  );
}

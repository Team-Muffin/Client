import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import CategoryTabs from "../common/CategoryTabs";
import { fetchSearchedProductList, ProductList } from "../../libs/apis/search";
import ProductCard from "../common/ProductCard";
import { useNavigate } from "react-router-dom";
import useCategoryFilterStore from "../../store/useCategoryFilterStore";
import LoadingSpinner from "../common/LoadingSpinner";
import { useInfiniteQuery } from "react-query";

interface ProductSearchProps {
  keyword: string;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ keyword }) => {
  const navigate = useNavigate();
  const categories = ["카드", "예적금", "투자", "대출"];
  const [category, setCategory] = useState("카드");
  const [size, setSize] = useState(10);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const setCategoryAndFilters = useCategoryFilterStore(
    (state) => state.setCategoryAndFilters
  );

  useEffect(() => {
    if (category) {
      setCategoryAndFilters(category, null);
    }
  }, [category]);

  const handleProductCardClick = async (link: string) => {
    navigate(link);
  };

  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
  };

  const fetchSearchedProductListData = async (
    pageParam: number,
    category: string
  ) => {
    try {
      const response = await fetchSearchedProductList(
        keyword,
        pageParam,
        size,
        category === "투자" ? "펀드" : category
      );
      return response.data.data["searched products"];
    } catch (error) {
      throw new Error("상품 검색 리스트 불러오는 중 오류");
    }
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isError } =
    useInfiniteQuery(
      ["product-search", category], // useInfiniteQuery의 key로 사용될 배열
      ({ pageParam = 0 }) => fetchSearchedProductListData(pageParam, category),
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
            {data && data.pages.length === 0 && (
              <>
                <div className="text-C333333 py-[2vh] px-[1.5vh] text-[0.9rem]">
                  "{keyword}" 검색 결과가 없습니다.
                </div>
              </>
            )}

            {data &&
              data.pages.map((item, index) => (
                <React.Fragment key={index}>
                  <div>
                    <ProductCard
                      type={category}
                      productImg={item.cardImage || item.corpImage || ""}
                      productName={item.name}
                      productBrand={item.corpName}
                      benefits={item.tags.slice(0, 2)}
                      reviewCount={item.boardCount}
                      link={`${item.id}`}
                    />
                  </div>
                </React.Fragment>
              ))}
          </div>
          <div ref={observerRef} />
          {isLoading && <LoadingSpinner />}
          {isError && <p>Error loading data...</p>}
        </>
      </>
    </>
  );
};

export default ProductSearch;

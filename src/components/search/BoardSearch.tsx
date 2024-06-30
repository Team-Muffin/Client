import React, { useState, useRef, useEffect, useCallback } from "react";
import CategoryTabs from "../common/CategoryTabs";
import { BoardData, fetchSearchedBoardList } from "../../libs/apis/search";
import { useNavigate } from "react-router-dom";
import BoardCard from "../common/BoardCard";
import useCategoryFilterStore from "../../store/useCategoryFilterStore";
import LoadingSpinner from "../common/LoadingSpinner";
import { useInfiniteQuery } from "react-query";

interface BoardSearchProps {
  keyword: string;
}

const BoardSearch: React.FC<BoardSearchProps> = ({ keyword }) => {
  const navigate = useNavigate();
  const categories = ["정보", "재미", "투자", "기업", "고급"];
  const [category, setCategory] = useState("정보");
  const [size, setSize] = useState(10);

  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
  };

  const handleBoardCardClick = async (link: string) => {
    navigate(link);
  };

  const observerRef = useRef<HTMLDivElement | null>(null);

  const setCategoryAndFilters = useCategoryFilterStore(
    (state) => state.setCategoryAndFilters
  );

  useEffect(() => {
    if (category) {
      setCategoryAndFilters(category, null);
    }
  }, [category]);

  const fetchSearchedBoardListData = async (
    pageParam: number,
    category: string
  ) => {
    try {
      const response = await fetchSearchedBoardList({
        pageNo: pageParam,
        size: size,
        keyword,
        category,
      });
      return response.data;
    } catch (error) {
      throw new Error("게시글 검색 리스트 불러오는 중 오류");
    }
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isError } =
    useInfiniteQuery(
      ["board-search", category], // useInfiniteQuery의 key로 사용될 배열
      ({ pageParam = 0 }) => fetchSearchedBoardListData(pageParam, category),
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
      threshold: 0,
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
      <div className="py-[2vh] px-[4.5vw]">
        <hr />
        {data?.pages.length === 0 && (
          <div className="text-C333333 py-[2vh] px-[1.5vh] text-[0.9rem]">
            "{keyword}" 검색 결과가 없습니다.
          </div>
        )}

        {data &&
          data.pages.map((item, index) => (
            <React.Fragment key={index}>
              <div onClick={() => handleBoardCardClick(`/board/${item.id}`)}>
                <BoardCard
                  title={item.title}
                  description={item.summary}
                  author={item.authorNickname}
                  time={item.createdTime}
                  heartCount={item.likeCount}
                  replyCount={item.commentCount}
                  imageUrl={item.thumbnail}
                  authorImageUrl={item.authorProfile}
                />
              </div>
            </React.Fragment>
          ))}
      </div>
      <div ref={observerRef} className="pb-[8.5vh]" />
      {isLoading && <LoadingSpinner />}
      {isError && <p>Error loading data...</p>}
    </>
  );
};

export default BoardSearch;

import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../components/common/Header";
import Dropdown from "../../components/common/Dropdown";
import writeButton from "../../assets/write-button.svg";
import BoardCard from "../../components/common/BoardCard";
import Navbar from "../../components/common/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useCategoryFilterStore from "../../store/useCategoryFilterStore";
import { useInfiniteQuery } from "react-query";
import { fetchBoardList } from "../../libs/apis/board";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function BoardListPage() {
  const [category, setCategory] = useState("정보");
  const categories = ["정보", "재미", "투자", "기업", "고급"];
  const [size, setSize] = useState(10);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("최신순");
  const navigate = useNavigate();
  const { userId } = useAuthStore((state) => ({
    userId: state.id,
  }));
  const { savedCategory, savedFilter } = useCategoryFilterStore((state) => ({
    savedCategory: state.savedCategory,
    savedFilter: state.savedFilter,
  }));

  useEffect(() => {
    if (savedCategory) setCategory(savedCategory);
    if (savedFilter) setSelectedFilter(savedFilter);
  }, []);

  const setCategoryAndFilters = useCategoryFilterStore(
    (state) => state.setCategoryAndFilters
  );

  const handleBoardCardClick = async (link: string) => {
    if (category && selectedFilter) {
      setCategoryAndFilters(category, selectedFilter);
    } else if (category) {
      setCategoryAndFilters(category, null);
    }
    navigate(link);
  };

  const handleSearchBtnClick = () => {
    navigate(`/search`, {
      state: { domain: "board" },
    });
  };

  const selectedCategoryCss =
    "text-base text-C748BFF bg-CECF0FF py-[0.3vh] px-[4.5vw] rounded-[0.5rem] shadow text-[1.1rem]";
  const defaultCategoryCss =
    "text-base text-C333333 px-[4.5vw] py-[0.3vh] text-[1.1rem]";

  const handleUserCategoryClick = (selection: string) => {
    setCategory(selection);
    setSelectedFilter("최신순");
  };

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  const fetchBoardListData = async (pageParam: number) => {
    const response = await fetchBoardList({
      pageNo: pageParam,
      size: size,
      category: category,
      sort: selectedFilter,
      userId,
    });

    return response.data.data;
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isError } =
    useInfiniteQuery(
      ["board", category, selectedFilter], // useInfiniteQuery의 key로 사용될 배열
      ({ pageParam = 0 }) => fetchBoardListData(pageParam),
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
    <div className="py-[2vh] px-[4.5vw]">
      <Header
        text="핀"
        type="textCenterSearchRight"
        searchBtn={handleSearchBtnClick}
      />
      <div className="mt-[4vh]"></div>

      <div className="flex justify-between text-sm">
        {categories.map((cat, index) => (
          <p
            key={index}
            className={`${
              category === cat ? selectedCategoryCss : defaultCategoryCss
            } cursor-pointer`}
            onClick={() => handleUserCategoryClick(cat)}
          >
            {cat}
          </p>
        ))}
      </div>

      <Dropdown
        defaultFilter="최신순"
        filterList={["최신순", "인기순"]}
        onFilterChange={handleFilterChange}
        newFilter={selectedFilter}
      />

      <hr className="border-CD9D9D9 mt-[1vh]" />
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
      <div ref={observerRef} />

      {isLoading && <LoadingSpinner />}
      {isError && <p>Error loading data...</p>}

      <Link to={`/board/write`}>
        <img className="fixed bottom-[8vh] right-[4vw] z-5" src={writeButton} />
      </Link>
      <div className="pb-[7.5vh]" />
      <Navbar />
    </div>
  );
}

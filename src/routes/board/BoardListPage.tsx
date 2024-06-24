import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/common/Header";
import Dropdown from "../../components/common/Dropdown";
import writeButton from "../../assets/write-button.svg";
import BoardCard from "../../components/common/BoardCard";
import Navbar from "../../components/common/Navbar";
import { Link } from "react-router-dom";
import { fetchBoardList } from "../../libs/apis/board";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useCategoryFilterStore from "../../store/useCategoryFilterStore";

export default function BoardListPage() {
  const [category, setCategory] = useState("정보");
  const categories = ["정보", "재미", "투자", "기업", "고급"];
  const [pageNo, setPageNo] = useState(0);
  const [size, setSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUSerId] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("최신순");
  const elementRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isScrollRestored, setIsScrollRestored] = useState<boolean>(false);
  // const { userId } = useAuthStore((state) => ({
  //   userId: state.userId,
  // }));

  const { refreshTokens, logout } = useAuthStore.getState();

  const setCategoryAndFilters = useCategoryFilterStore(
    (state) => state.setCategoryAndFilters
  );

  const handleSearchBtnClick = () => {
    navigate(`/search`, {
      state: { domain: "board" },
    });
  };

  const selectedCategoryCss =
    "text-base text-C748BFF bg-CECF0FF py-[0.3vh] px-[4.5vw] rounded-[0.5rem] shadow text-[1.1rem]";
  const defaultCategoryCss =
    "text-base text-C333333 px-[4.5vw] py-[0.3vh] text-[1.1rem]";

  interface BoardData {
    id: number;
    title: string;
    summary: string;
    thumbnail: string | null;
    createdTime: string;
    likeCount: number;
    commentCount: number;
    authorNickname: string;
  }

  const [boardData, setBoardData] = useState<BoardData[]>([]);

  const handleUserCategoryClick = (selection: string) => {
    setCategory(selection);
    setSelectedFilter("최신순");
    setPageNo(0);
    setBoardData([]);
    setHasMore(true);
  };

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
    setPageNo(0);
    setBoardData([]);
    setHasMore(true);
  };

  //무한스크롤 관련 코드
  const callBoardData = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetchBoardList({
        pageNo,
        size,
        category,
        sort: selectedFilter,
        userId,
      });
      setBoardData((prevBoardData) =>
        pageNo === 0 ? data : [...prevBoardData, ...data]
      );
      setHasMore(data.length === size);
    } catch (error) {
      console.error("보드 데이터 호출 중 에러:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    callBoardData();
  }, [pageNo, size, category, selectedFilter, userId]);

  const loadMoreItems = () => {
    if (hasMore && !isLoading) {
      setPageNo((prevPageNo) => prevPageNo + 1);
    }
  };

  const [observe, unobserve] = useIntersectionObserver(loadMoreItems);

  useEffect(() => {
    if (elementRef.current) {
      observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        unobserve(elementRef.current);
      }
    };
  }, [hasMore, isLoading]);
  //여기까지 무한스크롤 관련 코드

  // 뒤로갔을 때 스크롤 유지 : TODO FIX
  const handleBoardCardClick = async (link: string) => {
    if (category && selectedFilter) {
      setCategoryAndFilters(category, selectedFilter);
    } else if (category) {
      setCategoryAndFilters(category, null);
    }
    await setScrollDataInStorage();
    navigate(link);
  };

  const setScrollDataInStorage = async () => {
    sessionStorage.setItem("BoardDataList", JSON.stringify(boardData));
    sessionStorage.setItem("hasMore", hasMore.toString());
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
  };

  useEffect(() => {
    const item = sessionStorage.getItem("BoardDataList");
    const savedBoardData = item ? JSON.parse(item) : null;
    const savedHasMore = sessionStorage.getItem("hasMore");
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");

    if (savedBoardData) {
      setBoardData(savedBoardData);
      setHasMore(savedHasMore === "true");
      setScrollPosition(Number(savedScrollPosition));
    } else {
      callBoardData();
    }
  }, []);

  useEffect(() => {
    if (boardData.length > 0) {
      sessionStorage.setItem("BoardDataList", JSON.stringify(boardData));
      sessionStorage.setItem("hasMore", hasMore.toString());
      sessionStorage.setItem("scrollPosition", scrollPosition.toString());
    }
  }, [boardData, hasMore, scrollPosition]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollPosition);
    }
  }, [scrollPosition]);

  useEffect(() => {
    if (isScrollRestored) {
      sessionStorage.removeItem("BoardDataList");
      sessionStorage.removeItem("hasMore");
      sessionStorage.removeItem("scrollPosition");
    }
  }, [isScrollRestored]);
  //여기까지 스크롤 유지 관련 코드

  useEffect(() => {
    console.log(scrollPosition);
  }, [scrollPosition]);

  const handleScroll = ({ target }: any) => {
    setScrollPosition((target as HTMLDivElement).scrollTop);
  };

  return (
    <div className="py-[2vh] px-[4.5vw]">
      <Header
        text="핀"
        type="textCenterSearchRight"
        searchBtn={handleSearchBtnClick}
      />
      <div className="mt-[4vh]"></div>

      <div className="flex justify-between text-sm">
        {categories.map((cat) => (
          <p
            key={cat}
            className={`${category === cat ? selectedCategoryCss : defaultCategoryCss
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
      {boardData.map((data, index) => (
        <React.Fragment key={index}>
          <div onClick={() => handleBoardCardClick(`/board/${data.id}`)}>
            <BoardCard
              title={data.title}
              description={data.summary}
              author={data.authorNickname}
              time={data.createdTime}
              heartCount={data.likeCount}
              replyCount={data.commentCount}
              // imageUrl="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-business-men-icon-png-image_925963.jpg"
              imageUrl={data.thumbnail}
              authorImageUrl="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-business-men-icon-png-image_925963.jpg"
            />
          </div>
        </React.Fragment>
      ))}
      {hasMore && (
        <div ref={elementRef} style={{ textAlign: "center" }}>
          {isLoading ? <LoadingSpinner /> : ""}
        </div>
      )}

      <Link to={`/board/write`}>
        <img className="fixed bottom-[8vh] right-[4vw] z-5" src={writeButton} />
      </Link>
      <div className="pb-[7.5vh]" />
      <Navbar />
    </div>
  );
}

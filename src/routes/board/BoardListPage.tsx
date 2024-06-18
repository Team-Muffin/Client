import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Dropdown from "../../components/Dropdown";
import writeButton from "../../assets/write-button.svg";
import BoardCard from "../../components/BoardCard";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { fetchBoardList } from "../../libs/apis/board";

export default function BoardListPage() {
  const [userCategory, setUserCategory] = useState("정보");
  const categories = ["정보", "재미", "투자", "기업", "고급"];
  const [pageNo, setPageNo] = useState(0);
  const [size, setSize] = useState(10);
  const [category, setCategory] = useState("1");
  const [userId, setUserId] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("최신순");

  const handleFilterChange = (newFilter: string) => {
    setSelectedFilter(newFilter);
  };

  const handleUserCategoryClick = (selection: string) => {
    setUserCategory(selection);
    if (selection === "정보") {
      setCategory("1");
    } else if (selection === "재미") {
      setCategory("2");
    } else if (selection === "투자") {
      setCategory("3");
    } else if (selection === "기업") {
      setCategory("4");
    } else {
      setCategory("5");
    }
  };

  const selectedCategoryCss =
    "text-base text-C748BFF bg-CECF0FF py-[0.3vh] px-[4.5vw] rounded-[0.5rem] shadow text-[1.1rem]";
  const defaultCategoryCss =
    "text-base text-C333333 px-[4.5vw] py-[0.3vh] text-[1.1rem]";

  // const selectedUserCategoryCss =
  //   "px-[1.2vw] text-C333333 border-solid border-b-2 border-C748BFF text-[0.95rem]";
  // const defaultUserCategoryCss = "px-[1.2vw] text-C333333 text-[0.95rem]";
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
  const callBoardData = async () => {
    try {
      const { data } = await fetchBoardList({
        pageNo: pageNo,
        size: size,
        category: category,
        sort: selectedFilter,
        userId: userId,
      });
      setBoardData(data);
      console.log({ data });
    } catch (error) {
      console.error("보드 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callBoardData();
  }, [pageNo, size, category, selectedFilter, userId]);

  return (
    <div className="py-[2vh] px-[4.5vw]">
      {/* 헤더랑 */}
      <Header text="핀" type={0} />
      <div className="mt-[4vh]"></div>
      {/* 세트로 들고 다녀야 됨 */}

      <div className="flex justify-between  text-sm">
        {categories.map((cat) => (
          <p
            key={cat}
            className={`${
              userCategory === cat ? selectedCategoryCss : defaultCategoryCss
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
      />

      <hr className="border-CD9D9D9 mt-[1vh]" />
      {boardData.map((data, index) => (
        <React.Fragment key={index}>
          <BoardCard
            title={data.title}
            description={data.summary}
            author={data.authorNickname}
            time={data.createdTime}
            heartCount={data.likeCount}
            replyCount={data.commentCount}
            imageUrl="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-business-men-icon-png-image_925963.jpg"
            // imageUrl={data.thumbnail}
            authorImageUrl="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-business-men-icon-png-image_925963.jpg"
            link={`board/${data.id}`}
          />
        </React.Fragment>
      ))}

      <Link to={`/boardWrite`}>
        <img className="fixed bottom-[8vh] right-[4vw] z-5" src={writeButton} />
      </Link>
      <div className="pb-[7.5vh]" />
      <Navbar />
    </div>
  );
}

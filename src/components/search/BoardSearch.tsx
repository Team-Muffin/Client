import React from "react";
import { useState, useRef, useEffect } from "react";
import CategoryTabs from "../common/CategoryTabs";
import { BoardData, fetchSearchedBoardList } from "../../libs/apis/search";
import { useNavigate } from "react-router-dom";
import BoardCard from "../common/BoardCard";

interface BoardSearchProps {
  keyword: string;
}

const BoardSearch: React.FC<BoardSearchProps> = ({ keyword }) => {
  const navigate = useNavigate();
  const categories = ["정보", "재미", "투자", "기업", "고급"];
  const [category, setCategory] = useState("정보");
  const [boardData, setBoardData] = useState<BoardData[]>([]);
  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
  };
  const handleBoardCardClick = async (link: string) => {
    navigate(link);
  };

  const callBoardData = async () => {
    try {
      const { data } = await fetchSearchedBoardList({
        keyword,
        category: category,
      });
      console.log(data);
      setBoardData(data);
    } catch (error) {
      console.log("게시글 검색 리스트 불러오는 중 오류");
    }
  };

  useEffect(() => {
    callBoardData();
    console.log(boardData);
  }, [keyword, category]);

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
        {boardData.length === 0 && (
          <>
            <div className="text-C333333 py-[2vh] px-[1.5vh] text-[0.9rem]">
              "{keyword}" 검색 결과가 없습니다.
            </div>
          </>
        )}

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
                imageUrl="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-business-men-icon-png-image_925963.jpg"
                // imageUrl={data.thumbnail}
                authorImageUrl="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-business-men-icon-png-image_925963.jpg"
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default BoardSearch;

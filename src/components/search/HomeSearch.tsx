import React from "react";
import { useState, useRef, useEffect } from "react";
import CategoryTabs from "../common/CategoryTabs";
import BoardCard from "../common/BoardCard";
import {
  fetchSearchedBoardList,
  BoardData,
  fetchSearchedChallengeList,
  ChallengeData,
  fetchSearchedProductList,
  ProductList,
  fetchSearchedUserList,
  User,
} from "../../libs/apis/search";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import ChallengeCardHorizontal from "../common/ChallengeCardHorizontal";
import UserCard from "./UserCard";

interface HomeSearchProps {
  keyword: string;
}

const HomeSearch: React.FC<HomeSearchProps> = ({ keyword }) => {
  const navigate = useNavigate();
  const categories = ["핀", "챌린지", "상품", "유저"];
  const [category, setCategory] = useState("핀");
  const [boardData, setBoardData] = useState<BoardData[]>([]);
  const [challengeData, setChallengeData] = useState<ChallengeData[]>([]);
  const [productData, setProductData] = useState<ProductList[]>([]);
  const [userData, setUserData] = useState<User[]>([]);

  const [finPageNo, setFinPageNo] = useState(0);
  const [productPageNo, setProductPageNo] = useState(0);
  const [userPageNo, setUserPageNo] = useState(0);

  const [pageNo, setPageNo] = useState(0);
  const [size, setSize] = useState(10);
  const [userLimit, setUserLimit] = useState(10);
  const [userLast, setUserLast] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("최신순");

  const callBoardData = async () => {
    try {
      const { data } = await fetchSearchedBoardList({
        keyword,
      });
      console.log(data);
      setBoardData(data);
    } catch (error) {
      console.log("게시글 검색 리스트 불러오는 중 오류");
    }
  };

  const callChallengeData = async () => {
    try {
      const { data } = await fetchSearchedChallengeList(keyword);
      console.log(data);
      setChallengeData(data);
    } catch (error) {
      console.log("챌린지 검색 리스트 불러오는 중 오류");
    }
  };

  const callProductData = async () => {
    try {
      const { data } = await fetchSearchedProductList(
        keyword,
        productPageNo,
        size
      );

      setProductData(data.data["searched products"]);
    } catch (error) {
      console.log("챌린지 검색 리스트 불러오는 중 오류", error);
    }
  };

  const callUserData = async () => {
    try {
      const { data } = await fetchSearchedUserList(
        keyword,
        userLimit,
        userLast
      );
      console.log(data);
      setUserData(data.data.users);
    } catch (error) {
      console.log("유저 검색 리스트 불러오는 중 오류", error);
    }
  };

  useEffect(() => {
    if (category === "챌린지") {
      callChallengeData();
    } else if (category === "상품") {
      callProductData();
    } else if (category === "유저") {
      callUserData();
    } else if (category === "핀") {
      callBoardData();
    }
  }, [keyword, category]);

  // //무한스크롤 관련 코드
  // const callBoardData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const { data } = await fetchBoardList({
  //       pageNo,
  //       size,
  //       category,
  //       sort: "최신순",
  //       userId,
  //     });
  //     setBoardData((prevBoardData) =>
  //       pageNo === 0 ? data : [...prevBoardData, ...data]
  //     );
  //     setHasMore(data.length === size);
  //   } catch (error) {
  //     console.error("보드 데이터 호출 중 에러:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   callBoardData();
  // }, [pageNo, size, category, selectedFilter, userId]);

  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
  };

  const handleBoardCardClick = async (link: string) => {
    navigate(link);
  };

  return (
    <>
      <CategoryTabs
        categories={categories}
        userCategory={category}
        handleUserCategoryClick={handleCategoryClick}
        width={15}
      />
      <div className="py-[2vh] px-[4.5vw]">
        {category === "핀" && (
          <>
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
          </>
        )}
        {category === "챌린지" && (
          <>
            {challengeData.length === 0 && (
              <>
                <hr />
                <div className="text-C333333 py-[2vh] px-[1.5vh] text-[0.9rem]">
                  "{keyword}" 검색 결과가 없습니다.
                </div>
              </>
            )}
            {challengeData.map((challenge, index) => (
              <div>
                <ChallengeCardHorizontal
                  title={challenge.name}
                  description={challenge.description}
                  participants={challenge.participation}
                  bgColor={"#ffffff"}
                  ChallengeLogo={challenge.logoUrl}
                  reward={challenge.reward}
                  link={`/challenge/${challenge.id}`}
                />
              </div>
            ))}
          </>
        )}
        {category === "상품" && (
          <>
            {productData.length === 0 && (
              <>
                <hr />
                <div className="text-C333333 py-[2vh] px-[1.5vh] text-[0.9rem]">
                  "{keyword}" 검색 결과가 없습니다.
                </div>
              </>
            )}
            {productData &&
              productData.map((data, index) => (
                <div key={data.id}>
                  <ProductCard
                    type={
                      data.categoryName === "펀드" ? "투자" : data.categoryName
                    }
                    productImg={data.cardImage || data.corpImage || ""}
                    productName={data.name}
                    productBrand={data.corpName}
                    benefits={data.tags.slice(0, 2)}
                    reviewCount={data.boardCount}
                    link={`${data.id}`}
                  />
                </div>
              ))}
          </>
        )}
        {category === "유저" && (
          <>
            {userData.length === 0 && (
              <>
                <hr />
                <div className="text-C333333 py-[2vh] px-[1.5vh] text-[0.9rem]">
                  "{keyword}" 검색 결과가 없습니다.
                </div>
              </>
            )}
            {userData &&
              userData.map((data, index) => (
                <div key={data.userId}>
                  <UserCard
                    profileImage={data.profileImage}
                    nickname={data.nickname}
                    tofinId={data.tofinId}
                    userId={data.userId}
                  />
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default HomeSearch;

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import ProductCard from "../../components/common/ProductCard";
import ChallengeCard from "../../components/home/ChallengeCard";
import BoardCardVertical from "../../components/home/BoardCardVertical";
import {
  fetchChallengeList,
  ChallengeList,
  fetchRandomProductList,
  ProductList,
} from "../../libs/apis/home";
import { useInfiniteQuery } from "react-query";
import { fetchBoardList } from "../../libs/apis/board";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Logo from "../../assets/main-logo.svg";

import { getChallengeBgColor } from "../../utils/challengeColorUtil";

export default function HomePage() {
  const [productListData, setProductListData] = useState<ProductList[]>([]);
  const navigate = useNavigate();
  const [productLimit, setProductLimit] = useState(3);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [challengeListData, setChallengeListData] = useState<ChallengeList[]>(
    []
  );

  const callChallengeData = async () => {
    try {
      const { data } = await fetchChallengeList();
      setChallengeListData(data);
    } catch (error) {
      console.error("홈 챌린지 리스트 데이터 호출 중 에러:", error);
    }
  };

  const callProductListData = async () => {
    try {
      const response = await fetchRandomProductList(productLimit);

      if (response.data) {
        setProductListData(response.data.data["randomProducts"]);
      } else {
        console.error("상품 렌담 리스트 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("상품 랜덤 리스트 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callChallengeData();
    callProductListData();
  }, []);

  const fetchCombinedData = async (pageParam: number) => {
    const boardResponse = await fetchBoardList({
      pageNo: pageParam,
      size: 10,
      category: "정보",
      sort: "최신순",
    });

    const productResponse = await fetchRandomProductList(productLimit);

    return {
      boards: boardResponse.data.data,
      products: productResponse.data.data["randomProducts"],
    };
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isError } =
    useInfiniteQuery(
      ["combinedData"], // useInfiniteQuery의 key로 사용될 배열
      ({ pageParam = 0 }) => fetchCombinedData(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.boards.length === 10 && lastPage.products.length === 3
            ? allPages.length
            : undefined;
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

  const handleSearchBtnClick = () => {
    navigate(`/search`, {
      state: { domain: "home" },
    });
  };

  const handleChallengeCardClick = (id: number) => {
    navigate(`/challenge/${id}`);
  };

  const handleNotificationBtnClick = () => {
    navigate("/notification");
  };

  const handleChallengeMoreBtnClick = () => {
    navigate("/challenge");
  };

  const challengeDescription = [
    "매일의 감정에 따라 저축해봐요!",
    "저렴한 재료로 맛있는 요리를 만들어봐요!",
    "유익한 금융 도서를 추천해 보세요!",
    "ESG 기업을 소개하고 공유해봐요!",
    "관심 기업을 분석하고 정보를 나눠요!",
  ];

  return (
    <>
      <div className="pt-[2vh] px-[4.5vw]">
        <Header
          type="logoLeftSearchAndAlarmRight"
          searchBtn={handleSearchBtnClick}
          notiBtn={handleNotificationBtnClick}
        />
        <div className="mt-[5.5vh]"></div>

        <div className="flex justify-between items-center mb-[1.5vh]">
          <span className="font-semibold text-[1.2rem]">요즘 뜨는 챌린지 </span>{" "}
          <p
            className="text-[0.75rem] text-C333333 "
            onClick={handleChallengeMoreBtnClick}
          >
            더보기 {">"}
          </p>
        </div>

        <div className="whitespace-nowrap overflow-x-auto flex scrollbar-hide">
          {challengeListData.map((challenge, index) => (
            <div key={index}>
              <div onClick={() => handleChallengeCardClick(challenge.id)}>
                <ChallengeCard
                  title={challenge.name}
                  description={challengeDescription[index]}
                  participants={challenge.participation}
                  bgColor={getChallengeBgColor(challenge.id)}
                  ChallengeLogo={challenge.logoUrl}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center my-[1.5vh]">
          <span className="font-semibold text-[1.2rem]">맞춤 핀 </span>{" "}
        </div>

        {data &&
          data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.boards.map((board, boardIndex) => (
                <BoardCardVertical
                  key={`board-${pageIndex}-${boardIndex}`}
                  title={board.title}
                  description={board.summary}
                  author={board.authorNickname}
                  time={board.createdTime}
                  heartCount={board.likeCount}
                  replyCount={board.commentCount}
                  imageUrl={board.thumbnail || Logo}
                  authorImageUrl={board.authorProfile}
                  link={`board/${board.id}`}
                />
              ))}
              <hr />
              <div className="flex justify-between items-center mt-[1.5vh]">
                <span className="font-medium text-[1rem]">
                  이런 상품은 어때요?
                </span>{" "}
              </div>
              <div className="slider-container pb-[4vh] w-[85vw] m-auto 0">
                <Slider {...settings}>
                  {page.products.map((product, productIndex) => (
                    <ProductCard
                      key={`product-${pageIndex}-${productIndex}`}
                      type={
                        product.categoryName === "펀드"
                          ? "투자"
                          : product.categoryName
                      }
                      productImg={product.cardImage || product.corpImage || ""}
                      productName={product.name}
                      productBrand={product.corpName}
                      benefits={product.tags.slice(0, 2)}
                      reviewCount={product.boardCount}
                      link={`${product.id}`}
                    />
                  ))}{" "}
                </Slider>
              </div>
            </React.Fragment>
          ))}
        <hr />
        <div ref={observerRef} className="pb-[8.5vh]" />
      </div>

      {isLoading && <LoadingSpinner />}
      {isError && <p>Error loading data...</p>}

      <div className="pb-[7.5vh]" />
      <Navbar />
    </>
  );
}

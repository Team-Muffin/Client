import { useState, useRef, useCallback, useEffect } from "react";
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import BoardCard from "../../components/common/BoardCard";
import { useLocation, useParams } from "react-router";
import { fetchBoardList, BoardData } from "../../libs/apis/product";
import { useInfiniteQuery } from "react-query";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Link } from "react-router-dom";

export default function RelatedBoardPage() {
  const location = useLocation();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();
  const productId = params.productId ?? "";
  const [size, setSize] = useState(10);
  const fetchBoardListData = async (pageParam: number) => {
    const response = await fetchBoardList({
      pageNo: pageParam,
      size: size,
      productId: Number(productId),
    });

    return response.data;
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isError } =
    useInfiniteQuery(
      ["related-board"], // useInfiniteQuery의 key로 사용될 배열
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
      threshold: 0,
    });

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  return (
    <>
      <Header text={"관련 핀"} type="backLeftTextCenter" />
      <div className="mt-[4vh]" />

      <div className="py-[2vh]  px-[4.5vw] pb-[1vh]">
        <div className="flex justify-between">
          <div className="flex justify-between items-center"></div>
        </div>
        <hr className="border-CD9D9D9 mt-[1vh]" />
        <div>
          {data && data.pages.length == 0 && (
            <div className="text-center rounded-[1rem] w-full h-[10vh] mt-[1.5vh] shadow-productCard flex text-C333333 items-center justify-center">
              관련 핀이 없습니다.
            </div>
          )}
          {data &&
            data.pages.map((item, index) => (
              <div key={index}>
                <Link to={`/board/${item.id}`}>
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
                </Link>
              </div>
            ))}
        </div>
      </div>
      <div ref={observerRef} className="pb-[1.5vh]" />

      {isLoading && <LoadingSpinner />}
      {isError && <p>Error loading data...</p>}

      <div className="pb-[8.5vh]" />
      <Navbar />
    </>
  );
}

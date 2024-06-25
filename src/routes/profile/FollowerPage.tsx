import React from "react";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/common/Header";
import UserCard from "../../components/search/UserCard";
import { getFollowerList, UserData } from "../../libs/apis/user";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const FollowingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("userId"));
  const userLimit = 10;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["followerList", id],
      ({ pageParam = null }) => getFollowerList(id, userLimit, pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.data.last) return false;
          return lastPage.data.lastIndex;
        },
      }
    );

  console.log(data);

  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      <div className="py-[2vh] px-[4.5vw]">
        <Header text="팔로워" type="backLeftTextCenter" />
        <div className="mt-[5.5vh]">
          {data?.pages.flatMap((page) =>
            page.data.users.map((user: UserData) => (
              <UserCard
                key={user.userId}
                profileImage={user.profileImage}
                nickname={user.nickname}
                tofinId={user.tofinId}
                userId={user.userId}
              />
            ))
          )}
          <div ref={loadMoreRef}>
            {isFetchingNextPage ? (
              <LoadingSpinner />
            ) : (
              hasNextPage && <p>더보기</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowingPage;

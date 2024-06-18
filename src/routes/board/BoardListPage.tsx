import { useState, useEffect } from "react";
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

  const handleUserCategoryClick = (selection: string) => {
    setUserCategory(selection);
  };

  const selectedCategoryCss =
    "text-base text-C748BFF bg-CECF0FF py-[0.3vh] px-[4.5vw] rounded-[0.5rem] shadow text-[1.1rem]";
  const defaultCategoryCss =
    "text-base text-C333333 px-[4.5vw] py-[0.3vh] text-[1.1rem]";

  // const selectedUserCategoryCss =
  //   "px-[1.2vw] text-C333333 border-solid border-b-2 border-C748BFF text-[0.95rem]";
  // const defaultUserCategoryCss = "px-[1.2vw] text-C333333 text-[0.95rem]";

  const [boardData, setBoardData] = useState([]);
  const callBoardData = async () => {
    try {
      const response = await fetchBoardList(1, 10, 1, "popular");
      console.log(response);
    } catch (error) {
      console.error("보드 데이터 호출 중 에러:", error);
    }
  };
  useEffect(() => {
    callBoardData();
  }, []);

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

      <Dropdown defaultFilter="인기순" filterList={["인기순", "최신순"]} />

      <hr className="border-CD9D9D9 mt-[1vh]" />
      <BoardCard
        title="⭐️내가 들었던 펀드 추천 글⭐️"
        description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
        author="이듀미"
        time="3"
        heartCount={7}
        replyCount={3}
        imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
        link="boardDetail"
      />
      <BoardCard
        title="⭐️내가 들었던 펀드 추천 글⭐️"
        description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
        author="이듀미"
        time="3"
        heartCount={7}
        replyCount={3}
        imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
        link=""
      />
      <BoardCard
        title="⭐️내가 들었던 펀드 추천 글⭐️"
        description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
        author="이듀미"
        time="3"
        heartCount={7}
        replyCount={3}
        imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
        link=""
      />
      <BoardCard
        title="⭐️내가 들었던 펀드 추천 글⭐️"
        description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
        author="이듀미"
        time="3"
        heartCount={7}
        replyCount={3}
        imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
        link=""
      />
      <BoardCard
        title="⭐️내가 들었던 펀드 추천 글⭐️"
        description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
        author="이듀미"
        time="3"
        heartCount={7}
        replyCount={3}
        imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
        link=""
      />
      <BoardCard
        title="⭐️내가 들었던 펀드 추천 글⭐️"
        description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
        author="이듀미"
        time="3"
        heartCount={7}
        replyCount={3}
        imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
        link=""
      />
      <BoardCard
        title="⭐️내가 들었던 펀드 추천 글⭐️"
        description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
        author="이듀미"
        time="3"
        heartCount={7}
        replyCount={3}
        imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
        link=""
      />
      <BoardCard
        title="⭐️내가 들었던 펀드 추천 글⭐️"
        description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
        author="이듀미"
        time="3"
        heartCount={7}
        replyCount={3}
        imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
        link=""
      />
      <Link to={`/boardWrite`}>
        <img className="fixed bottom-[8vh] right-[4vw] z-5" src={writeButton} />
      </Link>
      <div className="pb-[7.5vh]" />
      <Navbar />
    </div>
  );
}

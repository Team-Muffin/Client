import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import ProfileCircle from "../../assets/myprofile.svg?react";
import Checked from "../../assets/checked.svg?react";
import MyChallenge from "../../assets/challenge-count.svg?react";
import Navbar from "../../components/Navbar";
import MyResponsivePie from "./PieChart";
import MyResponsiveBar from "./BarChart";
const ProfilePage = () => {
  const [userCategory, setUserCategory] = useState("게시물");
  const [isFollowing, setIsFollowing] = useState(false);

  const categories = ["게시물", "챌린지", "포트폴리오", "보유상품"];

  const data = [
    {
      id: "stylus",
      label: "stylus",
      value: 276,
      color: "hsl(219, 70%, 50%)",
    },
    {
      id: "sass",
      label: "sass",
      value: 85,
      color: "hsl(243, 70%, 50%)",
    },
    {
      id: "c",
      label: "c",
      value: 430,
      color: "hsl(164, 70%, 50%)",
    },
    {
      id: "ruby",
      label: "ruby",
      value: 98,
      color: "hsl(103, 70%, 50%)",
    },
    {
      id: "php",
      label: "php",
      value: 29,
      color: "hsl(314, 70%, 50%)",
    },
  ];

  const asset = [
    {
      id: "networth",
      입출금: 10,
      저축: 37,
      투자: 53,
    },
  ];

  const handleUserCategoryClick = (selection: string) => {
    setUserCategory(selection);
  };

  const handleFollowButtonClick = () => {
    setIsFollowing((prevState) => !prevState);
  };

  const selectedUserCategoryCss =
    "px-[1.2vw] text-C333333 border-solid border-b-2 border-C748BFF";
  const defaultUserCategoryCss = "px-[1.2vw] text-C333333";

  return (
    <>
      <div className="py-[2vh] px-[4.5vw]">
        <Header text="마이페이지" type={2} />
        <div className="mt-[5.5vh]"></div>
        <div className="flex justify-center gap-[7vw]">
          <div className="flex flex-col items-center mt-[3vh]">
            <p className="text-base">팔로워</p>
            <p className="text-xl font-bold">10K</p>
          </div>

          <ProfileCircle className="w-[35vw]" />

          <div className="flex flex-col items-center mt-[3vh]">
            <p className="text-base">팔로우</p>
            <p className="text-xl font-bold">10</p>
          </div>
        </div>
        <div className="flex justify-center gap-[9vw] items-center">
          <Link to="/challenge/detail/stampboard">
            <MyChallenge />
          </Link>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <p className="text-2xl mr-[2vw]">홍길동</p>
              <Checked />
            </div>
            <p className="text-base mr-[2vw] mb-[0.3vh]">@gildong</p>
            <p className="text-xs text-[#748BFF]">30대 백수</p>
          </div>
          <button
            className="text-base font-semibold text-[#748BFF] bg-[#ECF0FF] rounded-3xl shadow my-[2vh] px-[5vw]"
            onClick={handleFollowButtonClick}
          >
            {isFollowing ? "팔로잉" : "팔로우"}
          </button>
        </div>
      </div>
      <div className="w-full h-[2vh] bg-[#F4F3F8] mb-[2vh]"></div>

      <div className="flex justify-around text-sm">
        {categories.map((cat) => (
          <p
            key={cat}
            className={`${
              userCategory === cat
                ? selectedUserCategoryCss
                : defaultUserCategoryCss
            } cursor-pointer`}
            onClick={() => handleUserCategoryClick(cat)}
          >
            {cat}
          </p>
        ))}
      </div>

      {userCategory === "포트폴리오" && (
        <div className="flex flex-col px-[4.5vw] py-[2vh]">
          <p className="text-lg ml-[3vw]">홍길동님의 순자산</p>
          <p className="text-xl font-bold ml-[3vw]">3000만원대</p>
          <div style={{ height: "20vh" }}>
            <MyResponsiveBar data={asset} />
          </div>

          <div className="flex justify-center">
            <div style={{ height: "30vh", width: "70vw" }}>
              <MyResponsivePie data={data} />
            </div>
          </div>
        </div>
      )}
      <Navbar />
    </>
  );
};

export default ProfilePage;

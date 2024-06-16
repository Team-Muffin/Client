import { useState } from "react";
import Header from "../../components/Header";
import ProfileCircle from "../../assets/myprofile.svg?react";
import Checked from "../../assets/checked.svg?react";
import MyChallenge from "../../assets/challenge-count.svg?react";
import Navbar from "../../components/Navbar";

const ProfilePage = () => {
  const [userCategory, setUserCategory] = useState("게시물");
  const categories = ["게시물", "챌린지", "포트폴리오", "보유상품"];
  const handleUserCategoryClick = (selection: string) => {
    setUserCategory(selection);
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
            <p className="text-base">팔로잉</p>
            <p className="text-xl font-bold">10</p>
          </div>
        </div>
        <div className="flex justify-center gap-[9vw] items-center">
          <MyChallenge />
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <p className="text-2xl mr-[2vw]">홍길동</p>
              <Checked />
            </div>
            <p className="text-base mr-[2vw] mb-[0.3vh]">@gildong</p>
            <p className="text-xs text-[#748BFF]">30대 백수</p>
          </div>
          <button className="text-base font-semibold text-[#748BFF] bg-[#ECF0FF] rounded-3xl shadow my-[2vh] px-[5vw]">
            팔로잉
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
      <Navbar />
    </>
  );
};
export default ProfilePage;

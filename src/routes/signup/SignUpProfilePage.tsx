// pages/SignUpProfilePage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MiniCircle from "../../assets/minicircle.svg";
import ProfileCircle from "../../assets/profile-circle.svg";
import Camera from "../../assets/camera.svg";
import Essential from "../../assets/required.svg";
import UserIcon1 from "../../assets/user-icon1.svg";
import UserIcon2 from "../../assets/user-icon2.svg";
import UserIcon3 from "../../assets/user-icon3.svg";
import UserIcon4 from "../../assets/user-icon4.svg";
import PurpleBtn from "../../components/PurpleBtn";
import { signUp } from "../../libs/apis/user";
import { useAuthStore } from "../../store/useAuthStore";

const SignUpProfilePage = () => {
  const navigate = useNavigate();
  const { userId, userInfo, login } = useAuthStore((state) => ({
    userId: state.userId,
    userInfo: state.userInfo,
    login: state.login,
  }));

  const [nickname, setNickname] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string>("http://naver.com");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCameraClick = () => {
    setIsModalOpen(true);
  };

  const handleIconSelect = (iconUrl: string) => {
    setSelectedIcon(iconUrl);
    setIsModalOpen(false);
  };

  const handleSignUp = async () => {
    if (!userId || !userInfo) {
      console.error("userId 또는 userInfo가 존재하지 않습니다.");
      return;
    }

    const userData = {
      tofinId: userId,
      userInfo,
      profileImg: selectedIcon, // 선택한 아이콘 URL 저장
      nickname,
      birth: birthdate,
    };

    try {
      await signUp(userData);
      // Zustand 상태 업데이트
      login(userId, userInfo, nickname, selectedIcon, birthdate);
      alert("회원가입이 완료되었습니다.");
      navigate("/asset");
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="px-[8vw] pt-[5vh]">
        <div className="flex items-center">
          <p className="text-[#748BFF] text-4xl font-semibold">ToFin</p>
          <p className="text-2xl font-medium ml-[2vw]">에 </p>
        </div>
        <p className="text-2xl font-medium mb-[2.5vh]">
          오신 것을 환영합니다!{" "}
        </p>
        <p className="text-base mb-[4vh]">
          나의 프로필을 작성해주세요. <br />
          프로필은 나중에 수정 혹은 인증이 가능합니다
        </p>
        <div className="flex justify-center mb-[4vh]">
          <div className="relative">
            <img src={ProfileCircle} alt="Profile Circle" />
            <img
              src={selectedIcon}
              alt="Selected Icon"
              className="absolute bottom-0 m-auto w-[100%] h-[90%]"
            />
            <img
              src={Camera}
              alt="Camera"
              className="absolute bottom-0 right-0 cursor-pointer"
              onClick={handleCameraClick}
            />
          </div>
        </div>

        <div className="flex mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">닉네임</p>
          <img src={Essential} alt="Essential" />
        </div>
        <input
          type="text"
          id="nickname"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Nickname"
          required
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <div className="flex mt-[3vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">생년월일</p>
          <img src={Essential} alt="Essential" />
        </div>
        <input
          type="text"
          id="birthdate"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Birthdate"
          required
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <p className="text-lg font-semibold mt-[3vh] mb-[1vh]">직업</p>
        <input
          type="text"
          id="job"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Job"
        />
      </div>

      <div className="fixed w-full px-[8vw] bottom-[3vh]">
        <div className="flex justify-center mb-[3vh]">
          <img src={MiniCircle} alt="Mini Circle" className="w-3 h-3 mr-5" />
          <img
            src={MiniCircle}
            alt="Mini Circle"
            className="w-3 h-3 mr-5"
            style={{
              filter:
                "invert(64%) sepia(69%) saturate(4107%) hue-rotate(206deg) brightness(100%) contrast(102%)",
            }}
          />
          <img src={MiniCircle} alt="Mini Circle" className="w-3 h-3 mr-5" />
          <img src={MiniCircle} alt="Mini Circle" className="w-3 h-3" />
        </div>
        <PurpleBtn
          onClick={handleSignUp}
          label="자산 연결하러 가기"
          to={"/asset"}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">아이콘 선택</h2>
            <div className="grid grid-cols-2 gap-4">
              {[UserIcon1, UserIcon2, UserIcon3, UserIcon4].map(
                (iconUrl, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => handleIconSelect(iconUrl)}
                  >
                    <img src={ProfileCircle} alt="Profile Circle" />
                    <img
                      src={iconUrl}
                      alt={`User Icon ${index + 1}`}
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpProfilePage;

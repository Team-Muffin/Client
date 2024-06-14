import { useState } from "react";
import MiniCircle from "../../assets/minicircle.svg?react";
import ProfileCircle from "../../assets/profile-circle.svg?react";
import Camera from "../../assets/camera.svg?react";
import Essential from "../../assets/required.svg?react";
import UserIcon1 from "../../assets/user-icon1.svg?react";
import UserIcon2 from "../../assets/user-icon2.svg?react";
import UserIcon3 from "../../assets/user-icon3.svg?react";
import UserIcon4 from "../../assets/user-icon4.svg?react";
import PurpleBtn from "../../components/PurpleBtn";

const SignUpProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [SelectedIcon, setSelectedIcon] = useState(() => UserIcon1);

  const handleCameraClick = () => {
    setIsModalOpen(true);
  };

  const handleIconSelect = (
    IconComponent: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & { title?: string | undefined }
    >
  ) => {
    setSelectedIcon(() => IconComponent);
    setIsModalOpen(false);
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
            <ProfileCircle />
            <SelectedIcon className="absolute bottom-0 m-auto w-[100%] h-[90%]" />
            <Camera
              className="absolute bottom-0 right-0 cursor-pointer"
              onClick={handleCameraClick}
            />
          </div>
        </div>

        <div className="flex mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">닉네임</p>
          <Essential />
        </div>
        <input
          type="text"
          id="nickname"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Nickname"
          required
        />

        <div className="flex mt-[3vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">생년월일</p>
          <Essential />
        </div>
        <input
          type="text"
          id="birthdate"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Birthdate"
          required
        />

        <p className="text-lg font-semibold mt-[3vh] mb-[1vh]">직업</p>
        <input
          type="text"
          id="job"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5z"
          placeholder="Job"
          required
        />
      </div>

      <div className="fixed w-full px-[8vw] bottom-[3vh]">
        <div className="flex justify-center mb-[3vh]">
          <MiniCircle className="w-3 h-3 mr-5" />
          <MiniCircle className="w-3 h-3 mr-5" style={{ fill: "#748BFF" }} />
          <MiniCircle className="w-3 h-3 mr-5" />
          <MiniCircle className="w-3 h-3" />
        </div>
        <PurpleBtn to="/signup/assetinfo" label="자산 연결하러 가기" />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">아이콘 선택</h2>
            <div className="grid grid-cols-2 gap-4">
              {[UserIcon1, UserIcon2, UserIcon3, UserIcon4].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => handleIconSelect(Icon)}
                  >
                    <ProfileCircle />
                    <Icon className="absolute top-0 left-0 w-full h-full" />
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

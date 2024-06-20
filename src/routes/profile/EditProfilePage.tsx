import React, { useState } from "react";
import ProfileCircleImg from "../../assets/profile-circle.svg"; // SVG 파일 import
import CameraImg from "../../assets/camera.svg"; // SVG 파일 import
import UserIcon1 from "../../assets/user-icon1.svg?react";
import Essential from "../../assets/required.svg?react";
import PurpleBtn from "../../components/common/PurpleBtn";

export default function EditProfilePage() {
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
        <p className="text-2xl font-medium mb-[4vh]">회원 정보 변경 </p>

        <div className="flex justify-center mb-[4vh]">
          <div className="relative">
            <img src={ProfileCircleImg} alt="Profile Circle" />
            <SelectedIcon className="absolute bottom-0 m-auto w-[100%] h-[90%]" />
            <img
              src={CameraImg}
              alt="Camera"
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

        <p className="text-lg font-semibold mt-[3vh] mb-[1vh]">직업</p>
        <input
          type="text"
          id="job"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Job"
          required
        />
      </div>
      <div className="fixed w-full px-[8vw] bottom-[3vh]">
        <PurpleBtn to="/mypage" label="변경 완료" />
      </div>
    </>
  );
}

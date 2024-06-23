import React, { useState, ChangeEvent } from "react";
import ProfileCircleImg from "../../assets/profile-circle.svg"; // SVG 파일 import
import CameraImg from "../../assets/camera.svg"; // SVG 파일 import
import Essential from "../../assets/required.svg?react";
import PurpleBtn from "../../components/common/PurpleBtn";
import Header from "../../components/common/Header";
import { EditProfile, EditProfileRequest } from "../../libs/apis/user";
import useAuthStore from "../../store/useAuthStore";

export default function EditProfilePage() {
  const [selectedIcon, setSelectedIcon] = useState(ProfileCircleImg); // State to store selected image URL, default to ProfileCircleImg
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to store selected file
  const [nickname, setNickname] = useState(""); // State for nickname input value
  const [job, setJob] = useState(""); // State for job input value
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // State to enable/disable button
  const {id, login} = useAuthStore((state) => ({
    id: state.id,
    login: state.login,
  }));

  // Handle image selection from file input
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedIcon(imageUrl); // Set selected image to state
      setSelectedFile(file); // Set selected file to state
      setIsButtonEnabled(true); // Enable button on image change
    }
  };

  // Handle nickname input change
  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    setIsButtonEnabled(true); // Enable button on nickname change
  };

  // Handle job input change
  const handleJobChange = (event: ChangeEvent<HTMLInputElement>) => {
    setJob(event.target.value);
    setIsButtonEnabled(true); // Enable button on job change
  };

  // Function to handle completion of profile editing
  const handleProfileEdit = async () => {
  try {
    const profileData: EditProfileRequest = {};
    if (nickname) profileData.nickname = nickname;
    if (job) profileData.job = job;

    const res = await EditProfile(profileData, selectedFile || undefined); // EditProfile 함수 호출
    login(id, "", "", "", res.data.accessToken, res.data.refreshToken);
    console.log("프로필 수정 완료!");
  } catch (error) {
    console.error("프로필 변경 중 오류 발생", error);
  }
};

  return (
    <>
      <Header text="회원 정보 변경" type={"backLeftTextCenter"} />
      <div className="mt-[4.5vh]"></div>
      <div className="px-[8vw] pt-[5vh]">
        <div className="flex justify-center mb-[4vh]">
          <div className="relative" style={{ width: "30vw", height: "30vw" }}>
            <img
              src={selectedIcon}
              alt="Profile Icon"
              className="w-full h-full object-cover rounded-full"
            />
            <label htmlFor="fileInput">
              <img
                src={CameraImg}
                alt="Camera"
                className="absolute bottom-0 right-0 cursor-pointer"
              />
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
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
          value={nickname}
          onChange={handleNicknameChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Nickname"
          required
        />

        <p className="text-lg font-semibold mt-[3vh] mb-[1vh]">직업</p>
        <input
          type="text"
          id="job"
          value={job}
          onChange={handleJobChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Job"
          required
        />
      </div>
      <div className="fixed w-full px-[8vw] bottom-[3vh]">
        <PurpleBtn
          label="변경 완료"
          onClick={handleProfileEdit}
        />
      </div>
    </>
  );
}

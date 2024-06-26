import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MiniCircle from "../../assets/minicircle.svg";
import ProfileCircle from "../../assets/profile-circle.svg";
import Camera from "../../assets/camera.svg";
import Essential from "../../assets/required.svg";
import PurpleBtn from "../../components/common/PurpleBtn";
import { fetchJobs, JobResp } from "../../libs/apis/user";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Dialog } from "./Dialog";
import useSignUpStore from "../../store/useSignUpStore";
import useAuth2Store from "../../store/useAuth2Store";

const SignUpProfilePage = () => {
  const navigate = useNavigate();

  const { tofinId, userInfo, clearLoginInfo, setBirth } = useSignUpStore();

  const { signUp } = useAuth2Store((state) => ({
    signUp: state.signUp,
  }));

  const [nickname, setNickname] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>(
    "https://tofin-bucket.s3.ap-northeast-2.amazonaws.com/users/profile/default/user-icon1.svg"
  ); // State to hold profile image URL
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [jobs, setJobs] = useState<string[]>([]); // State for job list
  const [selectedJob, setSelectedJob] = useState<string>(""); // State to hold selected job

  // Array of icon URLs
  const iconUrls = [
    "https://tofin-bucket.s3.ap-northeast-2.amazonaws.com/users/profile/default/user-icon1.svg",
    "https://tofin-bucket.s3.ap-northeast-2.amazonaws.com/users/profile/default/user-icon2.svg",
    "https://tofin-bucket.s3.ap-northeast-2.amazonaws.com/users/profile/default/user-icon3.svg",
    "https://tofin-bucket.s3.ap-northeast-2.amazonaws.com/users/profile/default/user-icon4.svg",
  ];

  useEffect(() => {
    // Fetch job list function when component mounts
    async function fetchJobList() {
      try {
        const response: JobResp = await fetchJobs(""); // API call
        if (response.success) {
          setJobs(response.data); // Update job list state
        } else {
          console.error("Failed to fetch job list:", response.message);
        }
      } catch (error) {
        console.error("Error fetching job list:", error);
      }
    }

    fetchJobList(); // Call fetch job list function
  }, []); // Empty dependency array to run only once

  const handleCameraClick = () => {
    setIsModalOpen(true); // Open modal to select profile icon
  };

  const handleIconSelect = (iconUrl: string) => {
    setProfileImg(iconUrl); // Set selected icon URL directly to profileImg state
    setIsModalOpen(false); // Close modal
  };

  const handleSignUp = async () => {
    if (!tofinId || !userInfo) {
      console.error("userId or userInfo does not exist.");
      return;
    }

    const result = await signUp(
      tofinId,
      userInfo,
      nickname,
      profileImg,
      birthdate,
      selectedJob
    );
    setBirth(birthdate);
    if (result) {
      clearLoginInfo();
      alert("Signed up successfully.");
      navigate("/asset"); // Redirect to asset page
    } else {
      alert("Failed to sign up.");
    }
  };

  return (
    <>
      <div className="px-[8vw] pt-[5vh] pb-[20vh]">
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
              src={profileImg || ProfileCircle} // Display selected profileImg or default
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
        <Dialog birthdate={birthdate} setBirthdate={setBirthdate} />

        {/* <input
          type="text"
          id="birthdate"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Birthdate"
          required
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        /> */}

        <div className="flex mt-[3vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">직업</p>
          <img src={Essential} alt="Essential" />
        </div>
        {/* Job selection dropdown */}
        <Listbox value={selectedJob} onChange={setSelectedJob}>
          <ListboxButton className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1 text-left">
            {selectedJob ? (
              <span className="block truncate">{selectedJob}</span>
            ) : (
              <span className="block text-gray-500 truncate">
                Select your job
              </span>
            )}
          </ListboxButton>
          <ListboxOptions
            className="absolute mt-1 w-[85vw] bg-white shadow-lg max-h-[17vh] rounded-lg py-1 text-base overflow-auto z-10 border border-gray-300"
            style={{ maxHeight: "10vh", bottom: "2vh" }}
          >
            {jobs.map((job, index) => (
              <ListboxOption key={index} value={job}>
                {({ selected }) => (
                  <div
                    className={`${
                      selected ? "bg-blue-100" : ""
                    } cursor-pointer select-none relative py-[2vw] pl-[3vw] pr-[3vw] `}
                    onClick={() => setSelectedJob(job)}
                  >
                    <span
                      className={`block truncate ${
                        selected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {job}
                    </span>
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
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
        <PurpleBtn onClick={handleSignUp} label="자산 연결하러 가기" />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Select Icon</h2>
            <div className="grid grid-cols-2 gap-4">
              {iconUrls.map((iconUrl, index) => (
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
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="pb-[7vh]"></div>
    </>
  );
};

export default SignUpProfilePage;

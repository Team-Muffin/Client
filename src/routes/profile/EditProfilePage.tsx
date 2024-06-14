import { useState } from "react";
import ProfileCircle from "../../assets/profile-circle.svg?react";
import Camera from "../../assets/camera.svg?react";
import UserIcon1 from "../../assets/user-icon1.svg?react";
import Essential from "../../assets/required.svg?react";
import PurpleBtn from "../../components/PurpleBtn";

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

        <p className="text-lg font-semibold mt-[3vh] mb-[1vh]">직업</p>
        <input
          type="text"
          id="job"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5z"
          placeholder="Job"
          required
        />

        <div className="flex justify-between mt-[4vh] mb-[0.5vh]">
          <p className="text-xl font-semibold">자산 공개 여부</p>
          <div className="text-right">
            <p className="text-xs font-normal">
              나의 자산을 공개하고 <br />
              인증된 유저로 활동해보세요:)
            </p>
          </div>
        </div>
        <div className="bg-[#CDCACA] w-full h-[0.2vh]"></div>
        <ul className="max-w-md divide-y divide-gray-200">
          <li className="p-[1vh]">
            <div className="flex justify-between items-center">
              <div className="flex min-w-0 items-center space-x-4 rtl:space-x-reverse">
                <p className="text-sm font-semibold mr-[3vw]">금액</p>
                <p className="text-[0.8rem] font-normal items-center mt-[0.2vh]">
                  나의 자산 금액을 공개합니다
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#748BFF]"></div>
                </label>
              </div>
            </div>
          </li>
          <li className="p-[1vh]">
            <div className="flex justify-between items-center">
              <div className="flex min-w-0 items-center space-x-4 rtl:space-x-reverse">
                <p className="text-sm font-semibold">퍼센트</p>
                <p className="text-[0.8rem] font-normal items-center mt-[0.2vh]">
                  나의 수익률 및 지분을 %로 공개합니다
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#748BFF]"></div>
                </label>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="fixed w-full px-[8vw] bottom-[3vh]">
        <PurpleBtn to="/mypage" label="변경 완료" />
      </div>
    </>
  );
}

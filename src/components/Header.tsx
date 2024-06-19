import React, { useState } from "react";
import SearchBtn from "../assets/search-black.svg";
import BackBtn from "../assets/back.svg";
import SettingBtn from "../assets/settings.svg";
import AlarmBtn from "../assets/alarm.svg";
import Logo from "../assets/main-logo.svg";
import { useNavigate } from "react-router-dom";
import SearchGraybtn from "../assets/search-gray.svg";

import ScrapBtn from "../assets/scrap.svg"; // Import Scrap image
import ReplaceBtn from "../assets/replace.svg"; // Import Replace image
import LogoutBtn from "../assets/logout.svg"; // Import Logout image
import { Link } from "react-router-dom";

type HeaderProps = {
  text?: string;
  type: string;
  to?: number | string;
};

const Header: React.FC<HeaderProps> = ({ text, type, to = -1 }) => {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    if (typeof to === "string") {
      navigate(to);
    } else if (to === -1) {
      navigate(-1);
    }
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#ffffff]">
      <div className="relative flex justify-center items-center h-[6vh]">
        {type === "textCenterSearchRight" && (
          // 가운데 텍스트, 우측 검색
          <>
            <div className="flex-1 text-center font-semibold text-lg">
              {text}
            </div>
            <img src={SearchBtn} alt="Search" className="absolute right-4" />
          </>
        )}
        {type === "backLeftTextCenter" && (
          // 뒤로가기, 가운데 텍스트
          <>
            <img
              src={BackBtn}
              alt="Back"
              className="absolute left-4"
              onClick={handleBackButtonClick}
            />
            <div className="flex-1 text-center font-semibold text-lg">
              {text}
            </div>
          </>
        )}
        {type === "backLeftTextCenterSettingRight" && (
          // 뒤로 가기. 가운데 텍스트. 오른쪽 세팅
          <>
            <img
              src={BackBtn}
              alt="Back"
              className="absolute left-4"
              onClick={handleBackButtonClick}
            />
            <div className="flex-1 text-center font-semibold text-lg">
              {text}
            </div>
            <img
              src={SettingBtn}
              alt="Setting"
              className="absolute right-4 cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownVisible && (
              <div className="absolute right-4 top-12 bg-white border border-gray-300 rounded shadow-lg">
                <ul>
                  <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <img
                      src={ScrapBtn}
                      alt="Scrap"
                      className="mr-[1vw] w-[5vw]"
                    />
                    <span>스크랩</span>
                  </li>
                  <Link to={`/editprofile`}>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                      <img
                        src={ReplaceBtn}
                        alt="Replace"
                        className="mr-[1vw]"
                      />
                      <span>회원정보변경</span>
                    </li>
                  </Link>
                  <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <img
                      src={LogoutBtn}
                      alt="Logout"
                      className="mr-[1vw] ml-[0.3vw]"
                    />
                    <span>로그아웃</span>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
        {type === "textCenter" && (
          // 가운데 텍스트
          <div className="flex-1 text-center font-semibold text-lg">{text}</div>
        )}
        {type === "logoLeftSearchAndAlarmRight" && (
          <>
            <img
              src={Logo}
              className="absolute left-[4vw] h-[4vh]"

              // onClick={handleBackButtonClick}
            />

            <img
              src={SearchBtn}
              className="absolute right-[14vw] h-[2.8vh]"

              // onClick={handleBackButtonClick}
            />
            <img
              src={AlarmBtn}
              className="absolute right-[4vw] h-[2.8vh]"
              // onClick={handleBackButtonClick}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;

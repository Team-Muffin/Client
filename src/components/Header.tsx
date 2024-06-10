import React from "react";
import SearchBtn from "../assets/searchBlack.svg";
import BackBtn from "../assets/back.svg";
import SettingBtn from "../assets/settings.svg";

type HeaderProps = {
  text: string;
  type: number;
  to?: number | string;
};

const Header: React.FC<HeaderProps> = ({ text, type, to = -1 }) => {
  if (type === 0) {
    // 가운데 텍스트, 검색버튼 있음
    return (
      <nav className="fixed top-0 left-0 right-0 bg-[#ffffff]">
        <div className="relative flex justify-center items-center h-[6vh]">
          <div className="flex-1 text-center font-semibold text-lg">{text}</div>
          <img src={SearchBtn} alt="Search" className="absolute right-4" />
        </div>
      </nav>
    );
  }

  if (type === 1) {
    // 가운데 텍스트, 왼쪽 뒤로가기 버튼 있음
    return (
      <nav className="fixed top-0 left-0 right-0 bg-[#ffffff]">
        <div className="relative flex justify-center items-center h-[6vh]">
          <img src={BackBtn} alt="Back" className="absolute left-4" />
          <div className="flex-1 text-center font-semibold text-lg">{text}</div>
        </div>
      </nav>
    );
  }

  if (type === 2) {
    // 뒤로가기, 텍스트, 설정 있음
    return (
      <nav className="fixed top-0 left-0 right-0 bg-[#ffffff]">
        <div className="relative flex justify-center items-center h-[6vh]">
          <img src={BackBtn} alt="Back" className="absolute left-4" />
          <div className="flex-1 text-center font-semibold text-lg">{text}</div>
          <img src={SettingBtn} alt="Setting" className="absolute right-4" />
        </div>
      </nav>
    );
  }

  return null;
};

export default Header;

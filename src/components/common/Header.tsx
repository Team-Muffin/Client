import React, { useState } from "react";
import SearchBtn from "../../assets/search-black.svg";
import BackBtn from "../../assets/back.svg";
import SettingBtn from "../../assets/settings.svg";
import AlarmBtn from "../../assets/alarm.svg";
import Logo from "../../assets/main-logo.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth2Store from "../../store/useAuth2Store";
import { isAssetConnected, becomeFinfluencer } from "../../libs/apis/user";

type HeaderProps = {
  text?: string;
  type: string;
  to?: number | string;
  searchBtn?: () => void;
  notiBtn?: () => void;
  isAlert?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  text,
  type,
  to = -1,
  searchBtn,
  notiBtn,
  isAlert,
}) => {
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    if (typeof to === "string") {
      navigate(to);
    } else if (to === -1) {
      navigate(-1);
    }
  };
  const { setTokenInfo } = useAuth2Store();
  const { logout } = useAuth2Store();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const clickFinfluencerBtn = async () => {
    try {
      const { data } = await becomeFinfluencer();

      if (data.success === true) {
        setTokenInfo(
          data.data.id,
          data.data.nickname,
          data.data.accessToken,
          data.data.refreshToken
        );
        alert("🎉핀플루언서로 등업 완료!🎉");
      }
    } catch (error) {
      alert("🥹핀플루언서가 되기엔 아직 부족해요🥹");
    }
  };

  const handleConnectAsset = () => {
    isAssetConnected()
      .then((res) => {
        if (res) {
          alert("이미 자산 연결이 되어있습니다.");
        } else {
          navigate(`/asset?query=1`);
        }
      })
      .catch((err) => {
        alert("에러 발생");
      });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#ffffff] z-10">
      <div className="relative flex justify-center items-center h-[6vh]">
        {type === "textCenterSearchRight" && (
          // 가운데 텍스트, 우측 검색
          <>
            <div className="flex-1 text-center font-semibold text-lg">
              {text}
            </div>
            <img
              src={SearchBtn}
              alt="Search"
              className="absolute right-4"
              onClick={searchBtn}
            />
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 mr-[1vw]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                    <span>스크랩</span>
                  </li>
                  <Link to={`/editprofile`}>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 mr-[1vw]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>

                      <span>회원정보변경</span>
                    </li>
                  </Link>
                  <div
                    onClick={() => {
                      handleConnectAsset();
                    }}
                  >
                    <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 mr-[1vw]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      <span>자산연결</span>
                    </li>
                  </div>
                  <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 mr-[1vw]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                      />
                    </svg>

                    <span>성향분석</span>
                  </li>
                  <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 mr-[1vw]"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>

                    <span onClick={() => clickFinfluencerBtn()}>핀플 등업</span>
                  </li>
                  <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 mr-[1vw]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                      />
                    </svg>

                    <span onClick={() => logout()}>로그아웃</span>
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
              onClick={searchBtn}
            />

            <div className="absolute right-[4vw] h-[2.8vh]" onClick={notiBtn}>
              <img src={AlarmBtn} className="h-full" />
              {isAlert && (
                <div className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2 transform translate-x-1/2 -translate-y-1/2"></div>
              )}{" "}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;

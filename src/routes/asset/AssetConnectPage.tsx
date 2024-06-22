import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MiniCircle from "../../assets/minicircle.svg";
import Essential from "../../assets/required.svg";
import Checked from "../../assets/checked.svg";
import PurpleBtn from "../../components/common/PurpleBtn";
import useAuthStore from "../../store/useAuthStore";
import { connectAsset, CheckUserContactAvailability } from "../../libs/apis/user";

const AssetConnectPage = () => {
  const navigate = useNavigate();
  const { birthdate, setAssetData } = useAuthStore((state) => ({
    birthdate: state.birthdate,
    setAssetData: state.setAssetData,
  }));


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [name, setName] = useState("");
  const [rrnPart1, setRrnPart1] = useState("");
  const [rrnPart2, setRrnPart2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUserContactAvailable, setIsUserContactAvailable] = useState<
    boolean | null
  >(null);
  const [userContactCheckReason, setUserContactCheckReason] =
    useState<string>("");

  // useEffect to format birthdate and update rrnPart1
  useEffect(() => {
    if (birthdate) {
      const formattedBirthdate = birthdate.replace(/-/g, "").slice(2, 8);
      setRrnPart1(formattedBirthdate);
    }
  }, [birthdate]);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle agreement checkbox change
  const handleAgreementChange = () => {
    setIsAgreed(!isAgreed);
    setIsDropdownOpen(false); // Close dropdown when checked
  };

  // Function to handle phone number input change
  const handlePhoneNumberChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const contact = e.target.value;
    setPhoneNumber(contact);
    if (contact) {
      try {
        const response = await CheckUserContactAvailability(contact);
        console.log("API Response", response);
        setIsUserContactAvailable(response.data.available);
        setUserContactCheckReason(response.data.reason);
      } catch (error) {
        console.error("Error checking user Contact availability:", error);
        setIsUserContactAvailable(false);
        setUserContactCheckReason("오류 발생");
      }
    } else {
      setIsUserContactAvailable(null);
      setUserContactCheckReason("");
    }
  };

  const handleConnectAsset = async() =>{
    const assetInfo = {
      socialName: name,
      backSocialId: rrnPart2,
      contact: phoneNumber
    };
    try {
      const res = await connectAsset(assetInfo);
      setAssetData(res.data);
      console.log(res.data);
      alert("자산 연결 성공")
      navigate("/asset/connect");
    }catch (error){
      console.error("자산 연결 중 오류 발생: ", error);
      
      navigate("/asset");
    }
  }


  // JSX return statement for rendering UI
  return (
    <>
      <div className="px-[8vw] pt-[5vh] relative">
        <p className="text-[#748BFF] text-4xl font-semibold">ToFin</p>
        <p className="text-2xl font-medium mb-[2.5vh]">자산을 연결해주세요 </p>
        <p className="text-base mb-[4vh]">
          나의 자산을 연결할 수 있어요 <br />
          주민등록번호는 뒷자리만 입력해주세요 :)
        </p>

        {/* Agreement dropdown */}
        <div className="flex mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">동의 서약</p>
          <img src={Essential} alt="Essential" />
        </div>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-[2vw] text-left flex justify-between items-center"
          type="button"
          onClick={toggleDropdown}
        >
          나의 자산 연결하기(나의 자산){" "}
          {isAgreed ? (
            <img
              src={Checked}
              alt="Checked Icon"
              className="w-[4.5vw] h-[3vh]"
            />
          ) : (
            <svg
              className="w-[3vw] h-[3vh]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          )}
        </button>

        {/* Dropdown content */}
        {isDropdownOpen && (
          <div className="mt-[2vh] p-[2vh] bg-gray-50 border border-gray-300 w-[84vw] rounded-lg shadow absolute">
            <p className="text-base font-bold mb-[2vw]">제공 동의여부</p>
            <p className="text-base mb-[2vw]">
              본인의 개인(신용)정보를 제공하는 것에 동의합니다.
            </p>
            <p className="text-base font-bold mb-2">고유식별정보 동의 여부</p>
            <p className="text-base mb-2">
              본인의 고유식별정보(주민등록번호) 를 제공하는 것에 동의합니다.
            </p>
            <div className="flex items-center justify-end mt-4">
              <input
                type="checkbox"
                id="agreement"
                checked={isAgreed}
                onChange={handleAgreementChange}
                className="mr-2"
                style={{ color: "#748BFF" }}
              />
              <label htmlFor="agreement" className="text-sm">
                동의
              </label>
            </div>
          </div>
        )}

        {/* Name input */}
        <div className="flex mt-[2vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">이름</p>
          <img src={Essential} alt="Essential" />
        </div>
        <input
          type="text"
          id="Name"
          value = {name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Name"
          required
        />

        {/* Resident registration number */}
        <div className="flex mt-[2vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">주민등록번호</p>
          <img src={Essential} alt="Essential" />
        </div>
        <div className="flex space-x-2">
          <div
            className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-1/2 p-2.5"
            style={{ display: "flex", alignItems: "center" }}
          >
            {rrnPart1}
          </div>
          <input
            type="password"
            id="RRN2"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
            placeholder="●●●●●●●"
            value={rrnPart2}
            onChange={(e) => setRrnPart2(e.target.value)}
            maxLength={7}
            required
          />
        </div>

        {/* Phone number input */}
        <div className="flex mt-[2vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">전화번호</p>
          <img src={Essential} alt="Essential" />
        </div>
        <input
          type="text"
          id="PhoneNumber"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="PhoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        {isUserContactAvailable === null ? null : isUserContactAvailable ? (
          <div className="flex items-center text-green-600">
            사용 가능한 전화번호입니다
            <img src={Checked} alt="Checked Icon" className="w-[4vw] h-[4h]" />
          </div>
        ) : (
          <div className="text-red-600">{userContactCheckReason}</div>
        )}
      </div>

      {/* Footer section with buttons */}
      <div className="fixed w-full px-[8vw] bottom-[3vh]">
        <div className="flex justify-center mb-[3vh]">
          <img
            src={MiniCircle}
            alt="Mini Circle"
            className="w-3 h-3 mr-5"
            style={{ fill: "#748BFF" }}
          />
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
          <img src={MiniCircle} alt="Mini Circle" className="w-3 h-3" />
        </div>
        <PurpleBtn to="/asset/connect" label="나의 자산 연결하기" onClick={handleConnectAsset} />
        <div className="flex justify-center">
          <Link
            to="/signup/success"
            className="text-xs text-[#748BFF] font-medium mt-[1vh]"
          >
            나중에 하기
          </Link>
        </div>
      </div>
    </>
  );
};

export default AssetConnectPage;

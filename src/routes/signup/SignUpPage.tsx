import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { checkUserIdAvailability } from "../../libs/apis/user";
import PurpleBtn from "../../components/common/PurpleBtn";
import miniCircle from "../../assets/minicircle.svg";
import essential from "../../assets/required.svg";
import checkedIcon from "../../assets/checked.svg";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [userInfoCheck, setUserInfoCheck] = useState("");
  const [isUserIdAvailable, setIsUserIdAvailable] = useState<boolean | null>(
    null
  );
  const [userIdCheckReason, setUserIdCheckReason] = useState<string>("");

  const login = useAuthStore((state) => state.login);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/;
    return passwordRegex.test(password);
  };

  const handleNext = () => {
    if (userInfo !== userInfoCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!validatePassword(userInfo)) {
      alert("비밀번호는 영문과 숫자를 조합하여 8자 이상 30자 이하여야 합니다.");
      return;
    }

    if (isUserIdAvailable === false || isUserIdAvailable === null) {
      alert(
        userIdCheckReason ||
          "이미 사용중인 아이디입니다. 다른 아이디를 입력해주세요."
      );
      return;
    }

    login(0, userId, userInfo, "", "", ""); // Call Zustand's login function
    navigate("/signup/profile");
  };

  // Function to check user ID availability
  const checkAvailability = async (id: string) => {
    if (id) {
      try {
        const response = await checkUserIdAvailability(id);
        console.log("API Response:", response); // Debugging line
        setIsUserIdAvailable(response.data.available); // Ensure the response contains 'available' field
        setUserIdCheckReason(response.data.reason);
      } catch (error) {
        console.error("Error checking user ID availability:", error);
        setIsUserIdAvailable(false);
        setUserIdCheckReason("오류 발생");
      }
    } else {
      setIsUserIdAvailable(null);
      setUserIdCheckReason("");
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkAvailability(userId);
    }, 500); // Debounce the API call

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout
  }, [userId]);

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
        <p className="text-base mb-[7vh]">
          먼저 로그인하기 위한 <br />
          아이디와 비밀번호를 입력해주세요{" "}
        </p>
        <div className="flex mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">아이디</p>
          <img src={essential} alt="Essential" />
        </div>
        <input
          type="text"
          id="id"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus
focus
block w-full p-2.5"
          placeholder="ID"
          required
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        {isUserIdAvailable === null ? null : isUserIdAvailable ? (
          <div className="flex items-center text-green-600 mr-[5vw]">
            사용 가능한 아이디입니다
            <img
              src={checkedIcon}
              alt="Checked Icon"
              className="w-[4vw] h-[4h]"
            />
          </div>
        ) : (
          <div className="text-red-600">{userIdCheckReason}</div>
        )}
        <div className="flex mt-[3vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">비밀번호</p>
          <img src={essential} alt="Essential" />
        </div>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus
focus
block w-full p-2.5"
          placeholder="Password"
          required
          value={userInfo}
          onChange={(e) => setUserInfo(e.target.value)}
        />

        <div className="flex mt-[3vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">비밀번호 확인</p>
          <img src={essential} alt="Essential" />
        </div>
        <input
          type="password"
          id="password_check"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Password_check"
          required
          value={userInfoCheck}
          onChange={(e) => setUserInfoCheck(e.target.value)}
        />
      </div>

      <div className="fixed w-full px-[8vw] bottom-[3vh]">
        <div className="flex justify-center mb-[3vh]">
          <img
            src={miniCircle}
            alt="Mini Circle"
            className="w-3 h-3 mr-5"
            style={{
              filter:
                "invert(64%) sepia(69%) saturate(4107%) hue-rotate(206deg) brightness(100%) contrast(102%)",
            }}
          />
          <img src={miniCircle} alt="Mini Circle" className="w-3 h-3 mr-5" />
          <img src={miniCircle} alt="Mini Circle" className="w-3 h-3 mr-5" />
          <img src={miniCircle} alt="Mini Circle" className="w-3 h-3" />
        </div>
        <PurpleBtn
          label="로그인 정보 작성하기"
          onClick={handleNext}
        />
      </div>
    </>
  );
};

export default SignUpPage;

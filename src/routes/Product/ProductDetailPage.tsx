import { useState } from "react";
import Header from "../../components/Header";
import BoardCard from "../../components/BoardCard";
import Navbar from "../Navbar";
import SHCard from "../../assets/card-sh.svg";
import SHLogo from "../../assets/logo-sh.svg";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import Star from "../../assets/star-filled.svg";
import Happy from "../../assets/happy.svg";
import Sad from "../../assets/disappointed.svg";
import StarRate from "../../components/StarRate";
import Character from "../../assets/character1-small.svg";

export default function ProductListPage() {
  const benefits = ["연회비지원", "관리비", "주유", "통신", "대형마트"];
  const [showDetail, setShowDetail] = useState(false);
  const [rating, setRating] = useState(4.26);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const toggleShowDetail = () => {
    setShowDetail((prevState) => !prevState);
  };

  return (
    <>
      <div className="py-[2vh] px-[4.5vw] pb-[1vh]">
        <Header text="Mr.Life" type={1} />
        <div className="mt-[4vh]" />

        <div className="flex justify-center p-[2vh]">
          <img className="" src={SHCard} />
        </div>

        <div>
          <img className="w-[3.5vh] inline mr-[0.6vw]" src={SHLogo} />
          <span className="text-[0.75rem] text-C333333">신한카드</span>
          <div>
            <p className="font-semibold text-[1.25rem] ml-[1.5vw] mb-[0.6vh]">
              신한카드 Mr.Life
            </p>
            <div className="mb-[1vh]">
              {benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="ml-[1.5vw] text-[0.7rem] mr-[1vw] p-[1vw] bg-CECF0FF rounded-[0.25rem]"
                >
                  #{benefit}
                </span>
              ))}
            </div>
            <div className="flex ml-[1.5vw] items-center">
              <img src={Star} className="h-[1.8vh]" />
              <span className="ml-[0.25vh] text-[0.85rem]">4.26 (20,239)</span>
            </div>

            <div className="flex mt-[1vh] bg-[#F4F3F8] rounded-[1rem] p-[0.5vh]">
              <table className="  m-[1.5vw]  text-xs">
                <tr>
                  <td className="mr-[3vw] w-[20vw] text-[#80848B] p-[2vw]">
                    연회비지원
                  </td>
                  <td className="p-[2vw]">신규 고객 연회비 100% 캐시백!</td>
                </tr>
                <tr>
                  <td className="mr-[3vw] w-[20vw] text-[#80848B] p-[2vw] pt-0">
                    관리비
                  </td>
                  <td className="p-[2vw] pt-0">전기·도시가스 10% 할인!</td>
                </tr>
                <tr>
                  <td className="mr-[3vw] w-[20vw] text-[#80848B] p-[2vw] pt-0">
                    주유
                  </td>
                  <td className="p-[2vw] pt-0">4대 주유소 리터당 60원 할인!</td>
                </tr>
              </table>
            </div>

            {showDetail ? (
              <>
                <div
                  className="justify-center flex mt-[1vh] cursor-pointer"
                  onClick={toggleShowDetail}
                >
                  <span className="text-C333333 text-sm">상세정보 보기</span>
                  <ChevronUpIcon
                    className="-mr-1 h-5 w-5 text-C333333"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-xs mt-[2vh] px-[2vh]">
                  · 필요 이상의 신용카드를 발급받을 경우 신용등급이나 이용한도에
                  영향을 미칠 수 있습니다. <br />· 계약을 체결전, 반드시
                  금융상품설명서 및 약관을 확인하시기 바랍니다.
                  <br /> · 금융소비자는 금융소비자보호법 제19조 제1항에 따라
                  해당 금융상품 또는 서비스에 대하여 설명받을 권리가 있습니다.
                  <br /> · 연체이자율은 "회원별, 이용상품별 약정금리+최대 연3%,
                  법정 최고금리(연20%)이내"에서 적용됩니다.
                  <br /> 단,연체 발생 시점에 약정금리가 없는 경우 약정금리는
                  아래와 같이 적용함
                  <br /> - 일시불 거래 연체 시 : 거래 발생 시점의
                  최소기간(2개월) 유이자 할부 금리 <br />
                </p>
              </>
            ) : (
              <div
                className="justify-center flex mt-[1vh] cursor-pointer"
                onClick={toggleShowDetail}
              >
                <span className="text-C333333 text-sm">상세정보 보기</span>
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-C333333"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-[1.5vh] bg-[#F4F3F8]" />
      <div className="py-[2vh] px-[4.5vw] pb-[1vh]">
        <p className="font-medium text-[1rem] ml-[1.5vw]">리뷰 통계</p>
        <div className="flex justify-center p-[5vw]">
          <div className="flex mr-[7vw]">
            <img src={Happy}></img>
            <span className=" ml-[1vw] font-medium text-[#738BFF]">
              유용해요 (18,630)
            </span>
          </div>
          <div className="flex">
            <img src={Sad}></img>
            <span className="ml-[1vw] font-medium text-[#666666]">
              아쉬워요 (180)
            </span>
          </div>
        </div>
      </div>

      <div className="h-[1.5vh] bg-[#F4F3F8]" />
      <div className="py-[2vh] px-[4.5vw] pb-[1vh]">
        <div className="flex justify-between items-center">
          <div className="inline">
            <span className="font-medium text-[1rem] ml-[1.5vw]">리뷰</span>
            <span className="font-medium text-[1rem] ml-[1.5vw] text-[#738BFF]">
              20,239
            </span>
          </div>
          <span className="text-[0.6rem] text-C333333">더보기 {">"}</span>
        </div>

        <p className="text-center font-semibold text-[1.2rem] mt-[1vh]">4.26</p>
        <StarRate rate={4.26} w={20} h={20} />
        <hr className="mt-[2vh]" />

        {/* 리뷰 컴포넌트 */}
        <div className="flex ml-[3vw] items-start my-[2vh]">
          <img className="relative t-0" src={Character} />
          <div className="ml-[2.5vw]">
            <div>
              <span className="font-semibold text-[0.95rem] text-C333333">
                권모술수
              </span>
              <span className="text-[0.8rem] text-[#9B9B9B] ml-[1vw]">
                {" "}
                40대/회사원
              </span>
            </div>
            <div className="flex items-center mt-[0.1vh]">
              <StarRate rate={4.5} w={13} h={13} />
              <span className="text-[0.7rem] text-[#9B9B9B] ml-[1vw]">
                2024.06.02
              </span>
            </div>
            <div className=" mt-[1vh]  text-[0.9rem]">좋네요 추천합니다</div>
          </div>
        </div>

        <hr />
        <div className="flex ml-[3vw] items-start mt-[2vh]">
          <img className="relative t-0" src={Character} />
          <div className="ml-[2.5vw]">
            <div>
              <span className="font-semibold text-[0.95rem] text-C333333">
                권모술수
              </span>
              <span className="text-[0.8rem] text-[#9B9B9B] ml-[1vw]">
                {" "}
                40대/회사원
              </span>
            </div>
            <div className="flex items-center mt-[0.1vh]">
              <StarRate rate={4.5} w={13} h={13} />
              <span className="text-[0.7rem] text-[#9B9B9B] ml-[1vw]">
                2024.06.02
              </span>
            </div>
            <div className=" mt-[1vh]  text-[0.9rem]">좋네요 추천합니다</div>
          </div>
        </div>

        <hr className="mt-[2vh]" />
      </div>
      <div className="h-[1.5vh] bg-[#F4F3F8]" />
      <div className="py-[2vh] px-[4.5vw] pb-[1vh]">
        <div className="flex justify-between items-center">
          <div className="inline">
            <span className="font-medium text-[1rem] ml-[1.5vw]">
              관련 게시글
            </span>
            <span className="font-medium text-[1rem] ml-[1.5vw] text-[#738BFF]">
              9
            </span>
          </div>
          <span className="text-[0.6rem] text-C333333">더보기 {">"}</span>
        </div>

        <BoardCard
          title="⭐️내가 들었던 펀드 추천 글⭐️"
          description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
          author="이듀미"
          time="3"
          heartCount={7}
          replyCount={3}
          imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
          link=""
        />
        <BoardCard
          title="⭐️내가 들었던 펀드 추천 글⭐️"
          description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
          author="이듀미"
          time="3"
          heartCount={7}
          replyCount={3}
          imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
          link=""
        />
      </div>

      <div className="pb-[8.5vh]" />
      <Navbar />
    </>
  );
}

import ShinhanLogo from "../../assets/shinhan-logo.svg?react";
import Checked from "../../assets/checked.svg?react";
import MiniCircle from "../../assets/minicircle.svg?react";

const ConnectedAssetPage = () => {
  return (
    <>
      <div className="px-[8vw] pt-[5vh]">
        <p className="text-[#748BFF] text-4xl font-semibold">ToFin</p>
        <p className="text-2xl font-medium mb-[2.5vh]">자산을 연결해주세요 </p>
        <p className="text-base mb-[4vh]">
          나의 자산을 연결할 수 있어요 <br />
          자산 공개 여부는 설정에서 바꿀 수 있어요
        </p>
        <div className="flex justify-between mb-[0.5vh]">
          <p className="text-xl font-semibold">연결된 자산</p>
          <p className="text-xl font-semibold">
            <span className="text-[#748BFF]">11,257,000</span>
            <span> 원</span>
          </p>
        </div>
        <div className="bg-[#CDCACA] w-full h-[0.2vh]"></div>
        <ul className="max-w-md divide-y divide-gray-200">
          <li className="p-[0.5vh]">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <ShinhanLogo />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold">237,735원</p>
                <p className="text-sm font-normal">쏠편한 입출금통장</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                <Checked />
              </div>
            </div>
          </li>
          <li className="p-[0.5vh]">
            <div className="flex items-center space-x-4 rtl:space-x-reverse ">
              <div className="flex-shrink-0">
                <ShinhanLogo />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold">237,735원</p>
                <p className="text-sm font-normal">쏠편한 입출금통장</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                <Checked />
              </div>
            </div>
          </li>
          <li className="p-[0.5vh]">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <ShinhanLogo />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold">237,735원</p>
                <p className="text-sm font-normal">쏠편한 입출금통장</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                <Checked />
              </div>
            </div>
          </li>
          <li className="p-[0.5vh]">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <ShinhanLogo />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold">237,735원</p>
                <p className="text-sm font-normal">쏠편한 입출금통장</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                <Checked />
              </div>
            </div>
          </li>
        </ul>
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
        <div className="flex justify-center mb-[3vh]">
          <MiniCircle className="w-3 h-3 mr-5" />
          <MiniCircle className="w-3 h-3 mr-5" />
          <MiniCircle className="w-3 h-3 mr-5" style={{ fill: "#748BFF" }} />
          <MiniCircle className="w-3 h-3" />
        </div>
        <button className="text-lg font-normal text-white text-center bg-[#748BFF] rounded-[1rem] shadow py-[2vh] w-full">
          나의 자산 연결하기
        </button>
      </div>
    </>
  );
};
export default ConnectedAssetPage;

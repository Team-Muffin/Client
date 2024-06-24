import MiniCircleImg from "../../assets/minicircle.svg";
import PurpleBtn from "../../components/common/PurpleBtn";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useSignUpStore from "../../store/useSignUpStore";

const ConnectedAssetPage = () => {
  const navigate = useNavigate();
  const { assetData, clear } = useSignUpStore();
  const [totalCash, setTotalCash] = useState<number>(0);
  window.onbeforeunload;

  // Calculate total cash when assetData changes
  useEffect(() => {
    if (assetData && Array.isArray(assetData)) {
      const total = assetData
        .filter((asset) =>
          ["SAVING", "DEPOSIT", "CMA"].includes(asset.productType)
        )
        .reduce((sum, asset) => sum + (asset.cash || 0), 0);
      setTotalCash(total);
    } else {
      setTotalCash(0); // Reset total cash if assetData is not a valid array
    }
  }, [assetData]);

  // Format number with commas
  const formatNumber = (number: number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <>
      <div className="px-[8vw] pt-[5vh]">
        <p className="text-[#748BFF] text-4xl font-semibold">ToFin</p>
        <p className="text-2xl font-medium mb-[2.5vh]">자산을 연결해주세요 </p>
        <p className="text-base mb-[4vh]">
          나의 자산을 연결할 수 있어요 <br />
          다른 유저의 자산도 확인해 보세요 :)
        </p>
        <div className="flex justify-between mb-[0.5vh]">
          <p className="text-xl font-semibold">연결된 자산</p>
          <p className="text-xl font-semibold">
            <span className="text-[#748BFF]">{formatNumber(totalCash)}</span>
            <span> 원</span>
          </p>
        </div>
        <div className="bg-[#CDCACA] w-full h-[0.2vh]"></div>
        {assetData && Array.isArray(assetData) && assetData.length > 0 ? (
          <ul className="max-w-md divide-y divide-gray-200">
            {assetData.map(
              (asset, index) =>
                // Render only if productType is "SAVING", "DEPOSIT", or "CMA"
                (asset.productType === "SAVING" ||
                  asset.productType === "DEPOSIT" ||
                  asset.productType === "CMA") && (
                  <li key={index} className="p-[0.5vh]">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex-shrink-0">
                        <img
                          src={asset.image}
                          className="h-10 w-10"
                          alt={asset.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold">
                          {formatNumber(asset.cash || 0)}원
                        </p>
                        <p className="text-sm font-normal">{asset.name}</p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900"></div>
                    </div>
                  </li>
                )
            )}
          </ul>
        ) : (
          <p className="text-base">연결된 자산이 없습니다.</p>
        )}
        <div className="bg-[#CDCACA] w-full h-[0.2vh]"></div>
      </div>
      <div className="fixed w-full px-[8vw] bottom-[3vh]">
        <div className="flex justify-center mb-[3vh]">
          <img src={MiniCircleImg} className="w-3 h-3 mr-5" alt="Mini Circle" />
          <img src={MiniCircleImg} className="w-3 h-3 mr-5" alt="Mini Circle" />
          <img
            src={MiniCircleImg}
            className="w-3 h-3 mr-5"
            alt="Mini Circle"
            style={{
              filter:
                "invert(64%) sepia(69%) saturate(4107%) hue-rotate(206deg) brightness(100%) contrast(102%)",
            }}
          />
          <img src={MiniCircleImg} className="w-3 h-3" alt="Mini Circle" />
        </div>
        <PurpleBtn
          to="/asset/tendency"
          label="나의 자산 연결하기"
          onClick={clear}
        />
      </div>
    </>
  );
};

export default ConnectedAssetPage;

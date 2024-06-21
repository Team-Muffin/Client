import { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import BoardCard from "../../components/common/BoardCard";
import Navbar from "../../components/common/Navbar";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import Happy from "../../assets/happy.svg";
import Sad from "../../assets/disappointed.svg";

import {
  fetchProductBasic,
  ProductBasic,
  CardProductSummary,
  fetchCardProductSummary,
  SavingProductSummary,
  fetchSavingProductSummary,
  FundProductSummary,
  fetchFundProductSummary,
  fetchLoanProductSummary,
  LoanProductSummary,
} from "../../libs/apis/product";
import { useParams, useLocation } from "react-router-dom";
import ProductSummary from "../../components/product/ProductSummary";

export default function ProductListPage() {
  const [benefits, setBenefits] = useState<
    { title: string; content: string | number }[]
  >([]);
  const [cardBenefits, setCardBenefits] = useState<CardProductSummary | null>(
    null
  );
  const [savingBenefits, setSavingBenefits] =
    useState<SavingProductSummary | null>(null);
  const [fundBenefits, setFundBenefits] = useState<FundProductSummary | null>(
    null
  );
  const [loanBenefits, setLoanBenefits] = useState<LoanProductSummary | null>(
    null
  );

  const [showDetail, setShowDetail] = useState(false);
  const params = useParams();
  const productId = params.productId ?? "";
  const [productBasic, setProductBasic] = useState<ProductBasic | null>(null);
  const [productType, setProductType] = useState("");

  const location = useLocation();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImageSize({
      width: e.currentTarget.width,
      height: e.currentTarget.height,
    });
  };

  const toggleShowDetail = () => {
    setShowDetail((prevState) => !prevState);
  };

  const callProductDetail = async (type: string) => {
    try {
      const response = await fetchProductBasic(productId);
      if (response.data) {
        console.log(response.data);
        setProductBasic(response.data);
      } else {
        console.error("상품 베이직 데이터가 없습니다.");
      }

      if (type === "카드") {
        const cardSummaryResponse = await fetchCardProductSummary(productId);
        if (cardSummaryResponse.data) {
          console.log(cardSummaryResponse.data);
          setCardBenefits(cardSummaryResponse.data);
        } else {
          console.error("상품 카드 데이터가 없습니다.");
        }
      } else if (type === "예적금") {
        const savingSummaryResponse = await fetchSavingProductSummary(
          productId
        );
        if (savingSummaryResponse.data) {
          console.log(savingSummaryResponse.data);
          setSavingBenefits(savingSummaryResponse.data);
        } else {
          console.error("상품 예적금 데이터가 없습니다.");
        }
      } else if (type === "펀드") {
        const fundSummaryResponse = await fetchFundProductSummary(productId);
        if (fundSummaryResponse.data) {
          console.log(fundSummaryResponse.data);
          setFundBenefits(fundSummaryResponse.data);
        } else {
          console.error("상품 펀드 데이터가 없습니다.");
        }
      } else if (type === "대출") {
        const loanSummaryResponse = await fetchLoanProductSummary(productId);
        if (loanSummaryResponse.data) {
          console.log(loanSummaryResponse.data);
          setLoanBenefits(loanSummaryResponse.data);
        } else {
          console.error("상품 대출 데이터가 없습니다.");
        }
      }
    } catch (error) {
      console.error("상품 베이직 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    const productTypeFromState = location.state.productType;
    setProductType(productTypeFromState);
    callProductDetail(productTypeFromState);
  }, [location.state.productType]);

  useEffect(() => {
    const benefitsArray = [];

    if (cardBenefits) {
      benefitsArray.push(
        { title: "연회비", content: cardBenefits.annualFee },
        { title: "기본실적", content: cardBenefits.baseRecord },
        { title: "주요혜택", content: cardBenefits.mainBenefit },
        { title: "알림", content: cardBenefits.notice },
        { title: "부가혜택", content: cardBenefits.subBenefit }
      );
    } else if (savingBenefits) {
      benefitsArray.push(
        { title: "기본", content: `연 ${savingBenefits.interestRate}%` },
        { title: "최고", content: `연 ${savingBenefits.primeInterestRate}%` },
        { title: "기간", content: `${savingBenefits.savingTerm}개월` },
        { title: "특판요약", content: savingBenefits.specialOfferSummary },
        { title: "특판기한", content: savingBenefits.specialOfferPeriod }
      );
    } else if (fundBenefits) {
      benefitsArray.push(
        { title: "펀드번호", content: fundBenefits.fundCode },
        { title: "기준가(원)", content: fundBenefits.stdPrice },
        { title: "기준가대비", content: fundBenefits.diffPrice },
        { title: "운용규모(억)", content: fundBenefits.drvNav },
        { title: "수익률(%,3개월)", content: fundBenefits.rt3m },
        { title: "총보수(%)", content: fundBenefits.ter }
      );
    } else if (loanBenefits) {
      benefitsArray.push(
        { title: "예상최소금리", content: `${loanBenefits.minInterestRate}%` },
        { title: "예상최대금리", content: `${loanBenefits.maxInterestRate}%` },
        { title: "최대한도", content: loanBenefits.maxLoanAmount }
      );
    }

    setBenefits(benefitsArray);
  }, [cardBenefits, savingBenefits, loanBenefits, fundBenefits]);

  useEffect(() => {
    if (benefits.length === 0 && productType) {
      callProductDetail(productType);
      console.log(productType);
    }
  }, [benefits, productType]);

  return (
    <>
      <div className="py-[2vh] px-[4.5vw] pb-[1vh]">
        <Header text={productType} type="backLeftTextCenter" />
        <div className="mt-[4vh]" />
        {productType === "카드" ? (
          <div className="flex justify-center p-[2vh]">
            <img
              className={`${
                imageSize.height > imageSize.width ? "h-[20vh]" : "w-[20vh]"
              } `}
              src={productBasic?.cardImage}
              onLoad={handleImageLoad}
            />
          </div>
        ) : (
          <></>
        )}

        <div>
          <div className="flex items-align">
            <img
              className="w-[3.5vh] inline mr-[0.6vw]"
              src={productBasic?.corpImage}
            />
            <span className="text-[0.85rem] text-C333333 mt-[0.1rem]">
              {productBasic?.corpName}
            </span>
          </div>
          <div>
            <p className="font-semibold text-[1.4rem] ml-[1.5vw] mb-[0.6vh]">
              {productBasic?.name}
            </p>
            <div className="mb-[1vh]">
              {productBasic?.tags.map((benefit, index) => (
                <span
                  key={index}
                  className="ml-[1.5vw] text-[0.75rem] mr-[1vw] p-[1vw] bg-CECF0FF rounded-[0.25rem]"
                >
                  #{benefit}
                </span>
              ))}
            </div>
            <ProductSummary benefits={benefits} />

            {showDetail ? (
              <>
                <div
                  className="justify-center flex mt-[1vh] cursor-pointer"
                  onClick={toggleShowDetail}
                >
                  <span className="text-C333333 text-[0.85rem]">
                    상세정보 보기
                  </span>
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
        <div className="flex justify-between items-center">
          <div className="inline">
            <span className="font-semibold text-[1.15rem] ml-[1.5vw]">
              관련 핀
            </span>
            <span className="font-semibold text-[1.15rem] ml-[1.5vw] text-[#738BFF]">
              9
            </span>
          </div>
          <span className="text-[0.75rem] text-C333333">더보기 {">"}</span>
        </div>

        <BoardCard
          title="⭐️내가 들었던 펀드 추천 글⭐️"
          description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
          author="이듀미"
          time="3"
          heartCount={7}
          replyCount={3}
          imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
        />
        <BoardCard
          title="⭐️내가 들었던 펀드 추천 글⭐️"
          description=" 오늘은 내가 들었던 펀드 중에 가장 좋았던 펀드는 신한은행의"
          author="이듀미"
          time="3"
          heartCount={7}
          replyCount={3}
          imageUrl="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525044423699dwdp.jpg"
        />
      </div>

      <div className="pb-[8.5vh]" />
      <Navbar />
    </>
  );
}

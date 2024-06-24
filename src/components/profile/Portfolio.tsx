import React, { useEffect, useState } from "react";
import MyResponsivePie from "./PieChart";
import MyResponsiveBar from "./BarChart";
import { PortfolioDetails } from "../../libs/apis/user";
import useAuthStore from "../../store/useAuthStore";
import { useSearchParams } from "react-router-dom";

interface PortfolioProps {
  portfolioDetails: PortfolioDetails | null;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolioDetails }) => {
  const [totalAssets, setTotalAssets] = useState<string>("");
  const Id = useAuthStore((state) => state.id);
  const [searchParams] = useSearchParams();
  const otherId = parseInt(searchParams.get("id") || "", 10);

  const formatTotalAmount = (amount: number): string => {
    const hundredMillion = Math.floor(amount / 100000000);
    const tenThousand = Math.floor((amount % 100000000) / 10000);
    const rest = amount % 10000;
    return `${hundredMillion ? `${hundredMillion}억 ` : ""}${tenThousand ? `${tenThousand}만 ` : ""}${rest}원`;
  };

  useEffect(() => {
    if (portfolioDetails) {
      setTotalAssets(formatTotalAmount(portfolioDetails.totalAmount));
    }
  }, [portfolioDetails]);

  const formatPercentage = (value: number) => value.toFixed(2);

  const domesticStocksData = portfolioDetails?.domesticStocks.map((stock) => ({
    id: stock.name,
    label: stock.name,
    value: parseFloat(formatPercentage(stock.rate)),
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  })) || [];

  const foreignStocksData = portfolioDetails?.foreignStocks.map((stock) => ({
    id: stock.name,
    label: stock.name,
    value: parseFloat(formatPercentage(stock.rate)),
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
  })) || [];

  const investData = [
    {
      id: "국내 주식",
      label: "국내 주식",
      value: parseFloat(formatPercentage(portfolioDetails?.domesticRatio || 0)),
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    },
    {
      id: "해외 주식",
      label: "해외 주식",
      value: parseFloat(formatPercentage(portfolioDetails?.foreignRatio || 0)),
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    },
  ];

  const barChartData = [
    {
      id: "자산 비율",
      입출금: parseFloat(formatPercentage(portfolioDetails?.savingRate || 0)),
      저축: parseFloat(formatPercentage(portfolioDetails?.depositRate || 0)),
      CMA: parseFloat(formatPercentage(portfolioDetails?.cmaRate || 0)),
      투자: parseFloat(formatPercentage(portfolioDetails?.investRate || 0)),
      cmaAmount: portfolioDetails?.cmaAmount || 0,
      depositAmount: portfolioDetails?.depositAmount || 0,
    },
  ];

  return (
    <div className="flex flex-col px-[4.5vw] py-[2vh]">
      <p className="text-lg ml-[3vw]">홍길동님의 순자산</p>
      <p className="text-xl font-bold ml-[3vw]">{totalAssets}</p>
      <div style={{ height: "20vh" }}>
        <MyResponsiveBar data={barChartData} />
        {/* Custom Legend Component */}
        {/* <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <div style={{ marginRight: "20px" }}>
            <span style={{ color: "#8DBDFF", marginRight: "5px" }}>입출금:</span>
            {formatTotalAmount(portfolioDetails?.savingAmount || 0)}
          </div>
          <div style={{ marginRight: "20px" }}>
            <span style={{ color: "#748BFF", marginRight: "5px" }}>저축:</span>
            {formatTotalAmount(portfolioDetails?.depositAmount || 0)}
          </div>
          <div style={{ marginRight: "20px" }}>
            <span style={{ color: "#F3C96B", marginRight: "5px" }}>CMA:</span>
            {formatTotalAmount(portfolioDetails?.cmaAmount || 0)}
          </div>
          <div style={{ marginRight: "20px" }}>
            <span style={{ color: "#F3C96B", marginRight: "5px" }}>투자:</span>
            {formatTotalAmount(portfolioDetails?.investAmount || 0)}
          </div>
        </div> */}
      </div>

      <div className="flex flex-col items-center mt-[2vh] ">
        <div style={{ height: "30vh", width: "80vw" }}>
          <p className="text-center font-semibold mb-[2vh]">투자 구성</p>
          <MyResponsivePie data={investData} />
        </div>
        <div style={{ height: "30vh", width: "80vw" }}>
          <p className="text-center font-semibold mb-[2vh] mt-[3vh]">국내주식</p>
          <MyResponsivePie data={domesticStocksData} />
        </div>
        <div style={{ height: "30vh", width: "80vw", marginTop: "5vh" }}>
          <p className="text-center font-semibold mb-[2vh] mt-[3vh]">해외주식</p>
          <MyResponsivePie data={foreignStocksData} />
        </div>
      </div>
      <div className="pb-[5vh]"/>
    </div>
  );
};

export default Portfolio;

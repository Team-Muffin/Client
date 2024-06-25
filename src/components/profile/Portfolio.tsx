import React, { useEffect, useState } from "react";
import MyResponsivePie from "./PieChart";
import MyResponsiveBar from "./BarChart";
import Modal from "../../components/common/Modal";
import fetchFinancialData from "../../libs/apis/dart";  // Adjust the import path as needed
import { PortfolioDetails } from "../../libs/apis/user";
import useAuthStore from "../../store/useAuthStore";
import useAuth2Store from "../../store/useAuth2Store";
import { useSearchParams } from "react-router-dom";
import { PieData } from "./PieChart";  // Import PieData type

interface PortfolioProps {
  portfolioDetails: PortfolioDetails | null;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolioDetails }) => {
  const [totalAssets, setTotalAssets] = useState<string>("");
  const nickname = useAuth2Store((state) => state.nickname);
  const Id = useAuthStore((state) => state.id);
  const [searchParams] = useSearchParams();
  const otherId = parseInt(searchParams.get("id") || "", 10);

  const [selectedStock, setSelectedStock] = useState<null | PieData>(null);
  const [showModal, setShowModal] = useState(false);
  const [financialData, setFinancialData] = useState<any>(null);

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

  const generatePastelColor = () => {
    const hue = Math.random() * 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  const domesticStocksData = portfolioDetails?.domesticStocks.map((stock) => ({
    id: stock.name,
    label: stock.name,
    value: parseFloat(formatPercentage(stock.rate)),
    color: generatePastelColor(),
    corpCode: stock.code,
    dartCode: stock.dartCode
  })) || [];

  const foreignStocksData = portfolioDetails?.foreignStocks.map((stock) => ({
    id: stock.name,
    label: stock.name,
    value: parseFloat(formatPercentage(stock.rate)),
    color: generatePastelColor(),
  })) || [];

  const investData = [
    {
      id: "국내 주식",
      label: "국내 주식",
      value: parseFloat(formatPercentage(portfolioDetails?.domesticRatio || 0)),
      color: generatePastelColor(),
    },
    {
      id: "해외 주식",
      label: "해외 주식",
      value: parseFloat(formatPercentage(portfolioDetails?.foreignRatio || 0)),
      color: generatePastelColor(),
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

  const returnRate = formatPercentage(portfolioDetails?.returnRate || 0);

  const handleStockClick = async (stock: PieData) => {
    setSelectedStock(stock);
    setShowModal(true);
    console.log("Fetching financial data for stock:", stock);
    try {
      const data = await fetchFinancialData(stock.dartCode!);
      console.log("Fetched financial data:", data);
      setFinancialData(data);
    } catch (error) {
      console.error("Error fetching financial data:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStock(null);
    setFinancialData(null);
  };

  const displayFinancialData = () => {
    if (!financialData || !financialData.list) {
      console.log("No financial data or financial data list is empty.");
      return null;
    }
    console.log("Financial data list:", financialData.list);
    const items = [1, 3, 5].map(idx => financialData.list[idx]);
    console.log("Selected items for display:", items);
    return items.map((item, index) => (
      <div key={index}>
        {item ? (
          <p>{item.idx_nm}: {item.idx_val}%</p>
        ) : (
          <p>데이터 없음</p>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col px-[4.5vw] py-[2vh]">
      <p className="text-lg ml-[3vw]">{nickname}님의 순자산</p>
      <p className="text-xl font-bold ml-[3vw]">{totalAssets}</p>
      <div style={{ height: "20vh" }}>
        <MyResponsiveBar data={barChartData} />
      </div>

      <div className="flex flex-col mt-[2vh]">
        <div style={{ height: "30vh", width: "85vw" }}>
          <div className="flex">
            <p className="font-semibold text-lg mb-[2vh] ml-[3vw]">투자 구성</p>
            <p className="font-semibold text-lg ml-[1vw] text-[red]">
              (수익률 {returnRate}%)
            </p>
          </div>
          <MyResponsivePie data={investData} />
        </div>
        <div style={{ height: "30vh", width: "85vw" }}>
          <p className="font-semibold text-lg mb-[2vh] ml-[3vw]">국내주식</p>
          <MyResponsivePie data={domesticStocksData} onClick={handleStockClick} />
        </div>
        <div style={{ height: "30vh", width: "85vw" }}>
          <p className="font-semibold text-lg mb-[2vh] mt-[5vh] ml-[3vw]">해외주식</p>
          <MyResponsivePie data={foreignStocksData} />
        </div>
      </div>
      <div className="pb-[9vh]" />

      {showModal && selectedStock && (
        <Modal onClose={closeModal}>
          <div style={{ width:"80vw"}}>
            <div className="text-xl font-bold mb-[2vh]">{selectedStock.label}</div>
            {financialData ? (
              <div>
                {displayFinancialData()}
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <button onClick={closeModal}></button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Portfolio;

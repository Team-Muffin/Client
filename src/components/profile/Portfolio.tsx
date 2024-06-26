import React, { useEffect, useState } from "react";
import MyResponsivePie from "./PieChart";
import MyResponsiveBar from "./BarChart";
import Modal from "../../components/common/Modal";
import fetchFinancialData from "../../libs/apis/dart";  // Adjust the import path as needed
import { PortfolioDetails, getUserDetails, UserDetailsResponse } from "../../libs/apis/user";
import { useSearchParams } from "react-router-dom";
import { PieData } from "./PieChart";  // Import PieData type

interface PortfolioProps {
  portfolioDetails: PortfolioDetails | null;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolioDetails }) => {
  const [totalAssets, setTotalAssets] = useState<string>("");
  const [userDetails, setUserDetails] = useState<UserDetailsResponse["data"] | null>(null);
  const [searchParams] = useSearchParams();
  const otherId = parseInt(searchParams.get("id") || "", 10);

  const [selectedStock, setSelectedStock] = useState<null | PieData>(null);
  const [showModal, setShowModal] = useState(false);
  const [financialData, setFinancialData] = useState<any>(null);

  useEffect(() => {
    if (otherId) {
      getUserDetails(otherId)
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => {
          console.error("유저 상세 정보 조회 중 오류 발생", error);
        });
    }
  }, [otherId]);

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

  const getData = (details: PortfolioDetails | null) => details || {
    totalAmount: 0,
    savingRate: 0,
    savingAmount: 0,
    depositRate: 0,
    depositAmount: 0,
    cmaRate: 0,
    cmaAmount: 0,
    investRate: 0,
    investAmount: 0,
    returnRate: 0,
    domesticRatio: 0,
    foreignRatio: 0,
    domesticStocks: [],
    foreignStocks: [],
  };

  const data = getData(portfolioDetails);

  const domesticStocksData = data.domesticStocks.map((stock) => ({
    id: stock.name,
    label: stock.name,
    value: parseFloat(formatPercentage(stock.rate)),
    color: generatePastelColor(),
    corpCode: stock.code,
    dartCode: stock.dartCode
  })) || [];

  const foreignStocksData = data.foreignStocks.map((stock) => ({
    id: stock.name,
    label: stock.name,
    value: parseFloat(formatPercentage(stock.rate)),
    color: generatePastelColor(),
  })) || [];

  const investData = [
    {
      id: "국내 주식",
      label: "국내 주식",
      value: parseFloat(formatPercentage(data.domesticRatio || 0)),
      color: generatePastelColor(),
    },
    {
      id: "해외 주식",
      label: "해외 주식",
      value: parseFloat(formatPercentage(data.foreignRatio || 0)),
      color: generatePastelColor(),
    },
  ];

  const barChartData = [
    {
      id: "자산 비율",
      입출금: parseFloat(formatPercentage(data.savingRate || 0)),
      저축: parseFloat(formatPercentage(data.depositRate || 0)),
      CMA: parseFloat(formatPercentage(data.cmaRate || 0)),
      투자: parseFloat(formatPercentage(data.investRate || 0)),
      cmaAmount: data.cmaAmount || 0,
      depositAmount: data.depositAmount || 0,
    },
  ];

  const returnRate = formatPercentage(data.returnRate || 0);

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
      {userDetails && (
        <>
          <p className="text-lg ml-[3vw]">{userDetails.nickname}님의 순자산</p>
          <p className="text-xl font-bold ml-[3vw]">{totalAssets}</p>
        </>
      )}
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
          <div style={{ width: "80vw" }}>
            <div className="text-xl font-bold mb-[2vh]">{selectedStock.label}</div>
            {financialData ? (
              <div>
                {displayFinancialData()}
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Portfolio;

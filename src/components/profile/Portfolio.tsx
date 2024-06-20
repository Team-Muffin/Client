import React from "react";
import MyResponsivePie from "./PieChart";
import MyResponsiveBar from "./BarChart";

interface PortfolioProps {
  barChartData: Array<{
    id: string;
    입출금: number;
    저축: number;
    투자: number;
  }>;
  pieChartData: Array<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
}

const Portfolio: React.FC<PortfolioProps> = ({
  barChartData,
  pieChartData,
}) => (
  <div className="flex flex-col px-[4.5vw] py-[2vh]">
    <p className="text-lg ml-[3vw]">홍길동님의 순자산</p>
    <p className="text-xl font-bold ml-[3vw]">3000만원대</p>
    <div style={{ height: "20vh" }}>
      <MyResponsiveBar data={barChartData} />
    </div>
    <div className="flex justify-center">
      <div style={{ height: "30vh", width: "70vw" }}>
        <MyResponsivePie data={pieChartData} />
      </div>
    </div>
  </div>
);

export default Portfolio;

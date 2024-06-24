import { ResponsiveBar, BarDatum } from "@nivo/bar";
import React from "react";

interface AssetData extends BarDatum {
  id: string;
  입출금: number;
  저축: number;
  CMA: number;
  투자: number;
}

interface MyResponsiveBarProps {
  data: AssetData[];
}

const MyResponsiveBar: React.FC<MyResponsiveBarProps> = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={["입출금", "저축", "CMA", "투자"]}
    margin={{ top: 30, right: 20, bottom: 100, left: 10 }}
    padding={0.2}
    layout="horizontal"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={({ id }) => {
      switch (id) {
        case "입출금":
          return "#8DBDFF";
        case "저축":
          return "#748BFF";
        case "CMA":
          return "#F3C96B";
        case "투자":
          return "#AF9FF3";
        default:
          return "#000000";
      }
    }}
    borderRadius={3}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisLeft={null}
    axisBottom={null}
    label={(d) => `${d.value}%`} 
    enableLabel={false}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-left",
        direction: "column",
        justify: false,
        translateX: 5,
        translateY: 90,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
        
      },
    ]}
    
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={(e) =>
      e.id + ": " + e.formattedValue + "%" + " in category: " + e.indexValue
    }
    tooltip={({ id, value, color }) => (
      <div
        style={{
          padding: 12,
          color,
          background: "#222222",
        }}
      >
        <span>
          {id}: {value}%
        </span>
      </div>
      
    )}
  />
);

export default MyResponsiveBar;

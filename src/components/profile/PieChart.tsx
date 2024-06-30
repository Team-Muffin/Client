import React, { FC } from "react";
import { ResponsivePie, ComputedDatum } from "@nivo/pie";
import styled from "styled-components";

export interface PieData {
  id: string;
  label: string;
  value: number;
  color?: string;
  corpCode?: string;
  dartCode?: string;
}

interface MyResponsivePieProps {
  data: PieData[];
  onClick?: (datum: PieData) => void;
}

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  right: 10px;
  max-width: 150px;
  gap: 4px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 18px;
  height: 18px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;

const LegendLabel = styled.div`
  width: 90px;
  word-wrap: break-word;
  font-size: 10px;
`;

const CustomLegend: FC<{ data: PieData[] }> = ({ data }) => {
  return (
    <LegendContainer>
      {data.map((item) => (
        <LegendItem key={item.id}>
          <LegendColor color={item.color!} />
          <LegendLabel>{item.label}</LegendLabel>
        </LegendItem>
      ))}
    </LegendContainer>
  );
};

const MyResponsivePie: FC<MyResponsivePieProps> = ({ data, onClick }) => {
  const formattedData = data.map((item) => ({
    ...item,
    color: item.color!,
  }));

  return (
    <div style={{ position: 'relative', height: '30vh' }}>
      <ResponsivePie
        data={formattedData}
        margin={{ top: 20, right: 200, bottom: 100, left: 15 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={formattedData.map(d => d.color!)}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsStraightLength={10}
        arcLinkLabelsDiagonalLength={16}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLinkLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        tooltip={({ datum: { id, value, color } }) => (
          <div
            style={{
              padding: 8,
              color,
              background: "#222222",
            }}
          >
            <span>
              {id}: {value}
            </span>
          </div>
        )}
        legends={[]}
        theme={{
          legends: {
            text: {
              fontSize: 10,
            },
          },
        }}
        onClick={(datum) => onClick && onClick(datum.data as PieData)}
      />
      <CustomLegend data={formattedData} />
    </div>
  );
};

export default MyResponsivePie;

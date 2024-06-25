import React, { FC } from "react";
import { ResponsivePie } from "@nivo/pie";

interface PieData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface MyResponsivePieProps {
  data: PieData[];
}

const MyResponsivePie: FC<MyResponsivePieProps> = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 20, right: 120, bottom: 100, left: 5 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={{scheme: 'set3'}}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    enableArcLinkLabels={false}
    arcLinkLabelsColor={{ from: "color" }}
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
          padding: 12,
          color,
          background: "#222222",
        }}
      >
        <span>
          {id}: {value}
        </span>
      </div>
    )}
    legends={[
      {
        anchor: "bottom-left",
        direction: "column",
        justify: false,
        translateX: 280,
        translateY: 70,
        itemsSpacing: 3,
        itemWidth: 10,
        itemHeight: 18,
        itemTextColor: "black",
        itemDirection: "right-to-left",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsivePie;
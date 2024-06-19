import { ResponsiveBar, BarDatum } from "@nivo/bar";

interface AssetData extends BarDatum {
  id: string;
  입출금: number;
  저축: number;
  투자: number;
}

interface MyResponsiveBarProps {
  data: AssetData[];
}

const MyResponsiveBar: React.FC<MyResponsiveBarProps> = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={["입출금", "저축", "투자"]}
    margin={{ top: 50, right: 100, bottom: 50, left: 30 }}
    padding={0.3}
    layout="horizontal"
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={({ id }) => {
      switch (id) {
        case "입출금":
          return "#8DBDFF";
        case "저축":
          return "#748BFF";
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
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
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
      e.id + ": " + e.formattedValue + " in category: " + e.indexValue
    }
  />
);

export default MyResponsiveBar;

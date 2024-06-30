import React from "react";

interface FundDetailProps {
  fundDetail: {
    category1: string;
    category2: string;
    region: string;
    infoObject: string;
    infoStrategy: string;
    feeGb: string;
    amtGb: string;
    riskGrade: number;
    riskGradeText: string;
    riskGb: string;
    rtGb: string;
    exceBm: string;
    rt1m: number;
    rt3m: number;
    rt6m: number;
    rt1y: number;
    rt3y: number;
    rt5y: number;
  } | null;
}

const FundDetail: React.FC<FundDetailProps> = ({ fundDetail }) => {
  if (!fundDetail) return null;

  return (
    <>
      <p>{fundDetail.infoObject}</p>
      <br />
      <p>{fundDetail.infoStrategy}</p>
      <br />
      <p>- 수수료: {fundDetail.feeGb}</p>
      <p>- 규모성장: {fundDetail.amtGb}</p>

      <p>
        - 위험등급: {fundDetail.riskGrade}등급 ({fundDetail.riskGradeText},{" "}
        {fundDetail.riskGb})
      </p>
      <p>- 성과지속: {fundDetail.rtGb}</p>
      <p>- BM초과성과: {fundDetail.exceBm}</p>
      <br />
      <table className="m-[1.5vw] border">
        <tbody className=" border">
          <tr>
            <td className="mr-[3vw] w-[30vw]  p-[1.2vw] pt-0 border bg-[#F4F3F8]">
              기간
            </td>

            <td className="mr-[3vw] w-[30vw]  p-[1.2vw] pt-0 border bg-[#F4F3F8]">
              수익률
            </td>
          </tr>
          <tr>
            <td className=" p-[1.2vw] pt-0 border">1개월</td>
            <td className="p-[1.2vw] pt-0 border">{fundDetail.rt1m}%</td>
          </tr>
          <tr>
            <td className=" p-[1.2vw] pt-0 border">3개월</td>
            <td className="p-[1.2vw] pt-0 border">{fundDetail.rt3m}%</td>
          </tr>
          <tr>
            <td className=" p-[1.2vw] pt-0 border">6개월</td>
            <td className="p-[1.2vw] pt-0 border">{fundDetail.rt6m}%</td>
          </tr>{" "}
          <tr>
            <td className=" p-[1.2vw] pt-0 border">1년</td>
            <td className="p-[1.2vw] pt-0 border">{fundDetail.rt1y}%</td>{" "}
          </tr>
          <tr>
            <td className=" p-[1.2vw] pt-0 border">3년</td>
            <td className="p-[1.2vw] pt-0 border">{fundDetail.rt3y}%</td>
          </tr>{" "}
          <tr>
            <td className=" p-[1.2vw] pt-0 border">5년</td>
            <td className="p-[1.2vw] pt-0 border">{fundDetail.rt5y}%</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FundDetail;

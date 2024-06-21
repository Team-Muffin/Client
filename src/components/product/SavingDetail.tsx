import React from "react";

interface SavingDetailProps {
  savingDetail: {
    joinPeriod: string;
    joinAmount: string;
    channel: string;
    joinTarget: string;
    specialConditions: string;
    interestPaymentCycle: string;
    note: string;
    depositorProtection: string;
  } | null;
}

const SavingDetail: React.FC<SavingDetailProps> = ({ savingDetail }) => {
  return (
    <>
      {savingDetail ? (
        <>
          <p>
            - 기간
            <div
              dangerouslySetInnerHTML={{
                __html: savingDetail.joinPeriod,
              }}
            />
          </p>
          <br></br>
          <p>
            - 금액
            <div
              dangerouslySetInnerHTML={{
                __html: savingDetail.joinAmount,
              }}
            />
          </p>{" "}
          <br></br>
          <p>
            - 가입방법
            <div
              dangerouslySetInnerHTML={{
                __html: savingDetail.channel,
              }}
            />
          </p>{" "}
          <br></br>
          <p>
            - 대상
            <div
              dangerouslySetInnerHTML={{
                __html: savingDetail.joinTarget,
              }}
            />
          </p>{" "}
          <br></br>
          <p>
            - 우대조건
            <div
              dangerouslySetInnerHTML={{
                __html: savingDetail.specialConditions,
              }}
            />
          </p>{" "}
          <br></br>
          <p>
            - 이자지급
            <div
              dangerouslySetInnerHTML={{
                __html: savingDetail.interestPaymentCycle,
              }}
            />
          </p>{" "}
          <br></br>
          <p>
            - 유의
            <div
              dangerouslySetInnerHTML={{
                __html: savingDetail.note,
              }}
            />
          </p>{" "}
          <br></br>
          <p>
            - 예금자보호
            <div
              dangerouslySetInnerHTML={{
                __html: savingDetail.depositorProtection,
              }}
            />
          </p>{" "}
          <br></br>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SavingDetail;

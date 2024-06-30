import React from "react";

interface CardDetailProps {
  cardDetail: {
    productId: number;
    description: string;
    terms: string[];
  } | null;
}

const CardDetail: React.FC<CardDetailProps> = ({ cardDetail }) => {
  if (!cardDetail) return null;
  console.log("dd", cardDetail.terms);
  return (
    <>
      <p>- 상세혜택</p>
      <p> {cardDetail.description}</p>
      <br />
      <p>- 부가혜택 및 통합할인한도, 유의사항</p>

      {cardDetail.terms.map((term, index) => (
        <p key={index}>{term}</p>
      ))}
    </>
  );
};

export default CardDetail;

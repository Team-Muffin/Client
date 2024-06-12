import React from "react";
import KBCard from "../assets/card-kb.svg";
import Star from "../assets/star-filled.svg";
import { Link } from "react-router-dom";

interface ProductCardProps {
  cardName: string;
  cardBrand: string;
  benefits: string[];
  rating: number;
  reviewCount: number;
  link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  cardName,
  cardBrand,
  benefits,
  rating,
  reviewCount,
  link,
}) => {
  return (
    <Link to={`${link}`}>
      <div className="shadow-productCard rounded-[0.5rem] mt-[1vh]">
        <div className="flex justify-around p-[1vh]">
          <img className="pr-[5vw]" src={KBCard} alt="Card Image" />
          <div className="">
            <span className="mt-[0.5vh] font-semibold text-[0.8rem]">
              {cardName}
            </span>
            <span className="p-[1vw] pb-[0] text-[0.6rem] text-C333333 rounded-[0.25rem] ml-[1.5vw]">
              {cardBrand}
            </span>
            <div className="mb-[0.25vh]">
              {benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="text-[0.6rem] mr-[1vw] p-[1vw] bg-CECF0FF rounded-[0.25rem]"
                >
                  {benefit}
                </span>
              ))}
            </div>
            <div className="flex">
              <img src={Star} alt="Star Icon" />
              <span className="ml-[0.25vh] text-[0.75rem]">
                {" "}
                {rating} ({reviewCount})
              </span>
            </div>
            <p className="text-[0.6rem] text-C333333 ">
              {reviewCount} 명의 유저가 리뷰를 작성했어요!
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

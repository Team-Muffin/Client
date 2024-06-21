import React, { useState } from "react";
import KBCard from "../../assets/card-kb.svg";
import Star from "../../assets/star-filled.svg";
import { Link } from "react-router-dom";

interface ProductCardProps {
  type: number;
  productImg: string;
  productName: string;
  productBrand: string;
  benefits: string[];
  reviewCount: number;
  link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  type,
  productImg: cardImg,
  productName,
  productBrand: cardBrand,
  benefits,
  reviewCount,
  link,
}) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImageSize({
      width: e.currentTarget.width,
      height: e.currentTarget.height,
    });
  };
  return (
    <Link to={`${link}`}>
      <div className="shadow-productCard rounded-[0.5rem] mt-[1.5vh] mb-[0.5vh]">
        <div className="flex justify-around p-[1vh] items-center">
          <div className="w-[40%] flex items-center justify-center">
            {type === 1 ? (
              <img
                className={`${
                  imageSize.height > imageSize.width ? "h-[12vh]" : "w-[12vh]"
                } `}
                src={cardImg}
                onLoad={handleImageLoad}
              />
            ) : (
              <img
                className={"h-[8vh]"}
                src={cardImg}
                onLoad={handleImageLoad}
              />
            )}
          </div>
          <div className="w-[60%] pl-[1vw]">
            <p className=" p-[1vw] pl-0 pb-[0] text-[0.8rem]  text-C333333 rounded-[0.25rem]">
              {cardBrand}
            </p>
            <p className="  mt-[0.5vh] font-semibold text-[1rem]">
              {productName}
            </p>

            <div className="my-[0.25vh]">
              {benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="text-[0.75rem] mr-[1vw] p-[1vw] bg-CECF0FF rounded-[0.25rem]"
                >
                  #{benefit}
                </span>
              ))}
            </div>
            <div className="flex">
              <span className="ml-[0.25vh] text-[0.8rem] mt-[0.5vh] text-C333333">
                {" "}
                {reviewCount}명의 유저가 관련 핀을 작성했어요!
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

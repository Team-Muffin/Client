import React from "react";
import { Link } from "react-router-dom";
import Heart from "../../assets/heart-empty.svg";
import Reply from "../../assets/reply.svg";
import timeAgo from "../../utils/timeAgo";

interface BoardCardProps {
  title: string;
  description: string;
  author: string;
  time: string;
  heartCount: number;
  replyCount: number;
  imageUrl: string;
  authorImageUrl?: string;
  link: string;
}

const BoardCardVertical: React.FC<BoardCardProps> = ({
  title,
  description,
  author,

  time,
  heartCount,
  replyCount,
  imageUrl,
  authorImageUrl,
  link,
}) => {
  return (
    <>
      <hr />
      <div className="max-w-sm m-auto bg-white rounded-lg shadow-default">
        <Link to={link}>
          <div className="my-[1.75vh]">
            <img
              className="rounded-t-lg w-full h-[20vh] border"
              src={imageUrl}
              alt=""
            />

            <div>
              <div className="px-[2.5vw] mr-[0.8vw] mt-[1.5vh] ">
                <p className="text-[1.1rem] text-C333333 font-medium">
                  {title}
                </p>
                <div className="leading-tight text-[0.9rem] text-C333333 line-clamp-1 mt-[0.25vh]">
                  {description}
                </div>
                <div className="flex items-center mt-[0.5vh] mb-[1.5vh] justify-between">
                  <div className="flex justify-start mb-[1.5vh]">
                    <img
                      src={authorImageUrl}
                      className="w-[2.5vh] h-[2.5vh] mr-[1vw] rounded-[0.2rem]"
                      alt=""
                    />
                    <p className="text-[0.85rem] text-C333333">
                      {author} | {timeAgo({ createdTime: time })}
                    </p>
                  </div>
                  <div className="flex justify-end mb-[1.5vh]">
                    <img
                      src={Heart}
                      className="w-[1.5vh] mr-[0.5vw] text-C333333"
                      alt=""
                    />
                    <p className="text-[0.85rem] mr-[1.2vw] text-C333333">
                      {heartCount}
                    </p>
                    <img
                      src={Reply}
                      className="w-[1.5vh] mr-[0.5vw] text-C333333"
                      alt=""
                    />
                    <p className="text-[0.85rem] text-C333333">{replyCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BoardCardVertical;

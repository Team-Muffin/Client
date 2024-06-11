import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "../utils/TimeAgo";
import Heart from "../assets/heart-empty.svg";
import Reply from "../assets/reply.svg";

interface PostCardProps {
  title: string;
  description: string;
  author: string;
  time: string;
  heartCount: number;
  replyCount: number;
  imageUrl: string;
  link: string;
}

const BoardCard: React.FC<PostCardProps> = ({
  title,
  description,
  author,
  time,
  heartCount,
  replyCount,
  imageUrl,
  link,
}) => {
  return (
    <Link to={`/${link}`}>
      <div className="flex justify-between items-center my-[1.3vh] px-[0.5vw]">
        <div className="pr-[2.5vw] mr-[0.8vw]">
          <p className="text-base text-C333333">{title}</p>
          <p className="text-[0.85rem] text-C333333 line-clamp-1">
            {description}
          </p>
          <p className="text-[0.85rem] text-C333333">
            {author} | {time}
            {/* TODO TimeAgo 처리 필요 */}
          </p>
          <div className="flex">
            <img src={Heart} className="mr-[1vw] text-C333333"></img>
            <p className="text-[0.85rem] mr-[1vw] text-C333333">{heartCount}</p>
            <img src={Reply} className="mr-[1vw] text-C333333"></img>
            <p className="text-[0.85rem] mr-[1vw] text-C333333">{replyCount}</p>
          </div>
        </div>
        <img
          className="w-[22vw] h-[22vw] rounded-[0.75rem]"
          src={imageUrl}
          alt="Post Thumbnail"
        />
      </div>
      <hr className="border-CD9D9D9" />
    </Link>
  );
};

export default BoardCard;

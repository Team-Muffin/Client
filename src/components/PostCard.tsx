import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import Heart from "../assets/heart_empty.svg";
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

const PostCard: React.FC<PostCardProps> = ({
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
          <div className="text-base text-C333333">{title}</div>
          <div className="text-[0.85rem] text-C333333 line-clamp-1">
            {description}
          </div>
          <div className="text-[0.85rem] text-C333333">
            {author} | {time}
            {/* TimeAgo 처리 필요 */}
          </div>
          <div className="flex">
            <img src={Heart} className="mr-[1vw] text-C333333"></img>
            <div className="text-[0.85rem] mr-[1vw] text-C333333">
              {heartCount}
            </div>
            <img src={Reply} className="mr-[1vw] text-C333333"></img>
            <div className="text-[0.85rem] mr-[1vw] text-C333333">
              {replyCount}
            </div>
          </div>
        </div>
        <img
          className="w-[22vw] h-[22vw] rounded-[5px]"
          src={imageUrl}
          alt="Post Thumbnail"
        />
      </div>
      <hr />
    </Link>
  );
};

export default PostCard;

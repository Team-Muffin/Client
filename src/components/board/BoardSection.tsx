import React, { useState, useEffect } from "react";
import TimeAgo from "../../utils/timeAgo";
import RedHeart from "../../assets/heart-filled.svg";
import Heart from "../../assets/heart-empty.svg";
import Reply from "../../assets/reply.svg";
import FilledScrap from "../../assets/scrap-filled.svg";
import Scrap from "../../assets/scrap.svg";
import { createBookmark, createLike } from "../../libs/apis/board";

interface BoardContentProps {
  authorId?: number;
  authorClick?: (authorId: number) => void;
  authorNickname: string;
  authorImage: string;
  createdTime: string;
  title: string;
  content: string;
  boardId: string;
  likeCount: number;
  commentCount: number;
  liked: boolean;
  bookmarked: boolean;
  userId: string;
}

const BoardSection: React.FC<BoardContentProps> = ({
  authorId,
  authorClick,
  authorNickname,
  authorImage,
  createdTime,
  title,
  content,
  boardId,
  likeCount,
  commentCount,
  liked,
  bookmarked,
  userId,
}) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const [scrapClicked, setScrapClicked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);

  useEffect(() => {
    setHeartClicked(liked);
    setScrapClicked(bookmarked);
    if (likeCnt !== likeCount) {
      setLikeCnt(likeCount);
      // console.log(boardData.likeCount); // 콘솔에 직접 출력
    }
  }, []);

  const handleHeartClicked = async (selection: boolean) => {
    try {
      await createLike(boardId);

      setHeartClicked(selection);
      setLikeCnt((prevLikeCnt) =>
        selection ? prevLikeCnt + 1 : prevLikeCnt - 1
      );
    } catch (error) {
      console.error("좋아요 클릭 중 오류 발생:", error);
    }
  };

  const handleScrapClicked = async (selection: boolean) => {
    try {
      await createBookmark(boardId);
      setScrapClicked(selection);
    } catch (error) {
      console.error("핀하기 중 오류 발생: ", error);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="pr-[3vw] h-[5vh]"
            src={authorImage}
            alt="author image"
            onClick={() => authorClick && authorId && authorClick(authorId)}
          />
          <div>
            <p
              className="text-[1.2rem] text-C333333 font-medium"
              onClick={() => authorClick && authorId && authorClick(authorId)}
            >
              {authorNickname}
            </p>
            <p className="text-[0.8rem] text-C333333">
              <TimeAgo createdTime={createdTime} />
            </p>
          </div>
        </div>
        <div className="bg-[#EDF0FF] text-[#748BFF] py-[1.5vw] px-[3.75vw] rounded-[0.8rem]">
          팔로잉
        </div>
      </div>

      <p className="py-[1vh] text-[1.25rem] font-medium">{title}</p>
      <p className="text-[0.95rem] break-words">
        {content}
        <br />
      </p>

      <div className="flex justify-between mt-[1.3vh]">
        <div className="flex items-center">
          <img
            src={heartClicked ? RedHeart : Heart}
            className="w-[1.3rem] mr-[1vw] text-C333333"
            onClick={() => handleHeartClicked(!heartClicked)}
            alt="Heart Icon"
          />
          <p className="text-[1rem] mr-[1.75vw] text-C333333">{likeCnt}</p>
          <img
            src={Reply}
            className="w-[1.3rem] mr-[1vw] text-C333333"
            alt="Reply Icon"
          />
          <p className="text-[1rem] mr-[1vw] text-C333333">{commentCount}</p>
        </div>
        <div className="flex bg-[#F8F5F5] p-[1.5vw] rounded-[0.5rem]">
          <img
            src={scrapClicked ? FilledScrap : Scrap}
            className="w-[1.3rem] mr-[1vw] text-C333333"
            onClick={() => handleScrapClicked(!scrapClicked)}
            alt="Scrap Icon"
          />
          <p className="text-[0.95rem] mr-[1vw] text-C333333">핀하기</p>
        </div>
      </div>
    </div>
  );
};

export default BoardSection;

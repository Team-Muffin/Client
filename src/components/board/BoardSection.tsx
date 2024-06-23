import React, { useState, useEffect } from "react";
import TimeAgo from "../../utils/timeAgo";
import RedHeart from "../../assets/heart-filled.svg";
import Heart from "../../assets/heart-empty.svg";
import Reply from "../../assets/reply.svg";
import FilledScrap from "../../assets/scrap-filled.svg";
import Scrap from "../../assets/scrap.svg";
import { createBookmark, createLike } from "../../libs/apis/board";
import {
  fetchFollowStatus,
  followStatusResponse,
  followUser,
} from "../../libs/apis/board";

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
  userIdPk?: number;
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
  userIdPk,
}) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const [scrapClicked, setScrapClicked] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [followStatus, setFollowStatus] = useState(false);

  const callFollowData = async () => {
    try {
      if (userIdPk) {
        const response = await fetchFollowStatus(userIdPk);
        if (response.data) {
          console.log(response.data.data.isFollow);
          setFollowStatus(response.data.data.isFollow);
        } else {
          console.log("팔로우 데이터가 없습니다.");
        }
      }
    } catch (error) {
      console.error("팔로우 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    setHeartClicked(liked);
    setScrapClicked(bookmarked);
    if (likeCnt !== likeCount) {
      setLikeCnt(likeCount);
    }
    // 비동기 함수 호출할 때 await 사용
    (async () => {
      await callFollowData();
    })();
  }, []);

  useEffect(() => {
    // followStatus가 변할 때마다 로그 출력
    console.log("ㅁㅇ" + followStatus);
  }, [followStatus]);

  const handleFollowBtnClicked = async () => {
    try {
      if (authorId) {
        console.log("aa");
        await followUser(authorId);
        await callFollowData();
      }
    } catch (error) {
      console.error("팔로우하다가 에러", error);
    }
  };
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
  console.log(authorId);
  console.log(userIdPk);
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
        {authorId === userIdPk ? (
          <></>
        ) : (
          <>
            {followStatus === true ? (
              <div
                className="bg-[#EDF0FF] text-[#748BFF] py-[1.5vw] px-[3.75vw] rounded-[0.8rem]"
                onClick={handleFollowBtnClicked}
              >
                팔로잉
              </div>
            ) : (
              <div
                className="bg-[#748BFF] text-[#ffffff] py-[1.5vw] px-[3.75vw] rounded-[0.8rem]"
                onClick={handleFollowBtnClicked}
              >
                팔로우
              </div>
            )}
          </>
        )}
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

import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";
import character1 from "../../assets/character1.svg";
import character1_small from "../../assets/character1-small.svg";
import character2 from "../../assets/character2.svg";
import Heart from "../../assets/heart-empty.svg";
import RedHeart from "../../assets/heart-filled.svg";
import Reply from "../../assets/reply.svg";
import Scrap from "../../assets/pin.svg";
import FilledScrap from "../../assets/pin-filled.svg";
import Send from "../../assets/send.svg";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchBoardDetail } from "../../libs/apis/board";
import { SyncLoader } from "react-spinners";
import TimeAgo from "../../utils/TimeAgo";

export default function BoardDetailPage() {
  const [heartClicked, setHeartClicked] = useState(false);
  const [scrapClicked, setScrapClicked] = useState(false);
  const [boardData, setBoardData] = useState<BoardData>();

  const params = useParams();

  interface BoardData {
    title: string;
    content: string;
    category: {
      id: number;
      name: string;
    };
    likeCount: number;
    commentCount: number;
    comments: {
      id: number;
      content: string;
      authorId: number;
      authorName: string;
      authorProfile: string;
      replies: {
        id: number;
        content: string;
        authorId: number;
        authorName: string;
        authorProfile: string;
        createdTime: string;
      }[];
      createdTime: string;
    }[];
    createdTime: string;
    authorId: number;
    authorNickname: string;
    authorProfile: string;
  }

  const callBoardData = async () => {
    try {
      const boardId = params.boardId ?? "";
      const response = await fetchBoardDetail(boardId);
      if (response.data) {
        setBoardData(response.data);
        console.log(boardData);
      } else {
        console.error("보드 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("상세 페이지 보드 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callBoardData();
  }, []);

  const handleHeartClicked = (selection: boolean) => {
    setHeartClicked(selection);
  };

  const handleScrapClicked = (selection: boolean) => {
    setScrapClicked(selection);
  };

  return (
    <>
      {boardData ? (
        <>
          <div className="py-[2vh] px-[4.5vw]">
            <Header text="꿀팁" type="backLeftTextCenter" />
            <div className="mt-[4vh]"></div>
            <div className="px-[3vw]">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img className="pr-[3vw]" src={character1} />
                  <div>
                    <p className="text-[1.2rem] text-C333333 font-medium">
                      {boardData.authorNickname}
                    </p>
                    <p className="text-[0.8rem] text-C333333">
                      {TimeAgo({ createdTime: boardData.createdTime })}
                    </p>
                  </div>
                </div>
                <div className="bg-[#EDF0FF] text-[#748BFF] py-[1.5vw] px-[3.75vw] rounded-[0.8rem]">
                  팔로잉
                </div>
              </div>

              <p className="py-[1vh] text-[1.25rem] font-medium">
                {boardData.title}
              </p>
              <p className="text-[0.95rem]">
                {boardData.content}
                <br />
              </p>

              <div className="flex justify-between mt-[1.3vh]">
                <div className="flex items-center">
                  <img
                    src={heartClicked ? RedHeart : Heart}
                    className="w-[1.3rem] mr-[1vw] text-C333333"
                    onClick={() => handleHeartClicked(!heartClicked)}
                  />
                  <p className="text-[1rem] mr-[1.75vw] text-C333333">
                    {boardData.likeCount}
                  </p>
                  <img
                    src={Reply}
                    className="w-[1.3rem] mr-[1vw] text-C333333"
                  />
                  <p className="text-[1rem] mr-[1vw] text-C333333">3</p>
                </div>
                <div className="flex bg-[#F8F5F5] p-[1.5vw] rounded-[0.5rem]">
                  <img
                    src={scrapClicked ? FilledScrap : Scrap}
                    className="w-[1.3rem] mr-[1vw] text-C333333"
                    onClick={() => handleScrapClicked(!scrapClicked)}
                  />
                  <p className="text-[0.95rem] mr-[1vw] text-C333333">핀하기</p>
                </div>
              </div>
            </div>
            <hr className="border-CD9D9D9 my-[1vh]" />

            {boardData.comments.map((comment) => (
              <>
                <div key={comment.id} className=" py-[2.75vw]">
                  <div className=" p-[2.75vw] shadow rounded-[0.5rem]">
                    <div className="flex justify-between ">
                      <div className="flex items-center">
                        <img
                          className="pr-[2vw] w-[13vw]"
                          src={character1_small}
                        />
                        <div>
                          <p className="text-[0.9rem] font-medium text-C333333">
                            {comment.authorName}
                          </p>
                          <p className="text-[0.8rem] text-C333333">
                            {TimeAgo({ createdTime: comment.createdTime })}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className="text-[0.8rem] text-C333333">답글</span>
                        <span className="text-[0.8rem] pl-[1vw] text-C333333">
                          삭제
                        </span>
                      </div>
                    </div>

                    <p className="text-[0.95rem] mt-[1vh] text-C333333">
                      {comment.content}
                    </p>
                  </div>
                  {comment.replies &&
                    comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="ml-[7vw] mt-[2vh] p-[2.75vw] shadow rounded-[0.5rem]"
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <img
                              className="pr-[2vw] w-[13vw]"
                              src={character1_small}
                            />
                            <div>
                              <p className="text-[0.9rem] font-medium text-C333333">
                                {reply.authorName}
                              </p>
                              <p className="text-[0.8rem] text-C333333">
                                {TimeAgo({ createdTime: reply.createdTime })}
                              </p>
                            </div>
                          </div>
                          <div>
                            <span className="text-[0.8rem] text-C333333">
                              답글
                            </span>
                            <span className="text-[0.8rem] pl-[1vw] text-C333333">
                              삭제
                            </span>
                          </div>
                        </div>
                        <p className="text-[0.95rem] mt-[1vh] text-C333333">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                </div>
                <hr className="my-[1vh]" />
              </>
            ))}
            <div className="pb-[14vh]" />

            <div className="fixed bg-white bottom-[7.5vh] left-0 right-0 h-[8vh] py-[1.5vh]">
              <div className="w-[93vw] mx-auto flex justify-between items-center text-C333333 text-[1rem] bg-[#F4F3FA] py-[1.25vh] px-[4vw] rounded-[0.9rem] z-20">
                <input
                  type="text"
                  id="small-input"
                  className="block w-full text-[0.95rem] border-none bg-[#F4F3FA] p-[0] m-[0]"
                  placeholder="댓글을 작성해보세요!"
                />
                <img src={Send} alt="Send" />
              </div>
            </div>
            <Navbar />
          </div>
        </>
      ) : (
        <div
          className="text-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <SyncLoader color="#758BFF" />
        </div>
      )}
    </>
  );
}

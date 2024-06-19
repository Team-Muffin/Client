import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
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
import More from "../../assets/more-vertical.svg";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  fetchBoardDetail,
  createBookmark,
  createLike,
  deleteBoard,
  createComment,
  deleteComment,
} from "../../libs/apis/board";
import { SyncLoader } from "react-spinners";
import TimeAgo from "../../utils/TimeAgo";
import BackBtn from "../../assets/back.svg";
import Dropdown from "../../components/common/Dropdown";

export default function BoardDetailPage() {
  const [heartClicked, setHeartClicked] = useState(false);
  const [scrapClicked, setScrapClicked] = useState(false);
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [likeCnt, setLikeCnt] = useState(0);
  const [commentContent, setCommentContent] = useState("");
  const [clickedCommentId, setClickedCommentId] = useState(0);
  const navigate = useNavigate();

  const params = useParams();
  const boardId = params.boardId ?? "";

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
      const response = await fetchBoardDetail(boardId);
      if (response.data) {
        setBoardData(response.data);
      } else {
        console.error("보드 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("상세 페이지 보드 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callBoardData();
  }, [boardId]);

  useEffect(() => {
    if (boardData && likeCnt !== boardData.likeCount) {
      setLikeCnt(boardData.likeCount);
      console.log(boardData.likeCount); // 콘솔에 직접 출력
    }
  }, [boardData]);

  const handleHeartClicked = async (selection: boolean) => {
    try {
      await createLike(boardId);

      setLikeCnt((prevLikeCnt) =>
        selection ? prevLikeCnt + 1 : prevLikeCnt - 1
      );
      setHeartClicked(selection);
    } catch (error) {
      console.error("좋아요 클릭 중 오류 발생:", error);
    }
  };

  const handleScrapClicked = async (selection: boolean) => {
    await createBookmark(boardId);
    setScrapClicked(selection);
  };

  const handleBoardDelete = async () => {
    await deleteBoard(boardId);
    navigate(-1);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleCommentWrite = async (parentId?: number) => {
    try {
      console.log(commentContent);
      await createComment(boardId, {
        content: commentContent,
        parentId: parentId,
      });
      // window.location.reload();
    } catch (error) {
      console.error("댓글 작성 중 에러 발생:", error);
    }
  };

  const handleCommentWriteClick = () => {
    handleCommentWrite();
  };

  const handleDeleteCommentClick = async (commentId: number) => {
    setClickedCommentId(commentId);
    await deleteComment(commentId);
    // window.location.reload();
  };

  const handleCreateReplyClick = (commentId: number) => {
    setClickedCommentId(commentId);
  };
  return (
    <>
      {boardData ? (
        <>
          <div className="py-[2vh] px-[4.5vw]">
            {/* 헤더 */}
            <nav className="fixed top-0 left-0 right-0 bg-[#ffffff] ">
              {" "}
              <div className="relative flex justify-center items-center h-[6vh]">
                <div className="flex">
                  <img
                    src={BackBtn}
                    alt="Back"
                    className="absolute left-4"
                    onClick={handleBackButtonClick}
                  />
                  <div className="flex-1 text-center font-semibold text-lg">
                    {(() => {
                      switch (boardData.category.id) {
                        case 1:
                          return "정보";
                        case 2:
                          return "재미";
                        case 3:
                          return "투자";
                        case 4:
                          return "기업";
                        case 5:
                          return "고급";
                        default:
                          return "";
                      }
                    })()}
                  </div>
                  <div className="absolute right-4">
                    <Menu as="div">
                      <MenuButton>
                        <img src={More} className="cursor-pointer" />
                      </MenuButton>

                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="p-[0.5vh] right-[0.5vh] absolute z-10 mt-[0.5vh] w-[18vw] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            <Menu.Item>
                              {() => (
                                <Link to={`/board/${boardId}/edit`}>
                                  <div className="text-center p-[1vw]">
                                    수정
                                  </div>
                                </Link>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {() => (
                                <div
                                  className="text-center p-[1vw]"
                                  onClick={handleBoardDelete}
                                >
                                  삭제
                                </div>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </nav>
            <div className="mt-[5vh]" />

            {/* header */}

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
                    {likeCnt}
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
                  <div
                    className={`${
                      clickedCommentId === comment.id ? "bg-[#ECF0FF]" : ""
                    } p-[2.75vw] shadow rounded-[0.5rem]`}
                  >
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
                        <span
                          className="text-[0.8rem] text-C333333"
                          onClick={() => handleCreateReplyClick(comment.id)}
                        >
                          답글
                        </span>
                        <span
                          className="text-[0.8rem] pl-[1vw] text-C333333"
                          onClick={() => handleDeleteCommentClick(comment.id)}
                        >
                          삭제
                        </span>
                      </div>
                    </div>

                    <p className="text-[0.95rem] mt-[1vh] ml-[1vw] text-C333333">
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
                            <span className="text-[0.8rem] pl-[1vw] text-C333333">
                              삭제
                            </span>
                          </div>
                        </div>
                        <p className="text-[0.95rem] mt-[1vh] ml-[1vw] text-C333333">
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
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <img src={Send} alt="Send" onClick={handleCommentWriteClick} />
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

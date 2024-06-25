import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
// import {
//   fetchAllNoti,
//   fetchDelNoti,
//   fetchReadNoti,
//   fetchReadAllNoti,
// } from "../../lib/apis/notification";
// import Speaker from "../../assets/speakerphone.png";
import { useNavigate } from "react-router-dom";
import timeAgo from "../../utils/timeAgo";

interface Notification {
  notificationKey: string;
  isViewed: boolean;
  content: string;
  createdAt: string;
  type: number;
  partyKey: string;
}

export default function Notification() {
  const [notis, setNotis] = useState<Notification[]>([]);
  const navigate = useNavigate();

  //   function timeAgo(createdAt: string) {
  //     const now = new Date();
  //     const updatedTime = new Date(createdAt);

  //     const secondsPast = (now.getTime() - updatedTime.getTime()) / 1000;

  //     if (secondsPast < 60) {
  //       return `${parseInt(secondsPast.toString())}초 전`;
  //     }
  //     if (secondsPast < 3600) {
  //       return `${parseInt((secondsPast / 60).toString())}분 전`;
  //     }
  //     if (secondsPast <= 86400) {
  //       return `${parseInt((secondsPast / 3600).toString())}시간 전`;
  //     }
  //     if (secondsPast > 86400) {
  //       const month = (updatedTime.getMonth() + 1).toString().padStart(2, "0");
  //       const date = updatedTime.getDate().toString().padStart(2, "0");
  //       const hours = updatedTime.getHours().toString().padStart(2, "0");
  //       const minutes = updatedTime.getMinutes().toString().padStart(2, "0");

  //       return `${month}/${date} ${hours}:${minutes}`;
  //     }
  //   }

  const notisEx = [
    {
      content: "user123님이 회원님을 팔로우하기 시작했습니다.",
      createdTime: "2024-06-23T04:05:41.018Z",
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMTdfMTc0%2FMDAxNzEwNjY4NTI5MzM3.zbD2jP9EDJza4QDEIXEoB6hLJosuK7FExqXZc3OF7H0g.5c02aVkNNpNqV3TCZdC25_viesXls3BSirn97AyilzMg.JPEG%2F20240314%25A3%25DF143624.jpg&type=sc960_832",
      link: "/",
      isViewed: true,
    },
    {
      content: "user123님이 회원님을 팔로우하기 시작했습니다.",
      createdTime: "2024-06-23T04:05:41.018Z",
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMTdfMTc0%2FMDAxNzEwNjY4NTI5MzM3.zbD2jP9EDJza4QDEIXEoB6hLJosuK7FExqXZc3OF7H0g.5c02aVkNNpNqV3TCZdC25_viesXls3BSirn97AyilzMg.JPEG%2F20240314%25A3%25DF143624.jpg&type=sc960_832",
      link: "/",
      isViewed: true,
    },
    {
      content: "user123님이 회원님을 팔로우하기 시작했습니다.",
      createdTime: "2024-06-23T04:05:41.018Z",
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMTdfMTc0%2FMDAxNzEwNjY4NTI5MzM3.zbD2jP9EDJza4QDEIXEoB6hLJosuK7FExqXZc3OF7H0g.5c02aVkNNpNqV3TCZdC25_viesXls3BSirn97AyilzMg.JPEG%2F20240314%25A3%25DF143624.jpg&type=sc960_832",
      link: "/",
      isViewed: true,
    },
    {
      content: "user123님이 회원님을 팔로우하기 시작했습니다.",
      createdTime: "2024-06-23T04:05:41.018Z",
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMTdfMTc0%2FMDAxNzEwNjY4NTI5MzM3.zbD2jP9EDJza4QDEIXEoB6hLJosuK7FExqXZc3OF7H0g.5c02aVkNNpNqV3TCZdC25_viesXls3BSirn97AyilzMg.JPEG%2F20240314%25A3%25DF143624.jpg&type=sc960_832",
      link: "/",
      isViewed: true,
    },
  ];
  //   const AllNoti = async () => {
  //     try {
  //       const response = await fetchAllNoti();
  //       setNotis(response);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   const DelNoti = async (notificationKey: string) => {
  //     try {
  //       await fetchDelNoti(notificationKey);
  //       setNotis(notis.filter((noti) => noti.notificationKey !== notificationKey));
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   const ReadNoti = async (notificationKey: string) => {
  //     try {
  //       await fetchReadNoti(notificationKey);
  //       AllNoti();
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   const ReadAllNoti = async () => {
  //     try {
  //       await fetchReadAllNoti();
  //       AllNoti();
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   useEffect(() => {
  //     AllNoti();
  //   }, []);

  return (
    <>
      <div className="py-[2vh] px-[4.5vw] pb-[1vh]">
        <Header text={"알림"} type="backLeftTextCenter" />
        <div className="mt-[4vh]" />

        <div className="flex justify-end text-gray-600 text-sm mb-[1vh]">
          <div
            //    onClick={ReadAllNoti}
            className="cursor-pointer"
          >
            모두 읽기&ensp;&ensp;
          </div>
          <div className="cursor-pointer">모두 삭제</div>
        </div>

        {notisEx.map((noti, index) => (
          <div key={index}>
            <div
              className={`border rounded-[0.8rem] my-[1vh]  ${
                noti.isViewed ? "bg-white" : "bg-gray-200"
              }`}
            >
              <div className="flex justify-between items-center p-[1vh] text-gray-600">
                <div className="text-sm ">
                  <p className="mb-[0.8vh]"> {noti.content}</p>
                  <div className="flex text-xs">
                    <p>{timeAgo({ createdTime: noti.createdTime })}</p>
                  </div>
                </div>
                <div>
                  <img
                    className="w-[7vh] h-[7vh] ml-[0.8vh] rounded-[0.8rem]"
                    src={noti.img}
                  />
                </div>
              </div>
            </div>
            {/* <div
                key={noti.notificationKey}
              className={`flex flex-col m-4 p-8 rounded-lg ${
                noti.isViewed ? "bg-white" : "bg-gray-200"
              }`}
            >
              <div className="flex flex-row gap-2 items-center">
                <img
                  src={Speaker}
                  alt="speaker"
                  className="w-6 h-6 cursor-pointer"
                    onClick={() => {
                      ReadNoti(noti.notificationKey);
                      if (noti.type === 3) {
                        navigate(`/transfer/${noti.partyKey}`);
                      } else if (noti.type === 1) {
                        navigate(`/interests/${noti.partyKey}`);
                      }
                    }}
                />
                <div
                  className="font-medium text-lg w-11/12 mb-1 cursor-pointer"
                  onClick={() => {
                    ReadNoti(noti.notificationKey);
                    if (noti.type === 3) {
                      navigate(`/transfer/${noti.partyKey}`);
                    } else if (noti.type === 1) {
                      navigate(`/interests/${noti.partyKey}`);
                    }
                  }}
                >
                  {noti.content}
                </div>
              </div>
              <div className="flex justify-between">
                <div
                  className="text-gray-600 cursor-pointer"
                  onClick={() => {
                    ReadNoti(noti.notificationKey);
                    if (noti.type === 3) {
                      navigate(`/transfer/${noti.partyKey}`);
                    } else if (noti.type === 1) {
                      navigate(`/interests/${noti.partyKey}`);
                    }
                  }}
                >
                  <span className="text-sm ml-28">
                    {timeAgo(noti.createdTime)}
                  </span>
                </div>
                <div
                  className="text-gray-600 cursor-pointer text-sm"
                    onClick={() => {
                      DelNoti(noti.notificationKey);
                    }}
                >
                  삭제
                </div>
              </div>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
}

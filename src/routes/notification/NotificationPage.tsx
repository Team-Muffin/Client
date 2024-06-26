import React, { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import {
  fetchAlertList,
  readAlert,
  deleteAlert,
  readAllAlert,
  Alert,
} from "../../libs/apis/notification";
import { useNavigate } from "react-router-dom";
import timeAgo from "../../utils/timeAgo";
import useAuth2Store from "../../store/useAuth2Store";

export default function Notification() {
  const navigate = useNavigate();

  const [alertListData, setAlertListData] = useState<Alert[]>([]);
  const [alertData, setAlertData] = useState<Alert>();
  const Id = useAuth2Store((state) => state.id);
  const callAlertListData = async () => {
    try {
      const { data } = await fetchAlertList();
      console.log(data);
      setAlertListData(data);
    } catch (error) {
      console.log("알림 리스트 불러오는 중 오류");
    }
  };

  const deleteAllAlert = async () => {
    try {
      await deleteAlert();
      window.location.reload();
    } catch (error) {
      console.log("알림 리스트 전체 삭제 중 오류");
    }
  };

  const readEachAlert = async (alertId: number) => {
    try {
      const { data } = await readAlert(alertId);
      console.log(data);

      if (data.messageType === "FIN") {
        navigate(`/board/${data.targetId}`);
      } else if (data.messageType === "CREDIT") {
        navigate(`/userProfile?id=${Id}`);
      } else if (data.messageType === "FOLLOW") {
        navigate(`/userProfile?id=${data.targetId}`);
      }
    } catch (error) {
      console.log("알림 읽음 중 오류");
    }
  };

  const readAllAlerts = async () => {
    try {
      await readAllAlert();
      window.location.reload();
    } catch (error) {
      console.log("알림 전체 읽음 중 오류");
    }
  };

  useEffect(() => {
    callAlertListData();
  }, []);

  return (
    <>
      <div className="py-[2vh] px-[4.5vw] pb-[1vh]">
        <Header text={"알림"} type="backLeftTextCenter" />
        <div className="mt-[4vh]" />

        <div className="flex justify-end text-gray-600 text-sm mb-[1vh]">
          <div onClick={readAllAlerts} className="cursor-pointer">
            모두 읽기&ensp;&ensp;
          </div>
          <div className="cursor-pointer" onClick={deleteAllAlert}>
            모두 삭제
          </div>
        </div>

        {alertListData.map((alert, index) => (
          <div key={index}>
            <div
              className={`border rounded-[0.8rem] my-[1vh]  ${
                alert.viewed ? "bg-white" : "bg-gray-100"
              }`}
              onClick={() => readEachAlert(alert.id)}
            >
              <div className="flex justify-between items-center p-[1vh] text-gray-600">
                <div className="text-sm ">
                  <p className="mb-[0.8vh]"> {alert.content}</p>
                  <div className="flex text-xs">
                    <p>{timeAgo({ createdTime: alert.createdAt })}</p>
                  </div>
                </div>
                <div>
                  <img
                    className="w-[7vh] h-[7vh] ml-[0.8vh] rounded-[0.8rem]"
                    src={alert.thumbnail}
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

import React, { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import useAuth2Store from "../../store/useAuth2Store";

type EventSourceType = EventSource | null;

const FetchSSE: React.FC = () => {
  const accessToken = useAuth2Store((state) => state.accessToken);
  const { isAuthenticated } = useAuth2Store();
  const isLoggedIn = isAuthenticated();

  const [realtimeData, setRealtimeData] = useState(null);
  const eventSource = useRef<EventSourceType>(null);
  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    if (isLoggedIn) {
      console.log("로그인 됨");
      try {
        const fetchSSE = async () => {
          console.log("SSE 연결 시도");
          eventSource.current = new EventSource(
            `${import.meta.env.VITE_BASE_URL}/alert-service/alerts/subscribe`,
            {
              headers: {
                "Content-Type": "text/event-stream",
                Authorization: `Bearer ${accessToken}`,
              },
              heartbeatTimeout: 3600000,
              withCredentials: true,
            }
          );

          eventSource.current.addEventListener("alert", (e) => {
            console.log("notification 이벤트 수신", e);
            const notificationData = JSON.parse(e.data);
            setRealtimeData(notificationData);
            toast.info(notificationData.message, {
              position: "top-right",
              autoClose: 5000,
            });
          });

          eventSource.current.onerror = (error) => {
            console.error("SSE 연결 오류", error);
            eventSource.current?.close();
            setTimeout(fetchSSE, 3000);
          };

          eventSource.current.onopen = (event) => {
            console.log("SSE 연결 열림", event);
          };
        };
        fetchSSE();
      } catch (error) {
        console.error("SSE 설정 오류", error);
      }
    }

    return () => {
      eventSource.current?.close();
    };
  }, [isLoggedIn, accessToken]);

  return <ToastContainer />;
};

export default FetchSSE;

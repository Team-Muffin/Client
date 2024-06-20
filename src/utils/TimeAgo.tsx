import React from "react";

interface TimeAgoProps {
  createdTime: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ createdTime }) => {
  const timeAgo = (createdTime: string) => {
    const now = new Date();
    const updatedTime = new Date(createdTime);
    const secondsPast = (now.getTime() - updatedTime.getTime()) / 1000;

    if (secondsPast < 60) {
      return `${parseInt(secondsPast.toString(), 10)}초 전`;
    }
    if (secondsPast < 3600) {
      return `${parseInt((secondsPast / 60).toString(), 10)}분 전`;
    }
    if (secondsPast <= 86400) {
      return `${parseInt((secondsPast / 3600).toString(), 10)}시간 전`;
    }
    if (secondsPast > 86400) {
      const month = (updatedTime.getMonth() + 1).toString().padStart(2, "0");
      const date = updatedTime.getDate().toString().padStart(2, "0");
      const hours = updatedTime.getHours().toString().padStart(2, "0");
      const minutes = updatedTime.getMinutes().toString().padStart(2, "0");

      return `${month}/${date} ${hours}:${minutes}`;
    }
  };

  return <span>{timeAgo(createdTime)}</span>;
};

export default TimeAgo;

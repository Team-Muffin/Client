import React from "react";

interface TimeAgoProps {
  updatedAt: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ updatedAt }) => {
  const timeAgo = (updatedAt: string) => {
    const now = new Date();
    const updatedTime = new Date(updatedAt);
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
      let month = (updatedTime.getMonth() + 1).toString();
      let date = updatedTime.getDate().toString();
      let hours = updatedTime.getHours().toString();
      let minutes = updatedTime.getMinutes().toString();

      month = month.length < 2 ? `0${month}` : month;
      date = date.length < 2 ? `0${date}` : date;
      hours = hours.length < 2 ? `0${hours}` : hours;
      minutes = minutes.length < 2 ? `0${minutes}` : minutes;

      return `${month}.${date} ${hours}:${minutes}`;
    }
  };

  return <span>{timeAgo(updatedAt)}</span>;
};

export default TimeAgo;

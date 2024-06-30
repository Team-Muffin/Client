import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Navbar from "../../components/common/Navbar";
import Header from "../../components/common/Header";
import HappyImg from "../../assets/happy-face.svg";
import SadImg from "../../assets/sad-face.svg";
import AngryImg from "../../assets/angry-face.svg";
import {
  getEmoChallengeLog,
  postEmoChallenge,
} from "../../libs/apis/challenge";

type DateObject = {
  currentMonth: boolean;
  date: dayjs.Dayjs;
  today?: boolean;
  emotion?: string;
};

export const generateDate = (
  month: number = dayjs().month(),
  year: number = dayjs().year()
): DateObject[] => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate: DateObject[] = [];

  // create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.subtract(firstDateOfMonth.day() - i, "day");

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  // generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const remaining = 42 - arrayOfDate.length;

  for (let i = 1; i <= remaining; i++) {
    const date = lastDateOfMonth.add(i, "day");
    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  return arrayOfDate;
};

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

const ChallengeCAL: React.FC = () => {
  const [dates, setDates] = useState<DateObject[]>(generateDate());
  const [showEmotionRecord, setShowEmotionRecord] = useState(false);

  const handleEmotionClick = (emotion: string) => {
    const todayIndex = dates.findIndex((date) => date.today);
    if (todayIndex !== -1) {
      const newDates = [...dates];
      newDates[todayIndex].emotion = emotion;
      setDates(newDates);
      setShowEmotionRecord(true);
      postEmoji(emotion);
    }
  };

  const toEnglish = (emo: string) => {
    if (emo === "화나요") return "angry";
    if (emo === "행복해요") return "happy";
    return "sad";
  };

  const postEmoji = async (emoji: string) => {
    if (emoji === "angry") {
      await postEmoChallenge(1);
    } else if (emoji === "happy") {
      await postEmoChallenge(2);
    } else {
      await postEmoChallenge(3);
    }
  };

  const handleEmotionFetch = (emotion: string, savingAt: string) => {
    const currentDay = dates.findIndex(
      (date) => date.date.toDate().toISOString().split("T")[0] === savingAt
    );

    const newDates = [...dates];
    newDates[currentDay].emotion = toEnglish(emotion);
    setDates(newDates);
  };

  // Get the current month number
  const currentMonthNumber = dayjs().month() + 1;

  const makeZero = (i: number) => {
    if (i < 10) return `0${i}`;

    return `${i}`;
  };

  useEffect(() => {
    const fetchLog = async () => {
      const res = await getEmoChallengeLog();
      const dt = new Date();
      const stringDate =
        dt.getFullYear() +
        "-" +
        makeZero(dt.getMonth() + 1) +
        "-" +
        makeZero(dt.getDate());

      for (let i = 0; i < res.myEmoChallengeLogs.length; i++) {
        console.log(res.myEmoChallengeLogs[i]);
        handleEmotionFetch(
          res.myEmoChallengeLogs[i].emotion,
          res.myEmoChallengeLogs[i].savingAt
        );
        console.log(res.myEmoChallengeLogs[i].savingAt, stringDate);
        if (res.myEmoChallengeLogs[i].savingAt == stringDate) {
          console.log("yes");
          setShowEmotionRecord(true);
        }
      }
    };

    fetchLog();
  }, []);

  return (
    <>
      <Header text="감정 저축 챌린지" type="backLeftTextCenter" />
      <div className="mt-[4.5vh]"></div>
      <div className="relative w-[90vw] mx-auto mt-[10vh] p-[3vh] shadow-xl">
        {/* Add the current month number */}
        <div className="text-black text-2xl font-bold">
          {currentMonthNumber}월
        </div>

        <div className="grid grid-cols-7 gap-3 pt-[2vh] text-center">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center font-bold text-gray-600">
              {day}
            </div>
          ))}
          {dates.map((dateObj, index) => (
            <div
              key={index}
              className={`relative p-2 ${
                dateObj.currentMonth ? "text-black" : "text-white"
              } ${dateObj.today ? "border-blue-500" : ""}`}
              style={{ border: "none" }} // Remove the border
            >
              {dateObj.date.date()}
              {dateObj.emotion === "happy" && (
                <img
                  src={HappyImg}
                  className="absolute inset-0 m-auto w-[10vw] h-[6vh]"
                  alt="Happy Face"
                />
              )}
              {dateObj.emotion === "sad" && (
                <img
                  src={SadImg}
                  className="absolute inset-0 m-auto w-[10vw] h-[6vh]"
                  alt="Sad Face"
                />
              )}
              {dateObj.emotion === "angry" && (
                <img
                  src={AngryImg}
                  className="absolute inset-0 m-auto w-[10vw] h-[6vh]"
                  alt="Angry Face"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {!showEmotionRecord && (
        <div className="flex justify-center p-[5vh]">
          <div className="flex justify-between w-[80vw] mb-[4vh]">
            <div className="flex flex-col items-center">
              <img
                src={AngryImg}
                width={"50vw"}
                height={"50vh"}
                onClick={() => handleEmotionClick("angry")}
                alt="Angry Face"
              />
              <button
                className="text-sm font-semibold text-[#748BFF] bg-[#ECF0FF] rounded-3xl shadow py-[0.5vh] px-[3vw] my-[1vh]"
                onClick={() => handleEmotionClick("angry")}
              >
                화나요
              </button>
              <p className="text-xs font-normal text-black">1818원 저축</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={SadImg}
                width={"50vw"}
                height={"50vh"}
                onClick={() => handleEmotionClick("sad")}
                alt="Sad Face"
              />
              <button
                className="text-sm font-semibold text-[#748BFF] bg-[#ECF0FF] rounded-3xl shadow py-[0.5vh] px-[3vw] my-[1vh]"
                onClick={() => handleEmotionClick("sad")}
              >
                슬퍼요
              </button>
              <p className="text-xs font-normal text-black">666원 저축</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={HappyImg}
                width={"50vw"}
                height={"50vh"}
                onClick={() => handleEmotionClick("happy")}
                alt="Happy Face"
              />
              <button
                className="text-sm font-semibold text-[#748BFF] bg-[#ECF0FF] rounded-3xl shadow py-[0.5vh] px-[3vw] my-[1vh]"
                onClick={() => handleEmotionClick("happy")}
              >
                행복해요
              </button>
              <p className="text-xs font-normal text-black">5959원 저축</p>
            </div>
          </div>
        </div>
      )}
      {showEmotionRecord && (
        <div className="flex justify-center p-[5vw] m-[7vh]">
          <p className="text-base font-normal bg-[#ECF0FF] rounded-[0.5rem] p-[3vw] text-black text-center">
            오늘의 감정을 기록해주셨네요☺️
            <br />
            앞으로도 화이팅❗
          </p>
        </div>
      )}
      <Navbar />
    </>
  );
};

export default ChallengeCAL;

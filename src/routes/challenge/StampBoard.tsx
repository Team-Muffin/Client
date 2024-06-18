import EcoKing from "../../assets/eco-king.svg";
import SaveKing from "../../assets/save-king.svg";
import Stingy from "../../assets/stingy-person.svg";
import Bookworm from "../../assets/book-worm.svg";
import Report from "../../assets/report.svg";
import Cook from "../../assets/cook.svg";
import Header from "../../components/Header";

export default function StampBoard() {
  const stamps = [
    { name: "EcoKing", path: EcoKing, title: "지속가능성의\n챔피언" },
    { name: "SaveKing", path: SaveKing, title: "솔직저축왕" },
    { name: "Stingy", path: Stingy, title: "대왕짠돌이" },
    { name: "Bookworm", path: Bookworm, title: "금융독서왕" },
    { name: "Report", path: Report, title: "투자의 현자" },
    { name: "Cook", path: Cook, title: "절약요리왕" },
  ];

  return (
    <>
      <Header text="챌린지 도장판" type={1} />
      <div className="mt-[4vh]"></div>
      <div className="flex flex-wrap justify-center px-[2vw]">
        {stamps.map((stamp, index) => (
          <div key={index} className="stamp-item mx-[5vw] my-[2vw] text-center">
            <img
              src={stamp.path}
              alt={stamp.name}
              className="stamp-img w-[20vw] h-[15vh] object-contain"
            />
            <p className="mt-[2vw] font-semibold text-sm whitespace-pre-line">
              {stamp.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

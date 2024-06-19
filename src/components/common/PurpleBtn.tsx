import React from "react";
import { Link } from "react-router-dom";

interface PurpleBtnProps {
  label: string;
  to: string;
}

const PurpleBtn: React.FC<PurpleBtnProps> = ({ label, to }) => {
  return (
    <Link
      to={to}
      className="text-lg font-normal text-white text-center bg-[#748BFF] rounded-[1rem] shadow py-[2vh] w-full h-[7.5vh] flex items-center justify-center"
    >
      {label}
    </Link>
  );
};

export default PurpleBtn;

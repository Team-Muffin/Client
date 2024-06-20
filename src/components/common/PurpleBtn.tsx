import React from "react";
import { Link } from "react-router-dom";

interface PurpleBtnProps {
  label: string;
  to: string;
  onClick?: () => void; // Optional onClick handler
}

const PurpleBtn: React.FC<PurpleBtnProps> = ({ label, to, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick} // Pass the handleClick function to onClick of Link
      className="text-lg font-normal text-white text-center bg-[#748BFF] rounded-[1rem] shadow py-[2vh] w-full h-[7.5vh] flex items-center justify-center"
    >
      {label}
    </Link>
  );
};

export default PurpleBtn;

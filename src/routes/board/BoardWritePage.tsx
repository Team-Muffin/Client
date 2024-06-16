import { useState } from "react";

import BackBtn from "../../assets/back.svg";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function BoardWritePage() {
  const [selected, setSelected] = useState("꿀팁");
  const filterList = ["꿀팁", "소비", "절약", "투자"];
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleMenuItemClick = (text: string) => {
    setSelected(text);
  };
  return (
    <>
      <div className="py-[2vh] px-[4.5vw]">
        {/* 헤더;; */}
        <nav className="fixed top-0 left-0 right-0 bg-[#ffffff]">
          <div className="relative flex justify-center items-center h-[6vh]">
            <img
              src={BackBtn}
              alt="Back"
              className="absolute left-4"
              onClick={handleBackButtonClick}
            />
            <Menu as="div" className=" flex justify-end inline-block text-left">
              <div className="">
                <MenuButton className="inline-flex w-full justify-center rounded-md bg-white text-lg text-black font-medium">
                  {selected}
                  <ChevronDownIcon
                    className="-mr-1 h-[1.5rem] w-[1.5rem] text-C333333"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute z-10 mt-[3.5vh] w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-medium">
                  <div className="py-1">
                    {filterList.map((text, index) => (
                      <div onClick={() => handleMenuItemClick(text)}>
                        <MenuItem key={index}>
                          {({ active }) => (
                            <a
                              href="#"
                              className={`${
                                active ? "bg-gray-100" : ""
                              }text-black block px-4 py-2 text-[1rem]`}
                            >
                              {text}
                            </a>
                          )}
                        </MenuItem>
                      </div>
                    ))}
                  </div>
                </MenuItems>
              </Transition>
            </Menu>

            <div className="absolute right-4 font-medium text-lg">등록</div>
          </div>
        </nav>
        {/* 여기까지 헤더 */}
        <div className="mt-[4vh]"></div>

        {/* 민우 TODO: 여기부터 Editor 관련 */}
      </div>
    </>
  );
}

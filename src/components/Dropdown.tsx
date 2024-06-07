import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type DropdownProps = {
  defaultFilter: string;
  filterList: string[];
};

const Dropdown: React.FC<DropdownProps> = ({ defaultFilter, filterList }) => {
  const [selected, setSelected] = useState(defaultFilter);

  const handleMenuItemClick = (text: string) => {
    setSelected(text);
  };

  return (
    <Menu
      as="div"
      className="mx-3 mt-[1vh] flex justify-end inline-block text-left"
    >
      <div className="mr-[1vw]">
        <MenuButton className="inline-flex w-full justify-center rounded-md bg-white text-xs text-C333333">
          {selected}
          <ChevronDownIcon
            className="-mr-1 h-4 w-4 text-C333333"
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
        <MenuItems className="absolute z-10 mt-[3.5vh] w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {filterList.map((text, index) => (
              <div onClick={() => handleMenuItemClick(text)}>
                <MenuItem key={index}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block px-4 py-2 text-xs`}
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
  );
};

export default Dropdown;

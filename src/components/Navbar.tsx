import { useState } from "react";
import Home from "../assets/home.svg?react";
import Post from "../assets/post.svg?react";
import Star from "../assets/star.svg?react";
import Product from "../assets/thumbs-up.svg?react";
import Profile from "../assets/profile.svg?react";

const Navbar = () => {
  const linkClasses =
    "flex flex-col items-center space-y-1 px-2 rounded md:p-0 transition-colors duration-200";
  const defaultClasses = "text-gray-900 ";
  const hoverClasses = "hover:text-[#748BFF] ";
  const activeClasses = "focus:text-[#748BFF] ";

  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);

  const handleItemClick = (itemName: string) => {
    setActiveNavItem(
      (prevItem) => (prevItem === itemName ? null : itemName) as null
    );
  };

  const navItems = [
    { name: "홈", href: "#", Icon: Home },
    { name: "핀", href: "/boardList", Icon: Post },
    { name: "챌린지", href: "#", Icon: Star },
    { name: "상품", href: "/productList", Icon: Product },
    { name: "프로필", href: "#", Icon: Profile },
  ];

  return (
    <nav className="fixed w-full z-20 bottom-0 left-0 bg-white border-t border-gray-200 h-[7.5vh]">
      <div className="mx-auto flex items-center justify-center">
        <div className="w-full md:w-auto">
          <ul className="flex justify-center space-x-8 p-2 md:p-0 font-medium border-t md:border-t-0 bg-gray-50 ">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`${linkClasses} ${defaultClasses} ${
                    activeNavItem === item.name || item.name === activeNavItem
                      ? hoverClasses
                      : ""
                  } ${activeClasses}`}
                  aria-current={item.name === "Home" ? "page" : undefined}
                  onMouseEnter={() => setActiveNavItem(item.name)}
                  onMouseLeave={() => setActiveNavItem(null)}
                  onClick={() => handleItemClick(item.name)}
                >
                  <item.Icon
                    fill={
                      activeNavItem === item.name ? "#748BFF" : "currentColor"
                    }
                    className="h-7 w-7 filter transition-all duration-300 group-hover:filter-none group-hover:fill-current group-focus:fill-current"
                  />
                  <p className="text-xs">{item.name}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "../assets/home.svg";
import PostIcon from "../assets/post.svg";
import StarIcon from "../assets/star.svg";
import ProductIcon from "../assets/thumbs-up.svg";
import ProfileIcon from "../assets/profile.svg";

const Navbar = () => {
  const linkClasses =
    "flex flex-col items-center space-y-1 px-2 rounded md:p-0 transition-colors duration-200";
  const defaultClasses = "text-gray-900 ";
  const hoverClasses = "hover:text-[#748BFF] ";
  const activeClasses = "text-[#748BFF]"; // Active class for text color

  const location = useLocation();

  const navItems = [
    { name: "홈", href: "/", Icon: HomeIcon },
    { name: "핀", href: "/boardList", Icon: PostIcon },
    { name: "챌린지", href: "/challenge", Icon: StarIcon },
    { name: "상품", href: "/productList", Icon: ProductIcon },
    { name: "프로필", href: "/mypage", Icon: ProfileIcon },
  ];

  return (
    <nav className="fixed w-full z-20 bottom-0 left-0 bg-white border-t border-gray-200 h-[7.5vh]">
      <div className="mx-auto flex items-center justify-center">
        <div className="w-full md:w-auto">
          <ul className="flex justify-center space-x-8 p-2 md:p-0 font-medium border-t md:border-t-0 bg-gray-50">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={`${linkClasses} ${defaultClasses} ${hoverClasses} ${
                    location.pathname === item.href ? activeClasses : ""
                  }`}
                  aria-current={
                    location.pathname === item.href ? "page" : undefined
                  }
                >
                  <img
                    src={item.Icon}
                    alt={item.name}
                    className="h-7 w-7 filter transition-all duration-300 group-hover:filter-none group-hover:fill-current group-focus:fill-current"
                    style={{
                      filter:
                        location.pathname === item.href
                          ? "invert(64%) sepia(69%) saturate(4107%) hue-rotate(206deg) brightness(100%) contrast(102%)"
                          : "none",
                      fill:
                        location.pathname === item.href
                          ? "#748BFF"
                          : "currentColor",
                    }}
                  />
                  <p
                    className={`text-xs ${
                      location.pathname === item.href ? activeClasses : ""
                    }`}
                  >
                    {item.name}
                  </p>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

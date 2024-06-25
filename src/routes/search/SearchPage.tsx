import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "../../assets/search-gray.svg";
import ToFinLogo from "../../assets/main-logo.svg";

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState("카드");
  const searchInput = useRef<HTMLInputElement>(null);
  const [searchContent, setSearchContent] = useState("");
  const [domain, setDomain] = useState("");

  const handleCategoryClick = (selection: string) => {
    setCategory(selection);
  };

  const handleSearchClick = () => {
    if (searchContent == "") {
      alert("검색할 키워드를 입력해주세요!");
      return;
    }
    if (domain === "home") {
      navigate("/searchResult", {
        state: { domain: "home", searchKeyword: searchContent },
      });
    }
    if (domain === "board") {
      navigate("/board/searchResult", {
        state: { domain: "board", searchKeyword: searchContent },
      });
    }
    if (domain === "product") {
      navigate("/product/searchResult", {
        state: { domain: "product", searchKeyword: searchContent },
      });
    }
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    searchInput.current?.focus();
    setDomain(location.state.domain);
  });

  return (
    <>
      <div className="py-[2vh] px-[4.5vw]">
        <div className="fixed  top-0 left-0 right-0 py-[0.5vh] px-[2vw] bg-white z-10 ">
          <div className="mx-auto flex justify-between items-center p-2">
            <div className="bg-[#F4F3FA] w-[93vw] py-[1.25vh] px-[4vw] rounded-[0.9rem] flex">
              <input
                type="text"
                id="small-input"
                className="block w-full text-[0.95rem] border-none bg-[#F4F3FA] p-[0] m-[0] mr-[2vw]"
                placeholder="궁금한 키워드를 검색해보세요!"
                value={searchContent}
                onChange={(e) => setSearchContent(e.target.value)}
              />
              <img
                src={Search}
                onClick={handleSearchClick}
                alt="Search"
                className="cursor-pointer"
              />
            </div>
            <p
              className="w-[4vh] text-center text-[0.95rem] text-[#6A7280] ml-[1vh] cursor-pointer"
              onClick={handleCancelClick}
            >
              취소
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-[75vh]">
          <img className="w-[50%] " src={ToFinLogo}></img>
        </div>
      </div>
      <div className="pb-[8.5vh]" />
    </>
  );
}

import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Search from "../../assets/search-gray.svg";
import ToFinLogo from "../../assets/main-logo.svg";
import { fetchProductList, ProductList } from "../../libs/apis/product";
import HomeSearch from "../../components/search/HomeSearch";
import BoardSearch from "../../components/search/BoardSearch";
import ProductSearch from "../../components/search/ProductSearch";
import useCategoryFilterStore from "../../store/useCategoryFilterStore";

export default function SearchResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchContent, setSearchContent] = useState("");
  const [domain, setDomain] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const clearCategoryAndFilters = useCategoryFilterStore(
    (state) => state.clearCategoryAndFilters
  );

  const handleCancelClick = () => {
    clearCategoryAndFilters();
    if (domain === "home") {
      navigate(`/`);
    } else {
      navigate(`/${domain}`);
    }
  };

  useEffect(() => {
    setDomain(location.state.domain);
    console.log(typeof domain);
    console.log(domain);
    setSearchKeyword(location.state.searchKeyword);
    setSearchContent(location.state.searchKeyword);
  }, []);

  useEffect(() => {
    setDomain(location.state.domain);
    setSearchKeyword(location.state.searchKeyword);
    setSearchContent(location.state.searchKeyword);
  }, [location.state]);

  const handleSearchClick = () => {
    if (searchContent == "") {
      alert("검색할 키워드를 입력해주세요!");
      return;
    }
    if (domain === "home") {
      navigate("/searchResult", {
        state: { domain: "home", searchKeyword: searchContent },
      });
    } else if (domain === "board") {
      navigate("/searchResult", {
        state: { domain: "board", searchKeyword: searchContent },
      });
    } else if (domain === "product") {
      navigate("/searchResult", {
        state: { domain: "product", searchKeyword: searchContent },
      });
    } else if (domain === "user") {
      navigate("/searchResult", {
        state: { domain: "user", searchKeyword: searchContent },
      });
    }
  };

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
      </div>
      <div className="mt-[6vh]">
        {domain === "home" && <HomeSearch keyword={searchKeyword} />}
        {domain === "board" && <BoardSearch keyword={searchKeyword} />}
        {domain === "product" && <ProductSearch keyword={searchKeyword} />}
      </div>
    </>
  );
}

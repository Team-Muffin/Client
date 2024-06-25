import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import BackBtn from "../../assets/back.svg";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { OutputData } from "@editorjs/editorjs";
import BoardEditor from "../../components/board/BoardEditor";
import { BoardRequest, createBoard, CreateBoardRequest, updateBoard, UpdateBoardRequest } from "../../libs/apis/board";
import BoardModifier from "../../components/board/BoardModifier";

export default function BoardWritePage() {
  const [selected, setSelected] = useState("정보");
  const [categoryId, setCategoryId] = useState<string>(1 + "");
  const [boardData, setBoardData] = useState<OutputData | undefined>();
  const [title, setTitle] = useState<string>("");
  const [productId, setProductId] = useState<String | null>(null);
  const [challengeId, setChallengeId] = useState<String | null>(null);

  const filterList = ["정보", "재미", "투자", "기업", "고급"];
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(-1);
  };
  const location = useLocation();
  const params = useParams();
  const boardId = params.boardId;

  useEffect(() => {
    if (location) {
      const searchParams = new URLSearchParams(location.search);
      setProductId(searchParams.get("productId"));
      setChallengeId(searchParams.get("challengeId"));
    }
  }, [location]);

  useEffect(() => {
    if (boardId) {
      console.log("entered to edit page");
      console.log(location.state);
      setCategoryId(location.state.category);
      setTitle(location.state.title);
      setBoardData(JSON.parse(location.state.content));
    }
  }, [boardId]);

  // console.log(categoryId);

  useEffect(() => {
    if (boardId) {
      switch (categoryId) {
        case "1":
          setSelected("정보");
          break;
        case "2":
          setSelected("재미");
          break;
        case "3":
          setSelected("투자");
          break;
        case "4":
          setSelected("기업");
          break;
        case "5":
          setSelected("고급");
          break;
      }
    }
  }, [boardId, categoryId]);

  const handleMenuItemClick = (text: string) => {
    setSelected(text);
    setCategoryId(filterList.indexOf(text) + 1 + "");
  };

  const handleRegister = async () => {
    if (!boardData) {
      window.alert("게시글 내용을 입력해주세요");
      return;
    }

    const boardRequest: BoardRequest = {
      title: title,
      content: boardData 
    }

    const requestBody: CreateBoardRequest | UpdateBoardRequest = boardId ? 
      {
        ...boardRequest,
        boardId: boardId
      }
      :
      {
        ...boardRequest,
        category: selected,
        productId: productId,
        challengeId: challengeId
      };
    
    const response = ("boardId" in requestBody) ?
      await updateBoard(requestBody.boardId, requestBody)
      : await createBoard(requestBody);
    

    if (response.success == true) {
      navigate(`/board/${boardId ? boardId : response.data.boardId}`);
    } else {
      window.alert("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="py-[2vh] px-[4.5vw]">
        {/* 헤더;; */}
        <nav className="fixed top-1 left-0 right-0 bg-[#ffffff]">
          <div className="relative flex justify-center items-center h-[6vh]">
            <img
              src={BackBtn}
              alt="Back"
              className="absolute left-4"
              onClick={handleBackButtonClick}
            />
            <Menu as="div" className=" flex justify-end inline-block text-left">
              <div className="">
                <MenuButton className="inline-flex w-full justify-center rounded-md bg-white text-lg text-black font-medium" disabled={boardId ? true : false}>
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
                        <MenuItem key={text}>
                          {({ active }) => (
                            <a
                              href="#"
                              className={`${active ? "bg-gray-100" : ""
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

            <div
              className="absolute right-4 font-medium text-lg"
              onClick={handleRegister}
            >
              {" "}
              {boardId ? "수정" : "작성"}
            </div>
          </div>
        </nav>
        {/* 여기까지 헤더 */}
        <div className="mt-[4vh]"></div>

        {/* 민우 TODO: 여기부터 Editor 관련 */}
        {
          boardId ?
            <BoardModifier
              setData={setBoardData}
              data={boardData}
              setTitle={setTitle}
              title={title}
            />
            :
            <BoardEditor
              setData={setBoardData}
              data={boardData}
              setTitle={setTitle}
              title={title}
            />
        }
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { AccountResponse, getAccounts } from "../../libs/apis/user";
import { useNavigate } from "react-router-dom";

type SelectAccountModalProps = {
  onClose: () => void;
  callback: (toAccount: string, fromAccount: string) => void;
};

const SelectAccountModal: React.FC<SelectAccountModalProps> = ({
  onClose,
  callback,
}) => {
  const navigate = useNavigate();
  const [accounts, setAccount] = useState<AccountResponse[]>([]);
  const [isConnected, setConnected] = useState<boolean>(true);
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await getAccounts();
        setAccount(res);
        setSelectAccount([...Array(res.length)].map(() => 0));
      } catch (err) {
        setConnected(false);
      }
    };

    fetchAccount();
  }, []);

  const errorScreen = () => {
    return (
      <div className="flex-col bg-white p-4 rounded-lg w-[40vh]">
        <div className="flex justify-between">
          <div className="text-white">111</div>
          <div className="text-xl">자산 연결 필요</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            onClick={onClose}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex justify-between mt-[2vh]">
          <p className="text-white">'</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="size-32"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          <p className="text-white">'</p>
        </div>

        <p className="text-xl text-center py-6">
          해당 챌린지는 자산 연결이 필요합니다.
        </p>
        <button
          onClick={() => {
            navigate("/asset?query=1");
          }}
          className="text-lg font-normal text-white text-center bg-[#748BFF] rounded-[1rem] shadow py-[2vh] w-full h-[5vh] flex items-center justify-center"
        >
          자산 연결하러 가기
        </button>
      </div>
    );
  };

  const [mode, setMode] = useState<number>(0);
  const [selectAccount, setSelectAccount] = useState<number[]>([]);

  const selectButton = (id: number) => {
    if (selectAccount[id] === 0) {
      return (
        <button className="text-sm font-normal px-2 text-white text-center bg-[#cfd8e8] rounded-[1rem] flex items-center justify-center">
          선택
        </button>
      );
    }

    if (selectAccount[id] === 1) {
      return (
        <button className="text-sm font-normal px-2 text-white text-center bg-[#748BFF] rounded-[1rem] flex items-center justify-center">
          저축
        </button>
      );
    }
    return (
      <button className="text-sm font-normal px-2 text-white text-center bg-[#f79e39] rounded-[1rem] flex items-center justify-center">
        송금
      </button>
    );
  };

  const handleSelectAccount = (id: number, accountType: string) => {
    if (mode === 2) {
      setSelectAccount(selectAccount.map((i) => 0));
    } else if (mode === 0) {
      setSelectAccount(
        selectAccount.map((i, index) => {
          if (index == id) return 1;
          return i;
        })
      );
    } else {
      if (accountType === "SAVING") {
        alert("적금은 송금할 수 없습니다");
        return;
      }

      setSelectAccount(
        selectAccount.map((i, index) => {
          if (index == id) return 2;
          return i;
        })
      );
    }

    setMode((mode + 1) % 3);
  };
  const accountComponent = (account: AccountResponse, id: number) => {
    return (
      <div
        className="flex justify-between my-3"
        onClick={() => handleSelectAccount(id, account.productType)}
      >
        <div className="flex">
          <img src={account.image} className="size-10" />
          <p className="w-[3vw]"></p>
          <div>
            <div className="text-sm">{account.name}</div>
            <div className="text-sm">
              {account.cash.toLocaleString() + " ₩"}
            </div>
          </div>
        </div>

        {selectButton(id)}
      </div>
    );
  };

  const confirmAccount = () => {
    var toAccount = null;
    var fromAccount = null;
    for (let i = 0; i < accounts.length; i++) {
      if (selectAccount[i] === 1) {
        toAccount = accounts[i].number;
      } else if (selectAccount[i] === 2) {
        fromAccount = accounts[i].number;
      }
    }

    if (toAccount && fromAccount) {
      callback(toAccount, fromAccount);
      onClose();
    } else {
      alert("저축 / 송금 계좌를 올바르게 선택해주세요");
    }
  };

  const getClassName = () => {
    if (mode === 0) return "font-semibold text-[#748BFF]";
    if (mode === 1) return "font-semibold text-[#f79e39]";
    if (mode === 2) return "font-semibold";
  };

  const getAccountTypeText = () => {
    if (mode === 0) return "저축할 계좌";
    if (mode === 1) return "송금할 계좌";
    if (mode === 2) return "";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {!isConnected ? (
        errorScreen()
      ) : (
        <div className="flex-col bg-white p-4 rounded-lg w-[40vh]">
          <div className="flex justify-between">
            <div className="text-white">111</div>
            <div className="text-xl">계좌 리스트</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              onClick={onClose}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="text-center">
            <span className={getClassName()}>{getAccountTypeText()}</span>
            {mode !== 2 ? "를 선택 해주세요" : "다시 누르면 초기화 됩니다"}
          </div>
          {accounts.map((account, index) => accountComponent(account, index))}

          <button
            onClick={confirmAccount}
            className="text-lg font-normal text-white text-center bg-[#748BFF] rounded-[1rem] shadow py-[2vh] w-full h-[5vh] flex items-center justify-center"
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectAccountModal;

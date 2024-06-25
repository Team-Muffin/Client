import { StateCreator, create } from "zustand";
import instance from "../libs/apis/base";
import {
  GlobalResponse,
  TokenInfoResponse,
} from "../libs/apis/responses/response";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Auth2State {
  id: number | null;
  nickname: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  accountTendency: boolean;
  cardTendency: boolean;
  loanTendency: boolean;
  investTendency: boolean;
  purpose: string | null;
  login: (tofinId: string, userInfo: string) => Promise<boolean>;
  logout: () => void;
  signUp: (
    tofinId: string,
    userInfo: string,
    nickname: string,
    profileImage: string,
    birthdate: string,
    job: string
  ) => Promise<boolean>;
  isAuthenticated: () => boolean;
  setTokenInfo: (
    id: number,
    nickname: string,
    access: string,
    refresh: string
  ) => void;
}

const auth2Slice: StateCreator<Auth2State, [["zustand/persist", unknown]]> = (
  set,
  get
) => ({
  id: null,
  nickname: null,
  accessToken: null,
  refreshToken: null,
  accountTendency: false,
  cardTendency: false,
  loanTendency: false,
  investTendency: false,
  purpose: null,
  login: async (tofinId: string, userInfo: string) => {
    try {
      const { data } = await instance.post("/user-service/sign-in", {
        tofinId: tofinId,
        userInfo: userInfo,
      });

      set({
        id: data.data.id,
        nickname: data.data.nickname,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
        accountTendency: data.data.account,
        cardTendency: data.data.card,
        loanTendency: data.data.loan,
        investTendency: data.data.invest,
        purpose: data.data.purpose,
      });
      return true;
    } catch (err) {
      return false;
    }
  },
  logout: () => {
    set({
      id: null,
      nickname: null,
      accessToken: null,
      refreshToken: null,
      accountTendency: false,
      cardTendency: false,
      loanTendency: false,
      investTendency: false,
      purpose: null,
    });
  },
  signUp: async (
    tofinId: string,
    userInfo: string,
    nickname: string,
    profileImage: string,
    birthdate: string,
    job: string
  ) => {
    try {
      const { data } = await instance.post<GlobalResponse<TokenInfoResponse>>(
        "/user-service/sign-up",
        {
          tofinId: tofinId,
          userInfo: userInfo,
          profileImg: profileImage,
          nickname: nickname,
          birth: birthdate,
          job: job,
        }
      );
      set({
        id: data.data.id,
        nickname: data.data.nickname,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      });
      return true;
    } catch {
      return false;
    }
  },
  isAuthenticated: () => {
    const currentState = get();
    return (
      currentState.accessToken !== null && currentState.refreshToken !== null
    );
  },
  setTokenInfo: (id, nickname, access, refresh) => {
    set({
      id: id,
      nickname: nickname,
      accessToken: access,
      refreshToken: refresh,
    });
  },
});

export const useAuth2Store = create<Auth2State>()(
  persist(auth2Slice, {
    name: "auth2-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useAuth2Store;

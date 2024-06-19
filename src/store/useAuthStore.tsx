// store.ts
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  userInfo: string;
  nickname: string;
  imgUrl: string;
  birthdate: string;
  login: (
    userId: string,
    userInfo: string,
    nickname: string,
    imgUrl: string,
    birthdate: string
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: "",
  userInfo: "",
  nickname: "",
  imgUrl: "",
  birthdate: "",
  login: (userId, userInfo, nickname, imgUrl, birthdate) =>
    set({
      isAuthenticated: true,
      userId,
      userInfo,
      nickname,
      imgUrl,
      birthdate,
    }),
  logout: () =>
    set({
      isAuthenticated: false,
      userId: "",
      userInfo: "",
      nickname: "",
      imgUrl: "",
      birthdate: "",
    }),
}));

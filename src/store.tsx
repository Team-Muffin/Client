// store.ts
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  userInfo: string | null;
  nickname: string | null;
  imgUrl: string | null;
  birthdate: string | null;
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
  userId: null,
  userInfo: null,
  nickname: null,
  imgUrl: null,
  birthdate: null,
  login: (userId, userInfo, nickname, imgUrl, birthdate) =>
    set((state) => ({
      ...state,
      isAuthenticated: true,
      userId,
      userInfo,
      nickname,
      imgUrl,
      birthdate,
    })),
  logout: () =>
    set({
      isAuthenticated: false,
      userId: null,
      userInfo: null,
      nickname: null,
      imgUrl: null,
      birthdate: null,
    }),
}));

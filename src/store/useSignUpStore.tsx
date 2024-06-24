import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import instance from "../libs/apis/base";
import { connectAsset } from "../libs/apis/user";

export interface AssetData {
  number: string;
  productType: string;
  name: string;
  cash: number;
  image: string;
}

export interface SignUpState {
  tofinId: string;
  userInfo: string;
  birthdate: string;
  assetData: AssetData[];
  setLoginInfo: (tofinId: string, userInfo: string) => void;
  connectAsset: (
    socialName: string,
    backId: string,
    contact: string
  ) => Promise<boolean>;
  setBirth: (birth: string) => void;
  clearLoginInfo: () => void;
  clear: () => void;
}

const signUpSlice: StateCreator<SignUpState, [["zustand/persist", unknown]]> = (
  set,
  get
) => ({
  tofinId: "",
  userInfo: "",
  birthdate: "",
  assetData: [],
  setLoginInfo: (tofinId, userInfo) => {
    set({ tofinId: tofinId, userInfo: userInfo });
  },
  connectAsset: async (socialName: string, backId: string, contact: string) => {
    try {
      const res = await connectAsset({
        socialName: socialName,
        backSocialId: backId,
        contact: contact,
      });

      set({ assetData: res.data });
      return true;
    } catch (err) {
      return false;
    }
  },
  setBirth: (birth: string) => {
    set({ birthdate: birth });
  },
  clearLoginInfo: () => {
    set({
      tofinId: "",
      userInfo: "",
    });
  },
  clear: () => {
    set({
      tofinId: "",
      userInfo: "",
      assetData: [],
      birthdate: "",
    });
  },
});

export const useSignUpStore = create<SignUpState>()(
  persist(signUpSlice, {
    name: "sigup-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useSignUpStore;

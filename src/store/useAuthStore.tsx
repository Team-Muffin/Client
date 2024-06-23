import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import instance from '../libs/apis/base';

interface AssetData {
  number: string;
  productType: string;
  name: string;
  cash: number;
  image: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  id: string;
  userId: string;
  userInfo: string;
  birthdate: string;
  accessToken: string;
  refreshToken: string;
  assetData: AssetData[];
  login: (
    id: string,
    userId: string,
    userInfo: string,
    birthdate: string,
    accessToken: string,
    refreshToken: string
  ) => void;
  logout: () => void;
  setAssetData: (data: AssetData[]) => void;
  refreshTokens: () => Promise<void>;
}

const authSlice: StateCreator<AuthState, [['zustand/persist', unknown]]> = (set, get) => ({
  isAuthenticated: false,
  id: '',
  userId: '',
  userInfo: '',
  birthdate: '',
  accessToken: '',
  refreshToken: '',
  assetData: [],
  login: (id, userId, userInfo, birthdate, accessToken, refreshToken) => {
    set({
      isAuthenticated: true,
      id,
      userId,
      userInfo,
      birthdate,
      accessToken,
      refreshToken
    });
  },
  logout: () => {
    set({
      isAuthenticated: false,
      id: '',
      userId: '',
      userInfo: '',
      birthdate: '',
      accessToken: '',
      refreshToken: '',
      assetData: [],
    });
  },
  setAssetData: (data: AssetData[]) => {
    set({ assetData: data });
  },
  refreshTokens: async () => {
    const { refreshToken } = get();
    try {
      const response = await instance.get('/user-service/reissue', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      const data = response.data;
      if (data.success) {
        set({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        });
      } else {
        console.error('Failed to refresh access token:', data.message);
      }
    } catch (error) {
      console.error('Failed to refresh access token:', error);
    }
  },
});

export const useAuthStore = create<AuthState>()(
  persist(authSlice, {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
  })
);

export default useAuthStore;

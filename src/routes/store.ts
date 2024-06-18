import create from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: null,
  login: (userId: string) => set({ isAuthenticated: true, userId }),
  logout: () => set({ isAuthenticated: false, userId: null }),
}));

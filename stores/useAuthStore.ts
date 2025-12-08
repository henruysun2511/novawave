import { AuthState } from "@/types/state.type";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,

  setAuth: (accessToken, user) =>
    set({ accessToken, user, isAuthenticated: true, }),

  logout: () =>
    set({ accessToken: null, user: null, isAuthenticated: false, }),
}));
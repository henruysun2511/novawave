import { AuthState } from "@/types/state.type";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  email: "",
  roleName: "",

  setAuth: (accessToken, user) =>
    set({ accessToken, user, isAuthenticated: true, }),

  setRoleName: (roleName) => 
    set({ roleName }),

  setEmail: (email) => 
    set({ email }),

  logout: () =>
    set({ accessToken: null, user: null, isAuthenticated: false, }),
}));
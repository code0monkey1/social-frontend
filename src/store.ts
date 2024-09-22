import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type User = {
  name: string;
  email: string;
  about: string;
  role: string;
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user: User) => set({ user }, undefined, "setUser"),
    logout: () => set({ user: null }, undefined, "logout"),
  }))
);

import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type AuthStore = {
  user: User | null;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthLoading: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthLoading: true,
  setUser: (user) => set({ user }),
  setIsAuthLoading: (value) => set({ isAuthLoading: value }),
}));

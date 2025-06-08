import { create } from 'zustand';
import { Pet, User } from '../types';

interface UserStore {
  user: Partial<User> | null;
  setUser: (user: User) => void;
  updateUser: (partial: Partial<User>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (partial) =>
    set((state) => ({ user: { ...state.user, ...partial } })),
  clearUser: () => set({ user: null }),
}));

import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type UserStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));

export default useUserStore;

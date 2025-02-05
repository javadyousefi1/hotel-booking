import { LocType } from '@/types/common';
import { create } from 'zustand';

type UserStore = {
  currentLocation: LocType | null;
  flyTo: (user: LocType) => void;
};

const useMapAction = create<UserStore>((set) => ({
  currentLocation: null,
  flyTo: (loc: LocType) => set({ currentLocation: loc }),
}));

export default useMapAction;

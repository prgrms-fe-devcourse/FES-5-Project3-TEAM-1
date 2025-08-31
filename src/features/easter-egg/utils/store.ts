import { create } from 'zustand';

type Store = {
  triggerWord: string;
};

type Action = {
  setTriggerWord: (triggerWord: string) => void;
};

export const useEasterEggStore = create<Store & Action>()((set) => ({
  triggerWord: '',
  setTriggerWord: (triggerWord) => set({ triggerWord }),
}));

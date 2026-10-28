import { create } from "zustand";
import { AnimalEnum } from "entities/cutie";

type ActiveTabState = {
  activeTab: AnimalEnum;
  setActiveTab: (activeTab: AnimalEnum) => void;
};

const useActiveTabStore = create<ActiveTabState>()(set => ({
  activeTab: AnimalEnum.DOG,
  setActiveTab: activeTab => set({ activeTab }),
}));

export const useActiveTab = () => {
  const activeTab = useActiveTabStore(state => state.activeTab);
  const setActiveTab = useActiveTabStore(state => state.setActiveTab);
  return [activeTab, setActiveTab] as const;
};

import { create } from "zustand";
import type { ModalState } from "./modal.types";

export const useModalStore = create<ModalState>()(set => ({
  current: null,
  showModal: current => set({ current }),
  hideModal: () => set({ current: null }),
}));

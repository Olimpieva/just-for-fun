import { useModalStore } from "./modal.store";

export const useCurrentModal = () => useModalStore(state => state.current);
export const useShowModal = () => useModalStore(state => state.showModal);
export const useHideModal = () => useModalStore(state => state.hideModal);

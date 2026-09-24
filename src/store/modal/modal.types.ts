export enum ModalType {
  SKILLS = "skills",
  EXPERIENCE = "experience",
  GALLERY = "gallery",
  EDUCATION = "education",
  MINESWEEPER = "minesweeper",
  FAVORITES = "favorites",
}

export type ModalState = {
  current: ModalType | null;
  showModal: (modal: ModalType) => void;
  hideModal: () => void;
};

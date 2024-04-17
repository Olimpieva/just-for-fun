export enum ModalType {
  SKILLS = "skills",
  EXPERIENCE = "experience",
  GALLERY = "gallery",
  EDUCATION = "education",
  MINESWEEPER = "minesweeper",
  FAVORITES = "favorites",
}

export type InitialState = {
  current: null | ModalType;
};

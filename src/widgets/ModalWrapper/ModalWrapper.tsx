import React from "react";
import {
  EducationWidget,
  ExperienceWidget,
  FavoritesWidget,
  GalleryWidget,
  Minesweeper,
  SkillsWidget,
} from "widgets";
import { Modal } from "components";
import { ModalType, useCurrentModal, useHideModal } from "store/modal";

const Modals: Record<ModalType, React.JSX.Element> = {
  skills: <SkillsWidget />,
  experience: <ExperienceWidget />,
  gallery: <GalleryWidget />,
  education: <EducationWidget />,
  minesweeper: <Minesweeper />,
  favorites: <FavoritesWidget />,
};

const ModalWrapper = () => {
  const hideModal = useHideModal();
  const currentModal = useCurrentModal();

  const onClose = () => {
    if (!currentModal) return;
    hideModal();
  };

  if (!currentModal) return null;

  return <Modal onClose={onClose}>{Modals[currentModal]}</Modal>;
};

export default ModalWrapper;

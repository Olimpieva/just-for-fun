import React from "react";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import {
  EducationWidget,
  ExperienceWidget,
  FavoritesWidget,
  GalleryWidget,
  Minesweeper,
  SkillsWidget,
} from "widgets";
import { Modal } from "components";
import { ModalType } from "../../redux/modal/types";
import { hideModal } from "../../redux/modal/actions";
import { clearCurrentImage } from "../../redux/gallery/actions";
import { selectCurrentModal } from "../../redux/modal/selectors";

const Modals: Record<ModalType, JSX.Element> = {
  skills: <SkillsWidget />,
  experience: <ExperienceWidget />,
  gallery: <GalleryWidget />,
  education: <EducationWidget />,
  minesweeper: <Minesweeper />,
  favorites: <FavoritesWidget />,
};

const ModalWrapper = () => {
  const dispatch = useAppDispatch();
  const currentModal = useAppSelector(selectCurrentModal);
  console.log({ currentModal });

  const onClose = () => {
    if (!currentModal) return;
    dispatch(hideModal(currentModal));
  };

  const onGalleryClose = () => {
    onClose();
    dispatch(clearCurrentImage());
  };

  if (!currentModal) return null;

  if (currentModal === ModalType.GALLERY) {
    return (
      <Modal onClose={onGalleryClose}>
        <GalleryWidget />
      </Modal>
    );
  }

  return <Modal onClose={onClose}>{Modals[currentModal]}</Modal>;
};

export default ModalWrapper;

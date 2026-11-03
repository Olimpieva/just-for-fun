import type React from "react";

import { Modal } from "shared/ui";
import { useCurrentModal, useHideModal, type ModalType } from "store/modal";
import { Education, Experience, Favorites, Gallery, Minesweeper, Skills } from "widgets";

const modals: Record<ModalType, { title: string; content: React.JSX.Element }> = {
  skills: { title: "Навыки", content: <Skills /> },
  experience: { title: "Опыт", content: <Experience /> },
  gallery: { title: "Галерея", content: <Gallery /> },
  education: { title: "Образование", content: <Education /> },
  minesweeper: { title: "Сапёр", content: <Minesweeper /> },
  favorites: { title: "Избранное", content: <Favorites /> },
};

export const ModalWrapper = () => {
  const hideModal = useHideModal();
  const currentModal = useCurrentModal();

  const onClose = () => {
    if (!currentModal) return;
    hideModal();
  };

  if (!currentModal) return null;

  const { title, content } = modals[currentModal];

  return (
    <Modal key={currentModal} title={title} onClose={onClose}>
      {content}
    </Modal>
  );
};

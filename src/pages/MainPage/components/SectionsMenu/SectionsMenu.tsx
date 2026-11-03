import type { KeyboardEvent } from "react";

import BombIcon from "assets/sections/bomb_lines.svg?react";
import EducationIcon from "assets/sections/education.svg?react";
import ExperienceIcon from "assets/sections/experience.svg?react";
import GalleryIcon from "assets/sections/gallery.svg?react";
import HeartIcon from "assets/sections/heart.svg?react";
import WrenchIcon from "assets/sections/wrench.svg?react";
import { Tooltip } from "shared/ui";
import { ModalType, useShowModal } from "store/modal";

import css from "./SectionsMenu.module.scss";

const SECTION_TOOLTIP = "Двойной клик откроет раздел";

const sections = [
  { modal: ModalType.SKILLS, label: "skills_", Icon: WrenchIcon, align: "start" },
  { modal: ModalType.EXPERIENCE, label: "expierence_", Icon: ExperienceIcon, align: "center" },
  { modal: ModalType.EDUCATION, label: "education_", Icon: EducationIcon, align: "center" },
  { modal: ModalType.GALLERY, label: "watch me_", Icon: GalleryIcon, align: "center" },
  { modal: ModalType.MINESWEEPER, label: "play me_", Icon: BombIcon, align: "center" },
  { modal: ModalType.FAVORITES, label: "favorites_", Icon: HeartIcon, align: "end" },
] as const;

export const SectionsMenu = () => {
  const showModal = useShowModal();

  const handleKeyDown = (modal: ModalType) => (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      showModal(modal);
    }
  };

  return (
    <div className={css.container}>
      {sections.map(section => (
        <Tooltip key={section.modal} content={SECTION_TOOLTIP} align={section.align}>
          <button
            type="button"
            className={css.button}
            onDoubleClick={() => showModal(section.modal)}
            onKeyDown={handleKeyDown(section.modal)}
          >
            <section.Icon width={48} height={48} color="white" />
            {section.label}
          </button>
        </Tooltip>
      ))}
    </div>
  );
};

import Tooltip from "components/Tooltip";
import BombIcon from "assets/bomb_lines.svg?react";
import GalleryIcon from "assets/gallery.svg?react";
import WrenchIcon from "assets/wrench.svg?react";
import EducationIcon from "assets/education.svg?react";
import ExperienceIcon from "assets/experience.svg?react";
import HeartIcon from "assets/heart.svg?react";
import { ModalType, useShowModal } from "store/modal";

import css from "./Tabs.module.scss";

const SECTION_TOOLTIP = "Двойной клик откроет раздел";

const Tabs = () => {
  const showModal = useShowModal();

  const onSkillsClick = () => {
    showModal(ModalType.SKILLS);
  };

  const onEducationClick = () => {
    showModal(ModalType.EDUCATION);
  };

  const onExperienceClick = () => {
    showModal(ModalType.EXPERIENCE);
  };

  const onMinesweeperClick = () => {
    showModal(ModalType.MINESWEEPER);
  };

  const onGalleryClick = () => {
    showModal(ModalType.GALLERY);
  };

  const onFavoritesClick = () => {
    showModal(ModalType.FAVORITES);
  };

  return (
    <div className={css.container}>
      <Tooltip content={SECTION_TOOLTIP} align="start">
        <button onDoubleClick={onSkillsClick} className={css.button}>
          <WrenchIcon width={48} height={48} color="white" />
          skills_
        </button>
      </Tooltip>
      <Tooltip content={SECTION_TOOLTIP}>
        <button onDoubleClick={onExperienceClick} className={css.button}>
          <ExperienceIcon width={48} height={48} color="white" />
          expierence_
        </button>
      </Tooltip>
      <Tooltip content={SECTION_TOOLTIP}>
        <button onDoubleClick={onEducationClick} className={css.button}>
          <EducationIcon width={48} height={48} color="white" />
          education_
        </button>
      </Tooltip>
      <Tooltip content={SECTION_TOOLTIP}>
        <button onDoubleClick={onGalleryClick} className={css.button}>
          <GalleryIcon width={48} height={48} color="white" />
          watch me_
        </button>
      </Tooltip>
      <Tooltip content={SECTION_TOOLTIP}>
        <button onDoubleClick={onMinesweeperClick} className={css.button}>
          <BombIcon width={48} height={48} color="white" />
          play me_
        </button>
      </Tooltip>
      <Tooltip content={SECTION_TOOLTIP} align="end">
        <button onDoubleClick={onFavoritesClick} className={css.button}>
          <HeartIcon width={48} height={48} color="white" />
          favorites_
        </button>
      </Tooltip>
    </div>
  );
};

export default Tabs;

import React from "react";
import Tooltip from "components/Tooltip";
import { ReactComponent as BombIcon } from "assets/bomb_lines.svg";
import { ReactComponent as GalleryIcon } from "assets/gallery.svg";
import { ReactComponent as WrenchIcon } from "assets/wrench.svg";
import { ReactComponent as EducationIcon } from "assets/education.svg";
import { ReactComponent as ExperienceIcon } from "assets/experience.svg";
import { ReactComponent as HeartIcon } from "assets/heart.svg";
import { useAppDispatch } from "utils/hooks";
import { showModal } from "../../redux/modal/actions";
import { ModalType } from "../../redux/modal/types";

import css from "./Tabs.module.scss";

const SECTION_TOOLTIP = "Двойной клик откроет раздел";

const Tabs = () => {
  const dispatch = useAppDispatch();

  const onSkillsClick = () => {
    dispatch(showModal(ModalType.SKILLS));
  };

  const onEducationClick = () => {
    dispatch(showModal(ModalType.EDUCATION));
  };

  const onExperienceClick = () => {
    dispatch(showModal(ModalType.EXPERIENCE));
  };

  const onMinesweeperClick = () => {
    dispatch(showModal(ModalType.MINESWEEPER));
  };

  const onGalleryClick = () => {
    dispatch(showModal(ModalType.GALLERY));
  };

  const onFavoritesClick = () => {
    dispatch(showModal(ModalType.FAVORITES));
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

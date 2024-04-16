import React from "react";
import cn from "classnames";
import {
  EducationWidget,
  ExperienceWidget,
  KeepInTouch,
  Minesweeper,
  SkillsWidget,
  GalleryWidget,
} from "widgets";

import css from "./MainPage.module.scss";

const MainPage = () => (
  <div className={css.page}>
    <div className={css.container}>
      <div className={css.header}>
        <div>
          <h1 className={cn(css.title)}>Олимпиева Наталья Игоревна</h1>
          <h3 className={cn(css.subtitle)}>Фронтенд разработчик</h3>
          <p className={css.description}>
            Люблю и умею искать простые решения сложных задач.
          </p>
        </div>

        <KeepInTouch />
      </div>

      <div className={css.info}>
        <div className={css.row}>
          <SkillsWidget />
        </div>
        <ExperienceWidget />
        <EducationWidget />
      </div>

      <div className={css.fun}>
        <Minesweeper />
        <GalleryWidget />
      </div>
    </div>
  </div>
);

export default MainPage;

import React from "react";
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
          <h1 className={css.title}>Олимпиева Наталья Игоревна</h1>
          <h3 className={css.subtitle}>Фронтенд разработчик</h3>
          <p className={css.description}>
            Люблю и умею искать простые решения сложных задач.
          </p>
        </div>

        <KeepInTouch />
      </div>

      <div className={css.flex}>
        <SkillsWidget />

        <div className={css.grid}>
          <ExperienceWidget />
          <GalleryWidget />
        </div>

        <EducationWidget />
        <div className={css.da}>
          <Minesweeper />
        </div>
      </div>
    </div>
  </div>
);

export default MainPage;

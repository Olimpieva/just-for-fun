import React from "react";
import cn from "classnames";
import { TypingText } from "components";

import css from "./MainPage.module.scss";

const MainPage = () => (
  <div className={css.page}>
    <div className={css.container}>
      <div className={css.header}>
        <div>
          <h1 className={cn(css.title)}>Олимпиева Наталья Игоревна</h1>
          <h3 className={cn(css.subtitle)}>Фронтенд разработчик</h3>
        </div>
      </div>

      <TypingText
        text="Люблю и умею искать простые решения сложных задач."
        className={css.description}
      />
    </div>
  </div>
);

export default MainPage;

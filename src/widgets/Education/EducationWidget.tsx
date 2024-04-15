import React from "react";
import { Button, Card, FlippedBadge } from "components";

import css from "./EducationWidget.module.scss";

// eslint-disable-next-line arrow-body-style
const EducationWidget = () => {
  return (
    <Card title="Образование" className={css.customWidth}>
      <ul className={css.list}>
        <li className={css.item}>
          <span className={css.passive}>
            2016 Курский государственный университет
          </span>
          <span className={css.active}>математическое моделирование</span>
        </li>
        <li className={css.item}>
          <span className={css.passive}>
            2018 Курский государственный университет
          </span>
          <span className={css.active}>информационная безопасность</span>
        </li>
        <li className={css.item}>
          <span className={css.passive}>2021 Яндекс</span>
          <span className={css.active}>веб-разработчик</span>
        </li>
        <li className={css.item}>
          <span className={css.passive}>2021 Javascript.ru</span>
          <span className={css.active}>React + Redux</span>
        </li>
        <li className={css.item}>
          <span className={css.passive}>2022 Javascript.ru</span>
          <span className={css.active}>Typescipt</span>
        </li>
      </ul>
    </Card>
  );
};

export default EducationWidget;

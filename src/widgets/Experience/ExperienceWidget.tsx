import React from "react";
import { Button, Card, Link } from "components";

import css from "./ExperienceWidget.module.scss";

// eslint-disable-next-line arrow-body-style
const ExperienceWidget = () => {
  return (
    <Card title="Опыт" className={css.customWidth}>
      <ul className={css.list}>
        <li className={css.item}>
          <span>SMM Games</span>
          <span className={css.card}>2023 2024</span>
        </li>
        <li className={css.item}>
          <span>Jiff food</span>
          <span className={css.card}>2021 2023</span>
        </li>
        <li className={css.item}>
          <span>Фриланс</span>
          <span className={css.card}>2021</span>
        </li>
      </ul>
    </Card>
  );
};

export default ExperienceWidget;

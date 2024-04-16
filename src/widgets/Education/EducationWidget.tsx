import React from "react";
import { Card, ColorBlockBadge, GlitchedTitle } from "components";

import css from "./EducationWidget.module.scss";

const EducationWidget = () => (
  <Card
    title={
      <div className={css.wrapper}>
        <GlitchedTitle.Pixel title="образование и курсы" />
      </div>
    }
    className={css.customWidth}
  >
    <ul className={css.grid}>
      <ColorBlockBadge
        front={{ title: "математическое моделирование", subtitle: "2016" }}
        back={{ subtitle: "Курский государственный университет" }}
      />

      <ColorBlockBadge
        front={{ title: "информационная безопасность", subtitle: "2018" }}
        back={{ subtitle: "Курский государственный университет" }}
      />

      <ColorBlockBadge
        front={{ title: "веб-разработчик", subtitle: "2021" }}
        back={{ subtitle: "Яндекс" }}
      />

      <ColorBlockBadge
        front={{ title: "React + Redux", subtitle: "2021" }}
        back={{ subtitle: "Javascript.ru" }}
      />

      <ColorBlockBadge
        front={{ title: "Typescipt", subtitle: "2022" }}
        back={{ subtitle: "Javascript.ru" }}
      />

      <ColorBlockBadge
        front={{ title: "Three.js", subtitle: "2024" }}
        back={{ subtitle: "threejs-journey.com" }}
      />
    </ul>
  </Card>
);

export default EducationWidget;

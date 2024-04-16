import React from "react";
import { Card, FlippedBadge, GlitchedTitle } from "components";

import css from "./ExperienceWidget.module.scss";

const Title = () => (
  <div className={css.titleWrapper}>
    <GlitchedTitle title="Опыт" />
  </div>
);

const ExperienceWidget = () => (
  <Card title={<Title />} className={css.customWidth}>
    <ul className={css.list}>
      <li>
        <FlippedBadge
          front={{ title: "smm games", subtitle: "2023-2024" }}
          back={{
            title: "frontend разработчик",
            subtitle: "typescript, react, redux",
          }}
        />
      </li>

      <li>
        <FlippedBadge
          front={{ title: "jiff food", subtitle: "2021-2023" }}
          back={{
            title: "frontend разработчик",
            subtitle: "typescript, react, redux",
          }}
        />
      </li>

      <li>
        <FlippedBadge
          front={{ title: "Freelance", subtitle: "2021" }}
          back={{
            title: "fullstack разработчик",
            subtitle: "React, Node.js, Express",
          }}
        />
      </li>
    </ul>
  </Card>
);

export default ExperienceWidget;

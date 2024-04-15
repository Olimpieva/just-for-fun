import React from "react";
import { Button, Card, FlippedBadge, GlitchedTitle, Link } from "components";

import css from "./ExperienceWidget.module.scss";

// eslint-disable-next-line arrow-body-style
const ExperienceWidget = () => {
  return (
    <Card title="" className={css.customWidth}>
      <div className={css.titleContainer}>
        <GlitchedTitle title="Опыт" />
      </div>
      <ul className={css.list}>
        <FlippedBadge
          front={{ title: "smm games", subtitle: "2023-2024" }}
          back={{
            title: "frontend разработчик",
            subtitle: "typescript, react, redux",
          }}
        />

        <FlippedBadge
          front={{ title: "jiff food", subtitle: "2021-2023" }}
          back={{
            title: "frontend разработчик",
            subtitle: "typescript, react, redux",
          }}
        />

        <FlippedBadge
          front={{ title: "Freelance", subtitle: "2021" }}
          back={{
            title: "fullstack разработчик",
            subtitle: "React, Node.js, Express",
          }}
        />
      </ul>
    </Card>
  );
};

export default ExperienceWidget;

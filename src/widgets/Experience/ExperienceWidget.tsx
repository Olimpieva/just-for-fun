import React from "react";
import { Card, FlippedBadge, GlitchedTitle } from "components";

import css from "./ExperienceWidget.module.scss";

const Title = () => (
  <div className={css.titleWrapper}>
    <GlitchedTitle.Pixel title="Опыт" />
  </div>
);

const ExperienceWidget = () => (
  <Card title={<Title />} className={css.customWidth}>
    <ul className={css.list}>
      <li>
        <FlippedBadge
          front={{ title: "ФИТ", subtitle: "2024-2026" }}
          back={{
            title: "frontend разработчик",
            subtitle:
              "TypeScript · React · Next.js · Redux · Zustand · TanStack Query",
          }}
        />
      </li>

      <li>
        <FlippedBadge
          front={{ title: "smm games", subtitle: "2023-2024" }}
          back={{
            title: "frontend разработчик",
            subtitle:
              "TypeScript · React · Redux · React Router · Ant Design · Playwright · ECharts",
          }}
        />
      </li>

      <li>
        <FlippedBadge
          front={{ title: "jiff food", subtitle: "2021-2023" }}
          back={{
            title: "frontend разработчик",
            subtitle:
              "TypeScript · React · Redux · React Router · Jest · Playwright",
          }}
        />
      </li>
    </ul>
  </Card>
);

export default ExperienceWidget;

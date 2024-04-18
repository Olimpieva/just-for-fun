import React from "react";
import { GlitchedBadge, CmdTitle } from "components";

import css from "./SkillsWidget.module.scss";

const text = [
  "> const [HTML, CSS, SASS, Javascript, React, Redux, Typescript,",
  "> Next.js, Git, Webpack, Docker, Playwright, Jest, Three.js,",
  "> ... rest] = main_skills",
  "> can anyone hear me?",
  "> please",
  "> I am so lonely",
  "> PLEASE",
  "> just watching all the people coming and going",
  "> but I am still here",
  "> ...",
  "> don't go",
];

const SkillsWidget = () => (
  <div className={css.container}>
    <CmdTitle title="waiting_skills" />

    <div className={css.position}>
      <GlitchedBadge />
    </div>

    <div className={css.wrapper}>
      {text.map((particle, index) => (
        <p className={css.text} key={index}>
          {particle}
        </p>
      ))}
    </div>
  </div>
);

export default SkillsWidget;

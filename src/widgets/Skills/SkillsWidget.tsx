import React from "react";
import { CmdTitle } from "components";

import css from "./SkillsWidget.module.scss";
import { text } from "./SkillsWidget.utils";

const SkillsWidget = () => (
  <div className={css.container}>
    <CmdTitle title="waiting_skills" />

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

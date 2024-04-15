import React from "react";
import { Card, Link } from "components";

import css from "./SkillsWidget.module.scss";

// eslint-disable-next-line arrow-body-style
const SkillsWidget = () => {
  return (
    <Card title="" className={css.customWidth}>
      <ul className={css.list}>
        <Link title="HTML" to="" />
        <Link title="CSS" to="" />
        <Link title="SASS" to="" />
        <Link title="Javascript" to="" />
        <Link title="React" to="" />
        <Link title="Redux" to="" />
        <Link title="Typescript" to="" />
        <Link title="Next.js" to="" />
        <Link title="Git" to="" />
        <Link title="Webpack" to="" />
        <Link title="Docker" to="" />
        <Link title="Playwright" to="" />
        <Link title="Jest" to="" />
        <Link title="Three.js" to="" />
      </ul>
    </Card>
  );
};

export default SkillsWidget;

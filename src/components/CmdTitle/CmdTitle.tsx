import React from "react";

import css from "./CmdTitle.module.scss";

type Props = {
  title: string;
};

const CmdTitle = ({ title }: Props) => (
  <div className={css.container}>
    <span className={css.arrow}>{`>`}</span>
    <p className={css.title}>{title}</p>
    <span className={css.dash}>_</span>
  </div>
);

export default CmdTitle;

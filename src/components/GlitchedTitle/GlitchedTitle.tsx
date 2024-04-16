import React from "react";
import css from "./GlitchedTitle.module.scss";

type Props = {
  title: string;
};

const GlitchedTitle = ({ title }: Props) => (
  <div className={css.container}>
    <div className={css.title} data-text={title}>
      {title}
    </div>
    <div className={css.shadow}>{title}</div>
  </div>
);

export default GlitchedTitle;

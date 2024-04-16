import React from "react";
import css from "./GlitchedTitle.module.scss";

type Props = {
  title: string;
};

const ItalicGlitchedTitle = ({ title }: Props) => (
  <div className={css.italic}>
    <div className={css.title} data-text={title}>
      {title}
    </div>
    <div className={css.shadow}>{title}</div>
  </div>
);

const PixelGlitchedTitle = ({ title }: Props) => (
  <h2 className={css.pixel}>{title}</h2>
);

export { ItalicGlitchedTitle, PixelGlitchedTitle };

import React from "react";

import css from "./SweetTitle.module.scss";

type Props = {
  title: { top: string; bottom?: string };
};

const SweetTitle = ({ title }: Props) => (
  <div className={css.title}>
    <span data-text={title.top}>{title.top}</span>
    <span data-text={title.bottom}>{title.bottom}</span>
  </div>
);

export default SweetTitle;

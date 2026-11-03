import type React from "react";

import css from "./RainbowTitle.module.scss";

type Props = {
  title: string;
  icon?: React.ReactElement;
};

export const RainbowTitle = ({ title, icon }: Props) => {
  return (
    <div className={css.container}>
      {icon}
      <h3 className={css.title}>{title}</h3>
    </div>
  );
};

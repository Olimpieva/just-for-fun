import React from "react";

import css from "./RainbowTitle.module.scss";

type Props = {
  title: string;
  icon?: React.ReactElement;
};

// eslint-disable-next-line arrow-body-style
const RainbowTitle = ({ title, icon }: Props) => {
  return (
    <div className={css.container}>
      {icon}
      <h3 className={css.title}>{title}</h3>
    </div>
  );
};

export default RainbowTitle;

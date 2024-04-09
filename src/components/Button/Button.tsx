import React from "react";
import css from "./Button.module.scss";

type Props = {
  title: string;
  onClick: () => void;
};

// eslint-disable-next-line arrow-body-style
const Button = ({ title, onClick }: Props) => {
  return (
    <button className={css.button} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;

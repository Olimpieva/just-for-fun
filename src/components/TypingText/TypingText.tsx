import React from "react";
import cn from "classnames";

import css from "./TypingText.module.scss";

type Props = {
  text: string;
  className: string;
};

// eslint-disable-next-line arrow-body-style
const TypingText = ({ text, className }: Props) => {
  return (
    <div className={css.container}>
      <p className={cn(css.text, className)}>{text}</p>
    </div>
  );
};

export default TypingText;

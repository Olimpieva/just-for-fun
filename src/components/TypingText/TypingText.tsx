import React from "react";
import cn from "classnames";

import css from "./TypingText.module.scss";

type Props = {
  text: string;
  className?: string;
};

const TypingText = ({ text, className }: Props) => (
  <div className={css.container}>
    <p className={cn(css.text, className)}>{text}</p>
  </div>
);

export default TypingText;

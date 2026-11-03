import cn from "classnames";

import css from "./TypingText.module.scss";

type Props = {
  text: string;
  className?: string;
};

export const TypingText = ({ text, className }: Props) => (
  <div className={css.container}>
    <p className={cn(css.text, className)}>{text}</p>
  </div>
);

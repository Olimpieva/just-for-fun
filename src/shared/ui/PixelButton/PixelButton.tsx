import cn from "classnames";
import type { ButtonHTMLAttributes } from "react";

import css from "./PixelButton.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const PixelButton = ({ children, className, type = "button", ...props }: Props) => (
  <button type={type} className={cn(css.button, className)} {...props}>
    <span className={css.face}>{children}</span>
  </button>
);

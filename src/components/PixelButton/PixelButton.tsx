import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import css from "./PixelButton.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const PixelButton = ({
  children,
  className,
  type = "button",
  ...props
}: Props) => (
  <button type={type} className={cn(css.button, className)} {...props}>
    <span className={css.face}>{children}</span>
  </button>
);

export default PixelButton;

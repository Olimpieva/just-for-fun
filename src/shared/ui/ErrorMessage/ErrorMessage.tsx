import cn from "classnames";
import type { ReactNode } from "react";

import css from "./ErrorMessage.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
};

export const ErrorMessage = ({ children, className }: Props) => (
  <p className={cn(css.error, className)} role="alert">
    {children}
  </p>
);

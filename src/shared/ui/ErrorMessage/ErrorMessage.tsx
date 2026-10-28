import type { ReactNode } from "react";
import cn from "classnames";
import css from "./ErrorMessage.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
};

const ErrorMessage = ({ children, className }: Props) => (
  <p className={cn(css.error, className)} role="alert">
    {children}
  </p>
);

export default ErrorMessage;

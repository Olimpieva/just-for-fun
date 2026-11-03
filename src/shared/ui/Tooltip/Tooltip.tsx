import cn from "classnames";
import { cloneElement, useId, type ReactElement, type ReactNode } from "react";

import css from "./Tooltip.module.scss";

type Props = {
  children: ReactElement<{ "aria-describedby"?: string }>;
  content: ReactNode;
  align?: "start" | "center" | "end";
  placement?: "top" | "bottom";
  variant?: "light" | "dark";
  open?: boolean;
};

export const Tooltip = ({
  children,
  content,
  align = "center",
  placement = "top",
  variant = "light",
  open = false,
}: Props) => {
  const id = useId();
  const describedBy = [children.props["aria-describedby"], id].filter(Boolean).join(" ");

  return (
    <span
      className={cn(css.wrapper, css[align], css[placement], css[variant], {
        [css.open]: open,
      })}
    >
      {cloneElement(children, { "aria-describedby": describedBy })}
      <span id={id} role="tooltip" className={css.tooltip}>
        {content}
      </span>
    </span>
  );
};

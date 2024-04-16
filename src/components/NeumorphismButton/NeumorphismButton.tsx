import React, { MouseEventHandler, PropsWithChildren } from "react";
import cn from "classnames";

import css from "./NeumorphismButton.module.scss";

type Props = {
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const NeumorphismButton = ({
  disabled,
  onClick,
  children,
  className,
  ...props
}: PropsWithChildren<Props>) => (
  <button
    className={cn(css.button, className, {
      [css.disabled]: disabled,
    })}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default NeumorphismButton;

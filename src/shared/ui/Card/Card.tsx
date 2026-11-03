import cn from "classnames";
import type { PropsWithChildren, ReactElement } from "react";

import css from "./Card.module.scss";

type Props = {
  title: string | ReactElement;
  className?: string;
};

export const Card = ({ title, className, children }: PropsWithChildren<Props>) => {
  return (
    <div className={cn(css.card, className)}>
      <h2 className={css.title}>{title}</h2>
      <div className="p-20">{children}</div>
    </div>
  );
};

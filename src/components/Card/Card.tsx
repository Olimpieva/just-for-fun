import React, { PropsWithChildren } from "react";
import cn from "classnames";
import css from "./Card.module.scss";

type Props = {
  title: string;
  className?: string;
};

// eslint-disable-next-line arrow-body-style
const Card = ({ title, className, children }: PropsWithChildren<Props>) => {
  return (
    <div className={cn(css.card, className)}>
      <h2 className={css.title}>
        <span>{title}</span>
      </h2>
      <div className="p-20">{children}</div>
    </div>
  );
};

export default Card;

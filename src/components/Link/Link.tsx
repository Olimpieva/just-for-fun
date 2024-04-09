import React, { PropsWithChildren } from "react";
import css from "./Link.module.scss";

type Props = {
  title: string;
  to: string;
};

// eslint-disable-next-line arrow-body-style
const Link = ({ title, to, children }: PropsWithChildren<Props>) => {
  return (
    <a href={to} target="_blank" rel="noreferrer" className={css.link}>
      {children}
      {title}
    </a>
  );
};

export default Link;

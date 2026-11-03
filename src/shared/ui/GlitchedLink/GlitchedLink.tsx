import type { PropsWithChildren } from "react";

import css from "./GlitchedLink.module.scss";

type Props = {
  to: string;
  text: string;
};

export const GlitchedLink = ({ to, text, children }: PropsWithChildren<Props>) => (
  <a href={to} target="_blank" rel="noreferrer" className={css.link} data-text={text}>
    {children}
  </a>
);

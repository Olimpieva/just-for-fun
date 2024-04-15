import React, { PropsWithChildren } from "react";
import css from "./BlodBadge.module.scss";

const BlodBadge = ({ children }: PropsWithChildren<{}>) => (
  <div className={css.container}>
    <div className={css.content}>{children}</div>
  </div>
);

export default BlodBadge;

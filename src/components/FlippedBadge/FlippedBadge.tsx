import React from "react";
import css from "./FlippedBadge.module.scss";

type Props = {
  front: {
    title: string;
    subtitle?: string;
  };
  back: {
    title: string;
    subtitle?: string;
  };
};

const FlippedBadge = ({ front, back }: Props) => (
  <div className={css.container}>
    <div className={css.front}>
      <p>{front.subtitle}</p>
      <h3>{front.title}</h3>
    </div>
    <div className={css.back}>
      <h3>{back.title}</h3>
      <p>{back.subtitle}</p>
    </div>
  </div>
);

export default FlippedBadge;

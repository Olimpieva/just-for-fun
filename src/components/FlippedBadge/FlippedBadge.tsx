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
      <h1 className={css.shadow}>{front.title}</h1>
    </div>
    <div className={css.back}>
      <h2>{back.title}</h2>
      <p>{back.subtitle}</p>
    </div>
  </div>
);

export default FlippedBadge;

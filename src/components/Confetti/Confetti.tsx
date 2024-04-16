import React from "react";

import css from "./Confetti.module.scss";

const particlesNum = 100;
const particlesArray = Array.from({ length: particlesNum });

type Props = {
  width?: number;
  height?: number;
};

const Confetti = ({ height = 360, width = 360 }: Props) => (
  <div
    className={css.container}
    style={{
      width: `${width}px`,
      minHeight: `${height}px}`,
    }}
  >
    {particlesArray.map((_, i) => (
      <div key={i} className={css.particle} />
    ))}
  </div>
);

export default Confetti;

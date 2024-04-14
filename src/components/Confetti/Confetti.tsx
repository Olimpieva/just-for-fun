import React, { useMemo, useRef } from "react";

import css from "./Confetti.module.scss";

const particlesNum = 100;
const particlesArray = Array.from({ length: particlesNum });

const Confetti = () => {
  const confetti = useRef(null);

  const particles = useMemo(
    () =>
      particlesArray.map((_, i) => <div key={i} className={`confetti-${i}`} />),
    [],
  );

  return (
    <div ref={confetti} className={css.container}>
      {particles}
    </div>
  );
};

export default Confetti;

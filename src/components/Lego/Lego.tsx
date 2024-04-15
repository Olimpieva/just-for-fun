import React from "react";
import css from "./Lego.module.scss";

const Lego = () => (
  <div className={css.lego}>
    <div className={css.cube} />
    <div className={css.cube} />
    <div className={css.cube} />
    <div className={css.cube} />
  </div>
);

export default Lego;

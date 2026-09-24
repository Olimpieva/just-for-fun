import React, { useState } from "react";
import { GlitchedTitle } from "components";
import Tooltip from "components/Tooltip";
import hoverSparkle from "assets/skills/hover-sparkle.png";

import css from "./SkillsWidget.module.scss";
import { technologies } from "./SkillsWidget.utils";

const SkillsWidget = () => {
  const [touched, setTouched] = useState<string | null>(null);

  return (
    <section className={css.container} aria-labelledby="skills-title">
      <header className={css.header}>
        <div id="skills-title" className={css.title}>
          <GlitchedTitle.Pixel title="Навыки" />
        </div>
      </header>
      <div className={css.content}>
        <ul className={css.collection} aria-label="Технологии">
          {technologies.map(
            ({ name, icon, skill, base, activeBase, shape }) => (
              <li className={css.item} key={name}>
                <Tooltip
                  content={
                    <span className={css.skillList}>
                      {skill.map(item => (
                        <span key={item}>{item}</span>
                      ))}
                    </span>
                  }
                  placement="bottom"
                  variant="dark"
                  open={touched === name}
                >
                  <button
                    type="button"
                    className={css.technology}
                    data-technology={name}
                    data-shape={shape}
                    data-active={touched === name || undefined}
                    onPointerDown={event => {
                      if (event.pointerType === "touch") {
                        setTouched(current => (current === name ? null : name));
                      }
                    }}
                    onBlur={() => setTouched(null)}
                    onKeyDown={event => {
                      if (event.key === "Escape") {
                        setTouched(null);
                        event.currentTarget.blur();
                      }
                    }}
                  >
                    <span className={css.pinSlot} aria-hidden="true">
                      <span className={css.pin}>
                        <img className={css.base} src={base} alt="" />
                        <img
                          className={css.activeBase}
                          src={activeBase}
                          alt=""
                        />
                        <img className={css.logo} src={icon} alt="" />
                      </span>
                      <img className={css.sparkle} src={hoverSparkle} alt="" />
                    </span>
                    <span className={css.label}>{name}</span>
                  </button>
                </Tooltip>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
};

export default SkillsWidget;

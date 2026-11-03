import hoverSparkle from "assets/skills/hover-sparkle.png";
import { GlitchedTitle, Tooltip } from "shared/ui";

import { useTouchedTechnology } from "./hooks";
import { technologies } from "./Skills.config";

import css from "./Skills.module.scss";

export const Skills = () => {
  const { isTouched, getHandlers } = useTouchedTechnology();

  return (
    <section className={css.container} aria-labelledby="skills-title">
      <header className={css.header}>
        <div id="skills-title" className={css.title}>
          <GlitchedTitle.Pixel title="Навыки" />
        </div>
      </header>
      <div className={css.content}>
        <ul className={css.collection} aria-label="Технологии">
          {technologies.map(({ name, icon, skill, base, activeBase, shape }) => (
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
                open={isTouched(name)}
              >
                <button
                  type="button"
                  className={css.technology}
                  data-technology={name}
                  data-shape={shape}
                  data-active={isTouched(name) || undefined}
                  {...getHandlers(name)}
                >
                  <span className={css.pinSlot} aria-hidden="true">
                    <span className={css.pin}>
                      <img className={css.base} src={base} alt="" />
                      <img className={css.activeBase} src={activeBase} alt="" />
                      <img className={css.logo} src={icon} alt="" />
                    </span>
                    <img className={css.sparkle} src={hoverSparkle} alt="" />
                  </span>
                  <span className={css.label}>{name}</span>
                </button>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

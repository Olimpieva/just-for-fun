import { Card, ColorBlockBadge, GlitchedTitle } from "components";

import css from "./EducationWidget.module.scss";

const EducationWidget = () => (
  <Card
    title={
      <div className={css.wrapper}>
        <GlitchedTitle.Pixel title="образование" />
      </div>
    }
  >
    <ul className={css.grid}>
      <li>
        <ColorBlockBadge
          front={{ title: "Математическое моделирование", subtitle: "2016" }}
          back={{ subtitle: "Курский государственный университет" }}
        />
      </li>

      <li>
        <ColorBlockBadge
          front={{ title: "Информационная безопасность", subtitle: "2018" }}
          back={{ subtitle: "Курский государственный университет" }}
        />
      </li>

      <li>
        <ColorBlockBadge
          front={{ title: "Веб-разработчик", subtitle: "2021" }}
          back={{ subtitle: "Яндекс" }}
        />
      </li>

      <li>
        <ColorBlockBadge
          front={{ title: "React + Redux", subtitle: "2021" }}
          back={{ subtitle: "Javascript.ru" }}
        />
      </li>

      <li>
        <ColorBlockBadge
          front={{ title: "TypeScript", subtitle: "2022" }}
          back={{ subtitle: "Javascript.ru" }}
        />
      </li>

      <li>
        <ColorBlockBadge
          front={{ title: "Three.js", subtitle: "2024" }}
          back={{ subtitle: "threejs-journey.com" }}
        />
      </li>
    </ul>
  </Card>
);

export default EducationWidget;

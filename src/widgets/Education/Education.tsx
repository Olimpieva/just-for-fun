import { Card, ColorBlockBadge, GlitchedTitle } from "shared/ui";

import css from "./Education.module.scss";

export const Education = () => (
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
          front={{ title: "Three.js", subtitle: "2024" }}
          back={{ subtitle: "threejs-journey.com" }}
        />
      </li>
    </ul>
  </Card>
);

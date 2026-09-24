import { KeepInTouch, Tabs, ModalWrapper } from "widgets";
import { useFavoritesSync } from "store/favorites";

import css from "./MainPage.module.scss";

const MainPage = () => {
  useFavoritesSync();

  return (
    <div className={css.page}>
      <div className={css.container}>
        <div className={css.header}>
          <div>
            <h1 className={css.title}>Олимпиева Наталья Игоревна</h1>
            <h3 className={css.subtitle}>Фронтенд разработчик</h3>
            <p className={css.description}>
              Люблю и умею искать простые решения сложных задач.
            </p>
          </div>

          <KeepInTouch />
        </div>

        <ModalWrapper />

        <div className={css.footer}>
          <Tabs />
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import React, { useEffect } from "react";
import { KeepInTouch, Tabs, ModalWrapper } from "widgets";
import useLocalStorageListening from "utils/hooks/useLocalStorageListening";
import { useAppDispatch } from "utils/hooks";
import { ReactComponent as LinkIcon } from "assets/open.svg";
import { fetchLikedImages } from "../../redux/gallery/actions";

import css from "./MainPage.module.scss";

const MainPage = () => {
  const dispatch = useAppDispatch();
  useLocalStorageListening();

  useEffect(() => {
    dispatch(fetchLikedImages());
  }, [dispatch]);

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

        <a
          href="https://just-for-fun-gold.vercel.app/"
          target="_blank"
          rel="noreferrer"
          data-text="full-version"
          className={css.link}
        >
          <LinkIcon
            className={css.image}
            width={54}
            height={54}
            color="white"
          />
        </a>
      </div>
    </div>
  );
};

export default MainPage;

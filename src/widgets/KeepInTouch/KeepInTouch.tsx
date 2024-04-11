import React from "react";
import { ReactComponent as TelegramIcon } from "assets/telegram.svg";
import { ReactComponent as GithubIcon } from "assets/github.svg";
import { ReactComponent as MailIcon } from "assets/mail.svg";

import css from "./KeepInTouch.module.scss";

// eslint-disable-next-line arrow-body-style
const KeepInTouch = () => {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <TelegramIcon width="64px" height="64px" color="white" />
        <a href="" className={css.link}>
          Telegram
        </a>
      </div>

      <div className={css.item}>
        <MailIcon width="64px" height="64px" color="white" />
        <a href="" className={css.link}>
          Почта
        </a>
      </div>

      <div className={css.item}>
        <GithubIcon width="64px" height="64px" color="white" />
        <a href="" className={css.link}>
          Github
        </a>
      </div>
    </div>
  );
};

export default KeepInTouch;

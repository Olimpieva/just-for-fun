import React from "react";
import { ReactComponent as TelegramIcon } from "assets/telegram.svg";
import { ReactComponent as GithubIcon } from "assets/github.svg";
import { ReactComponent as MailIcon } from "assets/mail.svg";
import { BlodBadge } from "components";

import css from "./KeepInTouch.module.scss";

const KeepInTouch = () => (
  <div className={css.container}>
    <BlodBadge>
      <ul>
        <div className={css.item}>
          <a href="" className={css.link}>
            <TelegramIcon width="64px" height="64px" color="white" />
            Telegram
          </a>
        </div>

        <div className={css.item}>
          <a href="" className={css.link}>
            <MailIcon width="64px" height="64px" color="white" />
            Почта
          </a>
        </div>

        <div className={css.item}>
          <a href="" className={css.link}>
            <GithubIcon width="64px" height="64px" color="white" />
            Github
          </a>
        </div>
      </ul>
    </BlodBadge>
  </div>
);

export default KeepInTouch;

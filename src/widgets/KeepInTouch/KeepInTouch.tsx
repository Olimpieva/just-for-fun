import React from "react";
import { ReactComponent as TelegramIcon } from "assets/telegram.svg";
import { ReactComponent as GithubIcon } from "assets/github.svg";
import { ReactComponent as MailIcon } from "assets/mail.svg";

import GlitchedLink from "components/GlitchedLink";

import css from "./KeepInTouch.module.scss";

const KeepInTouch = () => (
  <ul className={css.container}>
    <li>
      <GlitchedLink text="Telegram_" to="https://t.me/user_already_exist">
        <div className={css.item}>
          <TelegramIcon width={48} color="white" />
          Telegram_
        </div>
      </GlitchedLink>
    </li>

    <li>
      <GlitchedLink text="Почта" to="mailto:522.connection.timed.out@gmail.com">
        <div className={css.item}>
          <MailIcon width={48} color="white" />
          Mail_
        </div>
      </GlitchedLink>
    </li>

    <li>
      <GlitchedLink text="Github_" to="https://github.com/Olimpieva">
        <div className={css.item}>
          <GithubIcon width={48} color="white" />
          Github_
        </div>
      </GlitchedLink>
    </li>
  </ul>
);

export default KeepInTouch;

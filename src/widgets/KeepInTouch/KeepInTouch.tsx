import TelegramImg from "assets/telegram.png";
import GithubImg from "assets/github.png";
import MailImg from "assets/mail.png";

import css from "./KeepInTouch.module.scss";

const KeepInTouch = () => (
  <ul className={css.container}>
    <li>
      <a
        href="https://t.me/user_already_exist"
        target="_blank"
        rel="noreferrer"
        data-text="Telegram"
      >
        <div className={css.item}>
          <img src={TelegramImg} className={css.image} alt="Telegram" />
        </div>
      </a>
    </li>

    <li>
      <a
        href="mailto:522.connection.timed.out@gmail.com"
        target="_blank"
        rel="noreferrer"
        data-text="Почта"
      >
        <div className={css.item}>
          <img src={MailImg} className={css.image} alt="Почта" />
        </div>
      </a>
    </li>

    <li>
      <a
        href="https://github.com/Olimpieva"
        target="_blank"
        rel="noreferrer"
        data-text="Github"
      >
        <div className={css.item}>
          <img src={GithubImg} className={css.image} alt="Github" />
        </div>
      </a>
    </li>
  </ul>
);

export default KeepInTouch;

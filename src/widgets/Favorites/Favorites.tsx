import { Card, GlitchedTitle } from "shared/ui";

import { List, Message } from "./components";
import { useDislikeWithMessage } from "./hooks";

import css from "./Favorites.module.scss";

export const Favorites = () => {
  const { message, dislike, closeMessage } = useDislikeWithMessage();

  return (
    <Card
      title={
        <div className={css.position}>
          <GlitchedTitle.Pixel title="Избранное" />
        </div>
      }
    >
      <div className={css.container} inert={Boolean(message)}>
        <div className={css.content}>
          <List onDislike={dislike} />
        </div>
      </div>

      <Message text={message} onClose={closeMessage} />
    </Card>
  );
};

import { useEffect, useRef, useState } from "react";
import { Card, GlitchedTitle } from "components";
import { useDislikeCutie } from "store/favorites";
import Message from "./Message";
import List from "./List";

import css from "./FavoritesWidget.module.scss";
import { messages } from "./FavoritesWidget.utils";

const FavoritesWidget = () => {
  const dislikeImage = useDislikeCutie();
  const [message, setMessage] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const dislike = (id: string) => {
    dislikeImage(id);

    if (!timerRef.current) {
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMessage);
      timerRef.current = setTimeout(() => {
        setMessage("");
        timerRef.current = undefined;
      }, 4000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Card
      title={
        <div className={css.position}>
          <GlitchedTitle.Pixel title="Избранное" />
        </div>
      }
    >
      <div className={css.container}>
        <div className={css.content}>
          <List onDislike={dislike} />
        </div>
      </div>

      <Message text={message} />
    </Card>
  );
};

export default FavoritesWidget;

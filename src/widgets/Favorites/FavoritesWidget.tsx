import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, GlitchedTitle } from "components";
import { useAppDispatch } from "utils/hooks";
import { dislikeImage } from "../../redux/gallery/actions";
import Message from "./Message";
import List from "./List";

import css from "./FavoritesWidget.module.scss";
import { messages } from "./FavoritesWidget.utils";

const FavoritesWidget = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const timerRef = useRef<NodeJS.Timeout>();

  const dislike = useCallback(
    (id: string) => {
      dispatch(dislikeImage(id));

      if (!timerRef.current) {
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        setMessage(randomMessage);
        timerRef.current = setTimeout(() => {
          setMessage("");
          timerRef.current = undefined;
        }, 4000);
      }
    },
    [dispatch],
  );

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

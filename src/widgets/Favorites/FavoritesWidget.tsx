import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, SweetTitle } from "components";
import { useAppDispatch } from "utils/hooks";
import { dislikeImage } from "../../redux/gallery/actions";
import Message from "./Message";
import List from "./List";

import css from "./FavoritesWidget.module.scss";

const messages = [
  "Don't you like little puppies? Wow.",
  "How can you not like it?",
  "You are the monster.",
  "It was my favorite.",
  "Shame on you.",
  "Stop doing it!",
  "Only bad person can dislike it. Think about it.",
  "I am so disappointed about this.",
  "Just leave them!",
  "Why are you doing this?",
  "No-no-no!",
  "I have no feelings, but I don't like you.",
  "Get out of here!",
  "I don't have a heart, but it is broken.",
  "What you are doing hurts.",
];
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

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Card title="">
      <div className={css.container}>
        <div className={css.content}>
          <List onDislike={dislike} />
        </div>
      </div>

      <Message text={message} />

      <div className={css.position}>
        <SweetTitle title={{ top: "Такое мне", bottom: "нравится" }} />
      </div>
    </Card>
  );
};

export default FavoritesWidget;

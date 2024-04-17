import React from "react";
import { TypingText } from "components";

import css from "./Message.module.scss";

type Props1 = {
  text: string;
};

const Message = ({ text }: Props1) => {
  if (!text) return null;

  return (
    <div className={css.container}>
      <TypingText text={text} />
    </div>
  );
};

export default Message;
